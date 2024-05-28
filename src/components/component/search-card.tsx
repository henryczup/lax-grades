import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SearchCard({ data, type }: { data: any; type: "classes" | "instructors" | "departments" }) {
    let title = "";
    let href = "";

    if (type === "classes") {
        title = `${data.code} - ${data.name}`;
        href = `/class/${data.code}`;
    } else if (type === "instructors") {
        title = data.name;
        href = `/instructor/${data.id}`;
    } else if (type === "departments") {
        title = `${data.code} - ${data.name}`;
        href = `/department/${data.code}`;
    }

    return (
        <Link href={href}>
            <Card className="hover:bg-[#eaeae3] bg-[#f6f6ef] transition-colors border-none duration-200 flex flex-row items-center w-full px-6 mb-4">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent></CardContent>
            </Card>
        </Link>
    );
}