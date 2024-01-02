import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";
import { Portal } from "./Portal";

type ModalProps = {
    children: React.ReactNode;
    className?: string;
    isOpen: boolean;
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full" | "unset";
    onClose: () => void;
}

export function Modal({ children, isOpen, size, onClose, className }: ModalProps) {
    const [showModal, setShowModal] = useState(false);

    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        if (event.key === "Escape") {
            setShowModal(false);
            onClose();
        }
    }, [setShowModal, onClose]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleKeyPress]);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    if (!showModal) {
        return null;
    }

    return (
        <Portal wrapperId="pj-modal">
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div
                    className="fixed inset-0 w-full h-full backdrop-blur-sm bg-gray-300 bg-opacity-50 dark:bg-gray-700 dark:bg-opacity-50"
                    onClick={() => {
                        setShowModal(false);
                        onClose();
                    }}
                />
                <div className="flex items-center min-h-screen px-4 py-8">
                    <div className={classNames("relative w-full mx-auto bg-white dark:bg-gray-900 rounded-md shadow", className, {
                        "max-w-lg": !size || size === "lg",
                        "max-w-sm": size === "sm",
                        "max-w-md": size === "md",
                        "max-w-xl": size === "xl",
                        "max-w-2xl": size === "2xl",
                        "max-w-3xl": size === "3xl",
                        "max-w-4xl": size === "4xl",
                        "max-w-5xl": size === "5xl",
                        "max-w-6xl": size === "6xl",
                        "max-w-7xl": size === "7xl",
                        "max-w-full": size === "full",
                    })}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
}