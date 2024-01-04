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
      <Head title="Pedidos" />

      <PageHeader
        className="mb-4"
        title="Pedidos"
        button={user?.permissions.includes("orders.create") && (<LinkButton
          href="/products/create"
          variant="secondary"
          icon={<Plus size={24} />}
        >
          Novo pedidos
        </LinkButton>)}
        breadcrumb={[
          { title: "Pedidos" },
        ]}
      />

      <UsersList />
    </>
  );
}