import { useContext } from "react";
import { ChatsCircle, Handbag, House, Megaphone, Plus, SignOut, UserList, UsersFour, UsersThree } from "@phosphor-icons/react";

import { AuthContext } from "@/contexts/AuthContext";
import { DashContext } from "@/contexts/DashContext";

import { AsideButton } from "./AsideButton";
import { AsideLink } from "./AsideLink";
import { AsideButtonCollapse } from "./AsideButtonCollapse";
import { Support } from "@/components/ui/Support";

export function AsideMain() {
    const { signOut, user } = useContext(AuthContext);
    const { setShowAside } = useContext(DashContext);

    return (
        <main className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
            {user?.permissions.includes("dashboard.read") && (
                <AsideLink
                    href="/"
                    icon={<House size={25} />}
                    text="Dashboard"
                    shouldMatchExactHref
                    onClick={() => setShowAside(false)}
                />
            )}
            {user?.permissions.includes("customerService.read") && (
                <AsideLink
                    href="/chats"
                    icon={<ChatsCircle size={25} />}
                    text="Atendimento"
                    onClick={() => setShowAside(false)}
                />
            )}
            {(user?.permissions.includes("contacts.read") || user?.permissions.includes("users.read") || user?.permissions.includes("departments.read")) && (
                <AsideButtonCollapse
                    ariaLabel="Botão que abre o menu de cadastros"
                    icon={<Plus size={25} />}
                    title="Cadastros"
                >
                    {user?.permissions.includes("contacts.read") && (
                        <AsideLink
                            href="/contacts"
                            icon={<UsersThree size={25} />}
                            text="Contatos"
                            onClick={() => setShowAside(false)}
                        />
                    )}
                    {user?.permissions.includes("departments.read") && (
                        <AsideLink
                            href="/departments"
                            icon={<UsersFour size={25} />}
                            text="Departamentos"
                            onClick={() => setShowAside(false)}
                        />
                    )}
                    {user?.permissions.includes("users.read") && (
                        <AsideLink
                            href="/users"
                            icon={<UserList size={25} />}
                            text="Usuários"
                            onClick={() => setShowAside(false)}
                        />
                    )}
                    {user?.permissions.includes("users.read") && (
                        <AsideLink
                            href="/products"
                            icon={<Handbag size={25} />}
                            text="Produtos"
                            onClick={() => setShowAside(false)}
                        />
                    )}
                </AsideButtonCollapse>
            )}
            {user?.permissions.includes("campaigns.read") && (
                <AsideLink
                    href="/campaigns"
                    icon={<Megaphone size={25} />}
                    text="Campanhas"
                />
            )}
            <Support />
            <AsideButton
                className="!text-danger-500 hover:!text-danger-600"
                icon={<SignOut size={25} />}
                ariaLabel="Botão que faz o logout do usuário"
                onClick={() => signOut()}
            >
                Sair
            </AsideButton>
        </main>
    );
}