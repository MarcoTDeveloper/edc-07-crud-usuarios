import { useContext } from "react";
import { ChatsCircle, Coins, Handbag, House, Megaphone, Package, Plus, SignOut, UserList, UsersFour, UsersThree } from "@phosphor-icons/react";

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
            {(user?.permissions.includes("contacts.read") || user?.permissions.includes("users.read") || user?.permissions.includes("departments.read")) && (
                <AsideButtonCollapse
                    ariaLabel="Botão que abre o menu de cadastros"
                    icon={<Plus size={25} />}
                    title="Cadastros"
                >
                    {user?.permissions.includes("users.read") && (
                        <AsideLink
                            href="/users"
                            icon={<UserList size={25} />}
                            text="Usuários"
                            onClick={() => setShowAside(false)}
                        />
                    )}
                    {user?.permissions.includes("products.read") && (
                        <AsideLink
                            href="/products"
                            icon={<Handbag size={25} />}
                            text="Produtos"
                            onClick={() => setShowAside(false)}
                        />
                    )}
                    {user?.permissions.includes("orders.read") && (
                        <AsideLink
                            href="/orders"
                            icon={<Package size={25} />}
                            text="Pedidos"
                            onClick={() => setShowAside(false)}
                        />
                    )}
                    {user?.permissions.includes("sales.read") && (
                        <AsideLink
                            href="/sales"
                            icon={<Coins size={25} />}
                            text="Vendas"
                            onClick={() => setShowAside(false)}
                        />
                    )}
                </AsideButtonCollapse>
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