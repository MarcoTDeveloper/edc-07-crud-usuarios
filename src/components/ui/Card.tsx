import classNames from "classnames";

interface CardPros extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    children: React.ReactNode;
}

export function Card({ title, children, className, ...rest }: CardPros) {
    return (
        <div
            className={classNames("bg-white dark:bg-gray-700 rounded-md shadow", className)}
            {...rest}
        >
            {title && (
                <h2 className="text-2xl font-semibold pl-4 pt-4">{title}</h2>
            )}
            {children}
        </div>
    );
}