import { createContext, useState } from "react";

type ModalProviderProps = {
    children: React.ReactNode;
}

type ModalContextType = {
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
}

export const ModalContext = createContext({} as ModalContextType);

export function ModalProvider({ children }: ModalProviderProps) {
    const [showModal, setShowModal] = useState(false);
    return (
        <ModalContext.Provider value={{ showModal, setShowModal }}>
            {children}
        </ModalContext.Provider>
    );
}