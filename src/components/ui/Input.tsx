import { forwardRef, ForwardRefRenderFunction, useCallback } from "react";
import classNames from "classnames";

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    error?: string;
    type?: string;
    disabled?: boolean;
    readOnly?: boolean;
    value?: any;
    mask?: "cpf" | "cnpj" | "phone" | "zipCode" | "money" | "date" | "month-year" | "bankAccount";
    list?: string;
    step?: string;
    maxLength?: number;
    required?: boolean;
    accept?: string;
    placeholder?: string;
    min?: string | number;
    max?: string | number;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ label, className, id, placeholder, error, maxLength, mask, required, ...rest }, ref) => {
    const handleKeyUp = useCallback((event: React.FormEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        if (mask === "cpf") {
            event.currentTarget.maxLength = 14;
            event.currentTarget.value = value
                .replace(/\D/g, "")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d{1,2})/, "$1-$2")
                .replace(/(-\d{2})\d+?$/, "$1");
        } else if (mask === "cnpj") {
            event.currentTarget.maxLength = 18;
            event.currentTarget.value = value
                .replace(/\D/g, "")
                .replace(/(\d{2})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1/$2")
                .replace(/(\d{4})(\d)/, "$1-$2")
                .replace(/(-\d{2})\d+?$/, "$1");
        } else if (mask === "phone") {
            event.currentTarget.maxLength = 15;
            event.currentTarget.value = value
                .replace(/\D/g, "")
                .replace(/(\d{2})(\d)/, "($1) $2")
                .replace(/(\d{4})(\d)/, "$1-$2")
                .replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
                .replace(/(-\d{4})\d+?$/, "$1");
        } else if (mask === "zipCode") {
            event.currentTarget.maxLength = 9;
            event.currentTarget.value = value
                .replace(/\D/g, "")
                .replace(/(\d{5})(\d)/, "$1-$2")
                .replace(/(-\d{3})\d+?$/, "$1");
        } else if (mask === "money") {
            event.currentTarget.value = value
                .replace(/\D/g, "")
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        } else if (mask === "date") {
            event.currentTarget.maxLength = 10;
            event.currentTarget.value = value
                .replace(/\D/g, "")
                .replace(/(\d{2})(\d)/, "$1/$2")
                .replace(/(\d{2})(\d)/, "$1/$2")
                .replace(/(\d{4})\d+?$/, "$1");
        } else if (mask === "month-year") {
            event.currentTarget.maxLength = 7;
            event.currentTarget.value = value
                .replace(/\D/g, "")
                .replace(/(\d{2})(\d)/, "$1/$2")
                .replace(/(\d{4})\d+?$/, "$1");
        } else if (mask === "bankAccount") {
            event.currentTarget.maxLength = 10;
            event.currentTarget.value = value
                .replace(/\D/g, "")
                .replace(/(\d{8})(\d)/, "$1-$2")
                .replace(/(-\d{1})\d+?$/, "$1");
        }
    }, [mask]);

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
            <input
                className={classNames("mt-1 py-2 px-4 rounded-md bg-zinc-200 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500", {
                    "ring-2 ring-danger-500": error,
                    "focus:!ring-2 focus:!ring-danger-500": error
                })}
                id={id}
                placeholder={placeholder || label}
                onKeyUp={handleKeyUp}
                max={maxLength}
                ref={ref}
                {...rest}
            />
            {error && (
                <small className="mt-1 text-sm text-danger-500">{error}</small>
            )}
        </div>
    );
};

export const Input = forwardRef(InputBase);