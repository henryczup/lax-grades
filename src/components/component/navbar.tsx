"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

const routes = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "All Classes",
        path: "/search",
    },
];

export default function Header() {
    const activePathname = usePathname();

    return (
        <header className="flex items-center justify-between border-b border-black/10 h-14 px-9 bg-[#f6f6ef]">
            <Link href="/" className="flex flex-row items-center space-x-1">
                <Image src="/LAXGradesDistributionLogo.svg" alt="LAX Grades Logo" width={50} height={50} />
                <h1 className="text-gray-800"><strong><span className="text-red-900">LAX</span>GRADES</strong></h1>
            </Link>


            <nav className="h-full">
                <ul className="flex gap-x-6 h-full text-sm">
                    {routes.map((route) => (
                        <li
                            key={route.path}
                            className={cn(
                                "text-gray-900 flex items-center relative transition",
                                {
                                    "text-red-800": activePathname === route.path,
                                    "text-gray-700": activePathname !== route.path,
                                }
                            )}
                        >
                            <Link href={route.path}>{route.name}</Link>

                            {activePathname === route.path && (
                                <motion.div
                                    layoutId="header-active-link"
                                    className="bg-red-800 h-1 w-full absolute bottom-0"
                                ></motion.div>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
