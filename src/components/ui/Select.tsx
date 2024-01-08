import { forwardRef, ForwardRefRenderFunction } from "react";
import classNames from "classnames";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    id: string;
    label?: string;
    error?: string;
    children: React.ReactNode;
    required?: boolean;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = ({ label, className, id, error, children, required, ...rest }, ref) => {
    return (
        <div className={classNames("flex flex-col mb-auto", className, {
            "pointer-events-none opacity-50": rest.disabled
        })}>
            {label && (
                <label
                    htmlFor={id}
                    className="text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                    {label} {required && <span className="text-danger-500">*</span>}
                </label>
            )}
            <select
                className={classNames("py-[.65em] px-4 flex-1 rounded-md cursor-pointer bg-zinc-200 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500", {
                    "ring-2 ring-danger-500": error,
                    "focus:!ring-2 focus:!ring-danger-500": error,
                    "mt-1": label
                })}
                id={id}
                ref={ref}
                {...rest}
            >
                {children}
            </select>
            {error && (
                <small className="mt-1 text-sm text-danger-500">{error}</small>
            )}
        </div>
    );
};

export const Select = forwardRef(SelectBase);