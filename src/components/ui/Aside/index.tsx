import { useCallback, useContext, useEffect } from "react";
import classNames from "classnames";

import { DashContext } from "@/contexts/DashContext";
import { AsideHeader } from "./AsideHeader";
import { AsideMain } from "./AsideMain";

export function Aside() {
    const { showAside, fixedAside, setFixedAside } = useContext(DashContext);

    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        if (event.ctrlKey && event.key == "b") {
            setFixedAside(!fixedAside);
            localStorage.setItem("fixedAside", JSON.stringify(!fixedAside));
        }
    }, [fixedAside, setFixedAside]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleKeyPress]);

    return (
        <aside className={classNames("group/aside flex flex-col w-[14rem] h-full absolute z-50 bg-white shadow dark:bg-gray-700 md:left-0 md:max-w-[5.5rem] md:will-change-[max-width] md:whitespace-nowrap md:hover:max-w-[14.5rem] [transition:max-width_.2s_ease,_left_.2s_ease-in-out_!important]", {
            "left-0": showAside,
            "left-[-14rem]": !showAside,
            "md:!relative": fixedAside,
            "md:!max-w-[14.5rem]": fixedAside,
        })}>
            <AsideHeader />
            <AsideMain />
        </aside>
    );
}