import { useContext } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { List } from "@phosphor-icons/react";

import { DashContext } from "@/contexts/DashContext";
import { AuthContext } from "@/contexts/AuthContext";

import Avatar from "@/assets/images/avatar.png";

const Theme = dynamic(() => import("./Theme").then((mod) => mod.Theme), {
    ssr: false,
});

export function MainHeader() {
    const { user } = useContext(AuthContext);
    const userName = user?.name.split(" ");
    const firstName = userName?.slice(0, 1);
    const lastName = userName && userName.length > 1 ? ` ${userName?.slice(-1)}` : "";
    const { showAside, setShowAside } = useContext(DashContext);

    return (
        <header className="flex items-center p-4 pb-0">
            <button
                type="button"
                className="md:hidden"
                onClick={() => setShowAside(!showAside)}
                aria-label="Botão para abri/fecha o menu lateral"
            >
                <List size={25} />
            </button>
            <div className="ml-auto flex items-center gap-4">
                <Theme />
                <div className="hidden sm:flex flex-col items-end">
                    <span className="text-base max-w-[130px] md:max-w-none overflow-hidden whitespace-nowrap text-ellipsis">Olá, {firstName}{lastName}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{user?.position.description}</span>
                </div>
                <div className="rounded-full object-cover w-11 h-11 shadow overflow-hidden">
                    <Image
                        src={user && user.avatar && user.avatar != "" ? user.avatar : Avatar}
                        alt="Imagem do usuário"
                        width={64}
                        height={64}
                        quality={100}
                    />
                </div>
            </div>
        </header>
    );
}