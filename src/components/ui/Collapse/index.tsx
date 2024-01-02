import classNames from "classnames";

type CollapseProps = {
    children: React.ReactNode;
    className?: string;
    isOpen: boolean;
}

export function Collapse({ children, className, isOpen }: CollapseProps) {
    return (
        <div
            className={classNames(
                "transition duration-400 ease-in-out overflow-hidden",
                className,
                {
                    "opacity-0 max-h-0": !isOpen,
                    "opacity-100 max-h-[1000px]": isOpen,
                })}
        >
            {children}
        </div>
    );
}