import classNames from "classnames";

interface HrProps extends React.HTMLAttributes<HTMLHRElement> { }

export function Hr({ className, ...rest }: HrProps) {
    return (
        <hr
            className={classNames("border-gray-300", className)}
            {...rest}
        />
    );
}