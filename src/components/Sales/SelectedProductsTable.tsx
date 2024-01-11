import { createColumnHelper } from "@tanstack/react-table";
import { UseFieldArrayRemove } from "react-hook-form";
import { TrashSimple } from "@phosphor-icons/react";

import { SelectedProducts } from "@/pages/sales/create";
import { Table } from "../ui/Table";

type SelectedProductsTableProps = {
  data: SelectedProducts[];
  remove: UseFieldArrayRemove;
}

export function SelectedProductsTable({ data, remove }: SelectedProductsTableProps) {
  const columnHelper = createColumnHelper<SelectedProducts>();
  const columns = [
    columnHelper.accessor("amount", {
      header: "Quantidade",
      size: 5,
      cell: info => (
        <div className="flex justify-center">
          {info.renderValue()}
        </div>
      ),
    }),
    columnHelper.accessor("description", {
      header: "Descrição"
    }),
    columnHelper.accessor("uniValue", {
      header: "Valor Uni. (R$)",
      size: 15,
      cell: info => (
        <div className="flex justify-center">
          {info.renderValue()}
        </div>
      ),
    }),
    columnHelper.accessor("totalValue", {
      header: "Valor Total (R$)",
      size: 15,
      cell: info => (
        <div className="flex justify-center">
          {info.renderValue()}
        </div>
      ),
    }),
    columnHelper.accessor("productId", {
      header: "",
      size: 5,
      cell: info => {
        const productIndex = data.findIndex(product => product.id == info.row.original.id);
        return (
          <div className="flex items-center justify-center">
            <button
              type="button"
              className="text-red-500"
              aria-label="Botão que remove o produto selecionado"
              onClick={() => remove(productIndex)}
            >
              <TrashSimple size={24} />
            </button>
          </div>

        );
      },
    })
  ];

  return (
    <Table
      data={data}
      columns={columns}
    />
  );
}