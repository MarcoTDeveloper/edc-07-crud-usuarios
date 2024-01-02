import classNames from "classnames";
import { Breadcrumb } from "./Breadcrumb";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    button?: React.ReactNode;
    breadcrumb?: {
        title: string;
        href?: string;
    }[];
}

export function PageHeader({ title, button, className, breadcrumb, ...rest }: HeaderProps) {
    return (
        <div className={classNames("flex flex-col gap-4", className)} {...rest}>
            <div className="relative flex items-center justify-between">
                <h1
                    className="text-2xl sm:text-3xl md:text-4xl"
                >
                    {title}
                </h1>
                {button}
            </div>
            {breadcrumb && (
                <Breadcrumb.Root
                    className="mr-auto"
                >
                    {breadcrumb.map(({ title, href }, index) => (
                        <Breadcrumb.Link
                            key={index}
                            href={href}
                        >
                            {title}
                        </Breadcrumb.Link>
                    ))}
                </Breadcrumb.Root>
            )}
        </div>
    );
}