import classNames from "classnames";
import { ElementType } from "react";

type TabsLinkRootProps = {
    active?: boolean;
    icon: ElementType;
    text: string;
    onClick?: () => void;
}

export function TabsLink({ active, text, icon: Icon, ...rest }: TabsLinkRootProps) {
    return (
        <li
            className={classNames("inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg font-medium cursor-pointer transition-colors", {
                "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group": !active,
                "text-primary-500 border-primary-500 dark:text-primary-500 dark:border-primary-500 group": active,
            })}
            {...rest}
        >
            <Icon
                className={classNames("mr-2 group-hover:text-gray-500 dark:group-hover:text-gray-300", {
                    "text-gray-400 dark:text-gray-500": !active,
                    "text-primary-500 dark:text-primary-500 group-hover:text-primary-600": active,
                })}
                size={21}
                weight={active ? "fill" : "regular"}
            />
            <span className={classNames({
                "text-primary-500 dark:text-primary-500 group-hover:text-primary-600": active,
            })}>
                {text}
            </span>
        </li>
    );
}