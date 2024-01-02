import classNames from "classnames";

type TextProps = {
    active?: boolean;
    children: React.ReactNode;
}

export function Text({ active, children }: TextProps) {
    return (
        <span className={classNames({
            "text-primary-500 dark:text-primary-500 group-hover:text-primary-600": active,
        })}>
            {children}
        </span>
    );
}