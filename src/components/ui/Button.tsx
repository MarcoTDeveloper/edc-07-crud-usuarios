import { CircleNotch } from "@phosphor-icons/react";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    ariaLabel: string;
    variant?: "primary" | "secondary" | "danger" | "success" | "warning" | "info";
    icon?: React.ReactNode;
    split?: React.ReactNode;
    isLoading?: boolean;
    fullMobile?: boolean;
}

export function Button({ children, className, ariaLabel, variant, icon, split, fullMobile, isLoading, ...rest }: ButtonProps) {
    return (
        <button
            className={classNames("rounded-md transition-colors cursor-pointer", className, {
                "py-2 px-4 bg-primary-500 hover:bg-primary-400 text-white": (!variant || variant === "primary") && !icon && !split,
                "py-2 px-4 bg-primary-500 hover:bg-primary-400 text-white flex items-center gap-4 font-semibold": (!variant || variant === "primary") && icon,
                "bg-primary-500 hover:bg-primary-400 text-white flex items-center font-semibold": (!variant || variant === "primary") && split,
                "py-2 px-4 bg-zinc-200 dark:bg-gray-500 hover:bg-zinc-300 hover:dark:bg-gray-800": variant === "secondary" && !icon && !split,
                "py-2 px-4 bg-zinc-200 dark:bg-gray-500 hover:bg-zinc-300 hover:dark:bg-gray-800 flex items-center gap-4 font-semibold": variant === "secondary" && icon,
                "bg-zinc-200 dark:bg-gray-500 hover:bg-zinc-300 hover:dark:bg-gray-800 flex items-center font-semibold": variant === "secondary" && split,
                "py-2 px-4 bg-danger-500 hover:bg-danger-400 text-white": variant === "danger" && !icon && !split,
                "py-2 px-4 bg-danger-500 hover:bg-danger-400 text-white flex items-center gap-4 font-semibold": variant === "danger" && icon,
                "bg-danger-500 hover:bg-danger-400 text-white flex items-center font-semibold": variant === "danger" && split,
                "py-2 px-4 bg-success-500 hover:bg-success-400 text-white": variant === "success" && !icon && !split,
                "py-2 px-4 bg-success-500 hover:bg-success-400 text-white flex items-center gap-4 font-semibold": variant === "success" && icon,
                "bg-success-500 hover:bg-success-400 text-white flex items-center font-semibold": variant === "success" && split,
                "py-2 px-4 bg-warning-500 hover:bg-warning-400 text-warning-900": variant === "warning" && !icon && !split,
                "py-2 px-4 bg-warning-500 hover:bg-warning-400 text-warning-900 flex items-center gap-4 font-semibold": variant === "warning" && icon,
                "bg-warning-500 hover:bg-warning-400 text-warning-900 flex items-center font-semibold": variant === "warning" && split,
                "py-2 px-4 bg-info-500 hover:bg-info-400 text-white": variant === "info" && !icon && !split,
                "py-2 px-4 bg-info-500 hover:bg-info-400 text-white flex items-center gap-4 font-semibold": variant === "info" && icon,
                "bg-info-500 hover:bg-info-400 text-white flex items-center font-semibold": variant === "info" && split,
                "pointer-events-none opacity-50": rest.disabled || isLoading,

            })}
            {...rest}
            aria-label={ariaLabel}
        >
            {(icon || split) && <div className={classNames({
                "text-zinc-300": (!variant || variant === "primary" || variant === "danger") && icon,
                "text-primary-500": variant === "secondary" && icon,
                "flex items-center py-2 px-3 text-zinc-300 bg-btn-icon rounded-l-md": (!variant || variant === "primary" || variant === "danger") && split,
                "flex items-center py-2 px-3 text-primary-500 bg-[rgba(0,_0,_0,_.05)] rounded-l-md": variant === "secondary" && split,
            })}>
                {isLoading ? (<div className="animate-spin">
                    <CircleNotch size={24} />
                </div>) : (icon || split)}
            </div>}
            {split ? (
                <div className={classNames("hidden md:flex-auto md:inline-block py-2 px-4 whitespace-nowrap text-center", {
                    "!flex-auto !inline-block": fullMobile,
                })}>
                    {children}
                </div>
            ) : icon ? (
                children && (
                    <div className={classNames("hidden md:flex-auto md:inline-block md:whitespace-nowrap md:text-center", {
                        "!flex-auto !inline-block": fullMobile
                    })}>
                        {children}
                    </div>
                )
            ) : children}
        </button>
    );
}