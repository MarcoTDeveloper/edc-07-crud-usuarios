import { useContext } from "react";
import { Plus } from "@phosphor-icons/react";

import { AuthContext } from "@/contexts/AuthContext";
import { Head } from "@/components/ui/Head";
import { PageHeader } from "@/components/ui/PageHeader";
import { LinkButton } from "@/components/ui/LinkButton";
import { UsersList } from "@/components/Users/List";

export default function Users() {
    const { user } = useContext(AuthContext);

    return (
        <>
            <Head title="Usuários" />

            <PageHeader
                className="mb-4"
                title="Usuários"
                button={user?.permissions.includes("users.create") && (<LinkButton
                    href="/users/create"
                    variant="secondary"
                    icon={<Plus size={24} />}
                >
                    Novo usuário
                </LinkButton>)}
                breadcrumb={[
                    { title: "Usuários" },
                ]}
            />

            <UsersList />
        </>
    );
}