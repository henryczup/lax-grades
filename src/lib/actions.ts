'use server'

import nodemailer from 'nodemailer'
import { headers } from 'next/headers'
import { FormData } from '@/lib/types'


// Simple in-memory store for rate limiting
const rateLimitStore = new Map<string, { count: number; lastRequest: number }>();

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS = 3;

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const userRateLimit = rateLimitStore.get(ip) || { count: 0, lastRequest: now };

    if (now - userRateLimit.lastRequest > RATE_LIMIT_WINDOW) {
        // Reset if it's been more than an hour
        userRateLimit.count = 1;
        userRateLimit.lastRequest = now;
    } else {
        userRateLimit.count += 1;
    }

    rateLimitStore.set(ip, userRateLimit);

    return userRateLimit.count > MAX_REQUESTS;
}

export async function sendFeedback(formData: FormData): Promise<void> {
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';

    if (isRateLimited(ip)) {
        throw new Error('Rate limit exceeded. Please try again later.');
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: true, // use TLS
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    })

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: 'henryczup@gmail.com', // Replace with your email
        subject: 'New Feedback Submission',
        text: `
            New feedback received:
            
            Name: ${formData.firstName} ${formData.lastName}
            Email: ${formData.email}
            Message: ${formData.message}
            IP: ${ip}
        `,
    }

    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error('Error sending email:', error)
        throw new Error('Failed to send feedback')
    }
}