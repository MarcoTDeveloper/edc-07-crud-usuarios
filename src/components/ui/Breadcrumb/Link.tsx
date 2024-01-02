import { CaretRight } from "@phosphor-icons/react";
import Link from "next/link";

type BreadcrumbLinkProps = {
    children: React.ReactNode;
    href?: string;
}

export function BreadcrumbLink({ children, href }: BreadcrumbLinkProps) {
    return (
        <li
            aria-current={!href ? "page" : undefined}
            className="flex gap-2 items-center"
        >
            <CaretRight size={16} weight="bold" />
            {href ? (
                <Link
                    href={href}
                    className="hover:text-blue-500 dark:hover:text-blue-400"
                >
                    {children}
                </Link>
            ) : (
                <div
                    className="font-light pointer-events-none opacity-50"
                >
                    {children}
                </div>)}
        </li>       
    );
}