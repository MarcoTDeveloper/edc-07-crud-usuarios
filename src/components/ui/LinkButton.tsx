import Link, { LinkProps } from "next/link";
import classNames from "classnames";

interface LinkButtonProps extends LinkProps {
    variant?: "primary" | "secondary" | "danger";
    icon?: React.ReactNode;
    split?: React.ReactNode;
    className?: string;
    children?: React.ReactNode;
}

export function LinkButton({ children, className, variant, icon, split, ...rest }: LinkButtonProps) {
    return (
        <Link
            className={classNames("rounded-md transition-colors", className, {
                "py-2 px-4 bg-primary-500 hover:bg-primary-400 text-white": (!variant || variant === "primary") && !icon && !split,
                "py-2 px-4 bg-primary-500 hover:bg-primary-400 text-white flex items-center gap-4 font-semibold": (!variant || variant === "primary") && icon,
                "bg-primary-500 hover:bg-primary-400 text-white flex items-center font-semibold": (!variant || variant === "primary") && split,
                "py-2 px-4 bg-zinc-200 dark:bg-gray-500 hover:bg-zinc-300 hover:dark:bg-gray-800": variant === "secondary" && !icon && !split,
                "py-2 px-4 bg-zinc-200 dark:bg-gray-500 hover:bg-zinc-300 hover:dark:bg-gray-800 flex items-center gap-4 font-semibold": variant === "secondary" && icon,
                "bg-zinc-200 dark:bg-gray-500 hover:bg-zinc-300 hover:dark:bg-gray-800 flex items-center font-semibold": variant === "secondary" && split,
                "py-2 px-4 bg-danger-500 hover:bg-danger-400 text-white": variant === "danger" && !icon && !split,
                "py-2 px-4 bg-danger-500 hover:bg-danger-400 text-white flex items-center gap-4 font-semibold": variant === "danger" && icon,
                "bg-danger-500 hover:bg-danger-400 text-white flex items-center font-semibold": variant === "danger" && split,
            })}
            {...rest}
        >
            {(icon || split) && <div className={classNames({
                "text-zinc-300": (!variant || variant === "primary" || variant === "danger") && icon,
                "text-primary-500": variant === "secondary" && icon,
                "flex items-center py-2 px-3 text-zinc-300 bg-btn-icon rounded-l-md": (!variant || variant === "primary" || variant === "danger") && split,
                "flex items-center py-2 px-3 text-primary-500 bg-[rgba(0,_0,_0,_.05)] rounded-l-md": variant === "secondary" && split,
            })}>
                {icon || split}
            </div>}
            {split ? (
                <div className="flex-auto inline-block py-2 px-4 whitespace-nowrap text-center">
                    {children}
                </div>
            ) : icon ? (<div className="hidden md:flex-auto md:inline-block md:whitespace-nowrap md:text-center">
                {children}
            </div>) : children}
        </Link>
    );
}