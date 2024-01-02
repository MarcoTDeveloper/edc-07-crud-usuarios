import { House } from "@phosphor-icons/react";
import classNames from "classnames";
import Link from "next/link";

type BreadcrumbRootProps = {
    className?: string;
    children: React.ReactNode;
}

export function BreadcrumbRoot({ className, children }: BreadcrumbRootProps) {
    return (
        <nav className={classNames("inline-block", className)} aria-label="breadcrumb">
            <ol className="flex text-sm items-center justify-center gap-2">
                <li
                    className="flex gap-2 items-center"
                >
                    <House size={16} weight="bold" />
                    <Link
                        href="/"
                        className="hover:text-blue-500 dark:hover:text-blue-400"
                    >
                        Início
                    </Link>
                </li>  
                {children}
            </ol>
        </nav>
    );
}