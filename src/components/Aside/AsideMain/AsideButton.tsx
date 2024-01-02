import classNames from "classnames";
import { ButtonHTMLAttributes, useContext } from "react";

import { DashContext } from "@/contexts/DashContext";

interface AsideButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    ariaLabel: string;
    children: string;
    icon: React.ReactNode;
}

export function AsideButton({ ariaLabel, children, className, icon, ...props}: AsideButtonProps) {
    const { fixedAside } = useContext(DashContext);

    return (
        <button
            {...props}
            className={classNames("group bg-transparent cursor-pointer flex items-center ml-8 p-0 h-14 no-underline gap-4 text-slate-500 dark:text-gray-300 transition-all delay-100 ease-linear hover:text-primary-500", className)}
            aria-label={ariaLabel}
        >
            <span className="min-w-[25px] transition-[margin-left] delay-100 ease-linear group-hover:ml-4">
                {icon}
            </span>
            <h3 className={classNames("font-medium text-sm m-0 cursor-pointer md:hidden md:opacity-0 md:max-w-0 [transition:max-width_.2s_ease_0s,_opacity_.1s_ease_0s] ease-linear group-hover/aside:block group-hover/aside:max-w-xs group-hover/aside:opacity-100", {
                "!block !opacity-100 !max-w-xs": fixedAside,
            })}>
                {children}
            </h3>
        </button>
    );
}