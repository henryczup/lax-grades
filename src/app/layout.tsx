import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/component/shared-components/footer";
import NavBar from "@/components/component/shared-components/navbar";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LAXGRADES - Explore UWL Grade Distributions",
  description: "Discover grade distributions for classes at the University of Wisconsin-La Crosse. Search and compare historical grade data, GPAs, and pass rates for courses across various semesters and instructors.",
  keywords: "UWL, University of Wisconsin-La Crosse, grade distributions, GPA, pass rates, courses, classes, instructors, semesters",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-7CD59M26D6"></Script>
      <Script
        id="gtm-script"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-7CD59M26D6');
            `
        }}

      />
      <body className={inter.className}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
