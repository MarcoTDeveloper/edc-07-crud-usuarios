import { useContext } from "react";
import { Plus } from "@phosphor-icons/react";

import { AuthContext } from "@/contexts/AuthContext";
import { Head } from "@/components/ui/Head";
import { PageHeader } from "@/components/ui/PageHeader";
import { LinkButton } from "@/components/ui/LinkButton";
import { SalesList } from "@/components/Sales/List";

export default function Users() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Head title="Vendas" />

      <PageHeader
        className="mb-4"
        title="Vendas"
        button={user?.permissions.includes("sales.create") && (<LinkButton
          href="/sales/create"
          variant="secondary"
          icon={<Plus size={24} />}
        >
          Nova venda
        </LinkButton>)}
        breadcrumb={[
          { title: "Vendas" },
        ]}
      />

      <SalesList />
    </>
  );
}