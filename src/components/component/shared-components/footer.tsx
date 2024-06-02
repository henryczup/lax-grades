import Link from "next/link";

const routes = [
    {
        path: "/terms-conditions",
        name: "Terms & Conditions",
    },
    {
        path: "/privacy-policy",
        name: "Privacy Policy",
    },
];

export default function Footer() {
    return (
        <footer className="mt-auto flex items-center justify-between h-16 border-t border-black/10 px-3 sm:px-9 text-xs text-gray-700 bg-[#f6f6ef]">
            <small className="text-xs">
                Not affiliated with UW La Crosse.
            </small>

            {/* <ul className="flex gap-x-3 sm:gap-x-8">
                {routes.map((route) => (
                    <li key={route.path}>
                        <Link href={route.path}>{route.name}</Link>
                    </li>
                ))}
            </ul> */}
            <Link href="https://github.com/henryczup/LaxGrades" target="_blank" rel="noopener noreferrer">
                View in Github
            </Link>
        </footer>
    );
}
