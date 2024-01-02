import { ElementType } from "react";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    ariaLabel: string;
    icon: ElementType;
}

export function ActionButton({ children, ariaLabel, icon: Icon, ...rest }: ActionButtonProps) {
    return (
        <button
            className="group/actionButton flex items-center gap-2 p-2 h-10 rounded-full text-zinc-500 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-primary-500 transition-all duration-100"
            aria-label="Botão que fecha a conversa"
            {...rest}
        >
            <span
                className="w-0 opacity-0 group-hover/actionButton:w-auto group-hover/actionButton:opacity-100 group-hover/actionButton:ml-2 overflow-hidden"
            >
                {children}
            </span>
            <Icon size={24} />
        </button>
    );
}