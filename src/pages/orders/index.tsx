import { useContext } from "react";
import { Plus } from "@phosphor-icons/react";

import { AuthContext } from "@/contexts/AuthContext";
import { Head } from "@/components/ui/Head";
import { PageHeader } from "@/components/ui/PageHeader";
import { LinkButton } from "@/components/ui/LinkButton";
import { OrdersList } from "@/components/Orders/List";

export default function Orders() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Head title="Pedidos" />

      <PageHeader
        className="mb-4"
        title="Pedidos"
        button={user?.permissions.includes("orders.create") && (<LinkButton
          href="/orders/create"
          variant="secondary"
          icon={<Plus size={24} />}
        >
          Novo pedido
        </LinkButton>)}
        breadcrumb={[
          { title: "Pedidos" },
        ]}
      />

      <OrdersList />
    </>
  );
}