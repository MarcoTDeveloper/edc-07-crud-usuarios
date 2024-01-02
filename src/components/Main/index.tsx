import { useContext } from "react";
import classNames from "classnames";

import { DashContext } from "@/contexts/DashContext";
import { MainHeader } from "./MainHeader";

type MainPros = {
    children: React.ReactNode;
}

export function Main({ children }: MainPros) {
    const { fixedAside } = useContext(DashContext);

    return (
        <main
            className={classNames("flex flex-col flex-1 md:overflow-y-auto overflow-x-auto", {
                "md:pl-[5.5rem]": !fixedAside,
            })}
        >
            <MainHeader />
            <div className="flex-1 flex flex-col p-4">
                {children}
            </div>
        </main>
    );
}