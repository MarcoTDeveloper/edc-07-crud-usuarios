import { useContext } from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";

import { DashContext } from "@/contexts/DashContext";

interface AsideLinkProps extends LinkProps {
    className?: string;
    icon: React.ReactNode;
    text: string;
    shouldMatchExactHref?: boolean;
    disabled?: boolean;
}

export function AsideLink(props: AsideLinkProps) {
    const { asPath } = useRouter();
    const { icon, text, className, shouldMatchExactHref = false, disabled = false, ...rest } = props;
    const { fixedAside } = useContext(DashContext);
    let isActive = false;

    if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
        isActive = true;
    }

    if (!shouldMatchExactHref && (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))) {
        isActive = true;
    }

    return (
        <Link
            className={classNames(
                "group bg-transparent cursor-pointer flex items-center ml-8 p-0 h-14 no-underline gap-4 text-slate-500 dark:text-gray-300 transition-all delay-100 ease-linear hover:!text-primary-500",
                className,
                {
                    "!bg-zinc-50 dark:!bg-gray-800 !text-primary-500 !ml-0 before:w-2 before:h-full before:bg-primary-500": isActive,
                    "opacity-50 pointer-events-none": disabled,
                }
            )}
            {...rest}
        >
            <span className={classNames("min-w-[25px] transition-[margin-left] delay-100 ease-linear group-hover:ml-4", {
                "ml-[calc(1rem-.5rem)]": isActive,
            })}>
                {icon}
            </span>
            <h3 className={classNames("font-medium text-sm m-0 cursor-pointer md:hidden md:opacity-0 md:max-w-0 [transition:max-width_.2s_ease_0s,_opacity_.1s_ease_0s] ease-linear group-hover/aside:block group-hover/aside:max-w-xs group-hover/aside:opacity-100", {
                "!block !opacity-100 !max-w-xs": fixedAside,
            })}>
                {text}
            </h3>
        </Link>
    );
}