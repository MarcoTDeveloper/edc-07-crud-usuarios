import { useContext } from "react";
import { Plus } from "@phosphor-icons/react";

import { AuthContext } from "@/contexts/AuthContext";
import { Head } from "@/components/ui/Head";
import { PageHeader } from "@/components/ui/PageHeader";
import { LinkButton } from "@/components/ui/LinkButton";
import { ProductsList } from "@/components/Products/List";

export default function Users() {
    const { user } = useContext(AuthContext);

    return (
        <>
            <Head title="Produtos" />

            <PageHeader
                className="mb-4"
                title="Produtos"
                button={user?.permissions.includes("products.create") && (<LinkButton
                    href="/products/create"
                    variant="secondary"
                    icon={<Plus size={24} />}
                >
                    Novo produto
                </LinkButton>)}
                breadcrumb={[
                    { title: "Produtos" },
                ]}
            />

            <ProductsList />
        </>
    );
}