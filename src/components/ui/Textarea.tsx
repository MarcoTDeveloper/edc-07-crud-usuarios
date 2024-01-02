import { forwardRef, ForwardRefRenderFunction } from "react";
import classNames from "classnames";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    id: string;
    label: string;
    error?: string;
    type?: string;
    disabled?: boolean;
    readonly?: boolean;
    value?: any;
    required?: boolean;
}

const TextareaBase: ForwardRefRenderFunction<HTMLTextAreaElement, TextareaProps> = ({ label, className, id, placeholder, error,  required, ...rest }, ref) => {
    return (
        <div className={classNames("flex flex-col", className, {
            "pointer-events-none opacity-50": rest.disabled
        })}>
            {label && (
                <label
                    htmlFor={id}
                    className="text-sm font-medium text-gray-500 dark:text-gray-300"
                >
                    {label} {required && <span className="text-danger-500">*</span>}
                </label>
            )}
            <textarea
                className={classNames("mt-1 py-2 px-4 rounded-md bg-zinc-200 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500",{
                    "ring-2 ring-danger-500": error,
                    "focus:!ring-2 focus:!ring-danger-500": error
                })}
                id={id}
                placeholder={placeholder || label}
                ref={ref}
                {...rest}
            />
            {error && (
                <small className="mt-1 text-sm text-danger-500">{error}</small>
            )}
        </div>
    );
};

export const Textarea = forwardRef(TextareaBase);