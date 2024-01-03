import { useContext } from "react";
import dynamic from "next/dynamic";
import classNames from "classnames";
import { ArrowLeft } from "@phosphor-icons/react";

import { DashContext } from "@/contexts/DashContext";
import { SantasHat } from "./SantasHat";

const Logo = dynamic(() => import("../../Logo").then((mod) => mod.Logo), {
    ssr: false,
});

const BrandName = dynamic(() => import("../../BrandName").then((mod) => mod.BrandName), {
    ssr: false,
});

export function AsideHeader() {
    const { fixedAside, showAside, setShowAside } = useContext(DashContext);

    const isChristmasTime = () => {
        const today = new Date();
        const christmasDay = new Date(today.getFullYear(), 11, 25);
        const christmasTime = new Date(today.getFullYear(), 11, 5);
        return today >= christmasTime && today <= christmasDay;
    };

    return (
        <header className="flex justify-between items-center py-2 relative w-full overflow-hidden">
            <div className="flex-1 flex items-center ml-6">
                {isChristmasTime() ? <SantasHat /> : (
                    <Logo className="w-10 md:h-16" />
                )}
                <BrandName
                    className={classNames("md:hidden md:max-w-0 mt-3 h-9 [transition:display_.2s_ease_0s,max-width_.2s_ease_0s,_opacity_.1s_ease_0s] group-hover/aside:block group-hover/aside:max-w-xs group-hover/aside:opacity-100 ml-4", {
                        "!block !max-w-xs !opacity-100": fixedAside,
                    })}
                />
            </div>
            <button
                type="button"
                className="p-0 w-8 h-8 md:hidden"
                onClick={() => setShowAside(!showAside)}
                aria-label="Botão para fechar o menu lateral"
            >
                <ArrowLeft size={25} />
            </button>
        </header>
    );
}