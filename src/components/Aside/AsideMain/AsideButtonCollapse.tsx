import classNames from "classnames";
import { CaretDown } from "@phosphor-icons/react";
import { ButtonHTMLAttributes, useContext, useState } from "react";

import { DashContext } from "@/contexts/DashContext";
import { Collapse } from "@/components/ui/Collapse";

interface AsideButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    ariaLabel: string;
    children: React.ReactNode;
    icon: React.ReactNode;
    title: string;
}

export function AsideButtonCollapse({ ariaLabel, children, className, icon, title, type, ...props }: AsideButtonProps) {
    const { fixedAside } = useContext(DashContext);
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex flex-col">
            <button
                type={type || "button"}
                aria-label={ariaLabel}
                className="relative cursor-pointer"
                {...props}
                onClick={() => setCollapsed(!collapsed)}
            >
                <div
                    className={classNames("peer group bg-transparent cursor-pointer flex items-center ml-8 p-0 h-14 no-underline gap-4 text-slate-500 dark:text-gray-300 transition-all delay-100 ease-linear hover:!text-primary-500", className)}

                >
                    <span className="min-w-[25px] transition-[margin-left] delay-100 ease-linear group-hover:ml-4">
                        {icon}
                    </span>
                    <h3 className={classNames("font-medium text-sm m-0 cursor-pointer md:hidden md:opacity-0 md:max-w-0 [transition:max-width_.2s_ease_0s,_opacity_.1s_ease_0s] ease-linear group-hover/aside:block group-hover/aside:max-w-xs group-hover/aside:opacity-100", {
                        "!block !opacity-100 !max-w-xs": fixedAside,
                    })}>
                        {title}
                    </h3>
                </div>
                <span
                    className="absolute top-0 right-1 h-14 w-auto flex items-center justify-center peer-hover:text-primary-500 transition-all delay-100 ease-linear"
                >
                    <CaretDown
                        size={16}
                        className={classNames("transform transition-transform delay-100 ease-linear", {
                            "rotate-90": !collapsed,
                        })}
                        weight="thin"
                    />
                </span>
            </button>
            <Collapse
                isOpen={collapsed}
                className="bg-zinc-100 dark:bg-zinc-700 transition-all"
            >
                {children}
            </Collapse>
        </div>
    );
}