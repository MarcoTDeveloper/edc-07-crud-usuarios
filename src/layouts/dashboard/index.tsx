import { useContext, useEffect } from "react";

import { Aside } from "@/components/ui/Aside";
import { Main } from "@/components/ui/Main";

import { DashProvider } from "@/contexts/DashContext";
import { ThemeContext } from "@/contexts/ThemeContext";

type DashboardLayoutProps = {
    children: React.ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (theme == "dark" || (theme == "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    return (
        <div className="flex h-full overflow-x-hidden">
            <DashProvider>
                <Aside />
                <Main>
                    {children}
                </Main>
            </DashProvider>
        </div>
    );
}