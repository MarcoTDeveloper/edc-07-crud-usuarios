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
      <Head title="Estoque" />

      <PageHeader
        className="mb-4"
        title="Estoque"
        breadcrumb={[
          { title: "Estoque" },
        ]}
      />

      <UsersList />
    </>
  );
}