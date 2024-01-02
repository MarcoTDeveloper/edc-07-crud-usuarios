import classNames from "classnames";
import { Check, Info, Warning } from "@phosphor-icons/react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../Button";
import { Portal } from "./Portal";

type ConfirmModalProps = {
    onClose: () => void;
    onConfirm: () => void;
    isOpen: boolean;
    type: "warning" | "error" | "success" | "info";
    title: string;
    message: string;
}

export function ConfirmModal({ onClose, onConfirm, isOpen, type, title, message }: ConfirmModalProps) {
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
                    <div className="relative w-full max-w-lg p-4 mx-auto bg-white dark:bg-gray-900 rounded-md shadow">
                        <div className="mt-3 sm:flex">
                            <div className={classNames("flex items-center justify-center flex-none w-12 h-12 mx-auto rounded-full", {
                                "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300": type === "error",
                                "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300": type === "warning",
                                "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300": type === "success",
                                "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300": type === "info",
                            })}>
                                {type === "error" || type === "warning" ? (<Warning size={24} />) : null}
                                {type === "success" ? (<Check size={24} />) : null}
                                {type === "info" ? (<Info size={24} />) : null}
                            </div>
                            <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">{title}</h4>
                                <p className="mt-2 text-sm leading-relaxed text-gray-400">{message}</p>
                                <div className="items-center gap-2 mt-3 sm:flex">
                                    <Button
                                        ariaLabel="Botão que confirma a ação"
                                        variant={type === "error" ? "danger" : type === "warning" ? "warning" : type === "success" ? "success" : type === "info" ? "info" : "primary"}
                                        className="flex-1"
                                        onClick={() => {
                                            onConfirm();
                                            setShowModal(false);
                                        }}
                                    >
                                        Confirmar
                                    </Button>
                                    <Button
                                        ariaLabel="Botão que cancela a ação"
                                        variant="secondary"
                                        className="flex-1"
                                        onClick={() => {
                                            setShowModal(false);
                                            onClose();
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    );
}