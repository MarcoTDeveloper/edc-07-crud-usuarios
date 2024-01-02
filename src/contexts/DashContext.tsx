import { createContext, useEffect, useState } from "react";

type DashProviderProps = {
    children: React.ReactNode;
}

type DashContextType = {
    showAside: boolean;
    fixedAside: boolean;
    setShowAside: (showAside: boolean) => void;
    setFixedAside: (showAside: boolean) => void;
}

export const DashContext = createContext({} as DashContextType);

export function DashProvider({ children }: DashProviderProps) {
    const [showAside, setShowAside] = useState(false);
    const [fixedAside, setFixedAside] = useState(false);

    useEffect(() => {
        const fixedAside = localStorage.getItem("fixedAside");

        if (fixedAside) {
            setFixedAside(JSON.parse(fixedAside));
        }
    }, []);

    return (
        <DashContext.Provider value={{ showAside, setShowAside, fixedAside, setFixedAside }}>
            {children}
        </DashContext.Provider>
    );
}