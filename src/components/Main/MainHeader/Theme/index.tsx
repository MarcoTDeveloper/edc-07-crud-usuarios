import { Moon, Sun } from "@phosphor-icons/react";
import { useContext, useState } from "react";

import { ThemeContext } from "../../../../contexts/ThemeContext";
import { ThemeOption } from "./ThemeOption";

export function Theme() {
    const { theme, HandleSetTheme } = useContext(ThemeContext);
    const [openModal, setOpenModal] = useState(false);
    return (
        <div className="relative flex items-center">
            <button
                type="button"
                aria-label="Botão para trocar o tema"
                onClick={() => setOpenModal(!openModal)}
            >
                {theme === "system" ? window.matchMedia("(prefers-color-scheme: dark)").matches ? <Moon size={24} /> : <Sun size={24} /> : theme === "dark" ? <Moon size={24} /> : <Sun size={24} />}
            </button>
            {openModal && (
                <div className="absolute top-10 right-0 z-50">
                    <div className="bg-white dark:bg-gray-900 rounded-md shadow-md p-4">
                        <ThemeOption
                            theme="Claro"
                            setTheme={() => {
                                HandleSetTheme("light");
                                setOpenModal(false);
                            }}
                            selected={theme === "light"}
                        />
                        <ThemeOption
                            theme="Escuro"
                            setTheme={() => {
                                HandleSetTheme("dark");
                                setOpenModal(false);
                            }}
                            selected={theme === "dark"}
                        />
                        <ThemeOption
                            theme="Sistema"
                            setTheme={() => {
                                HandleSetTheme("system");
                                setOpenModal(false);
                            }}
                            selected={theme === "system"}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}