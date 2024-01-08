import { Head } from "@/components/ui/Head";
import { PageHeader } from "@/components/ui/PageHeader";
import { InventoryList } from "@/components/Inventory/List";

export default function Users() {

  return (
    <>
      <Head title="Estoque" />

      <PageHeader
        className="mb-4"
        title="Estoque"
        breadcrumb={[
          { title: "Estoque" },
        ]}
      />

      <InventoryList />
    </>
  );
}