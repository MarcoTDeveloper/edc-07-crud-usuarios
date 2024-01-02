import { createContext, useEffect, useState } from "react";

type ThemeContextType = {
    theme: string;
    HandleSetTheme: (theme: "light" | "dark" | "system") => void;
}

type ThemeProviderProps = {
    children: React.ReactNode;
}

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState("system");

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme) {
            setTheme(theme);
        }
    }, []);

    function HandleSetTheme(theme: "light" | "dark" | "system") {
        setTheme(theme);
        localStorage.setItem("theme", theme);
    }

    return (
        <ThemeContext.Provider value={{ theme, HandleSetTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}