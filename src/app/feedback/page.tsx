

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Component() {
    return (
        <div className="flex flex-col items-center justify-start p-8 gap-8 bg-white min-h-[85vh]">
            <Card className="justify-center items-center bg-[#f6f6ef]">
                <CardHeader>
                    <CardTitle>Send us your feedback</CardTitle>
                    <CardDescription>We'd love to hear your thoughts! Fill out the form below.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="first-name">First Name</Label>
                            <Input id="first-name" placeholder="John" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="last-name">Last Name</Label>
                            <Input id="last-name" placeholder="Doe" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="Let us know your thoughts..." className="min-h-[100px]" required />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button type="submit" className="bg-white shadow-1" variant="outline">Submit Feedback</Button>
                </CardFooter>
            </Card>
        </div>
    )
}