import classNames from "classnames";

interface HrProps extends React.HTMLAttributes<HTMLHRElement> {}

export function Hr({ className, ...rest }: HrProps) {
    return (
        <hr
            className={classNames("border-gray-200 dark:border-gray-700", className)}
            {...rest}
        />
    );
}