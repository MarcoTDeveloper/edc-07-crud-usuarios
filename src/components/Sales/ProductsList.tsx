import { createColumnHelper } from "@tanstack/react-table";

import { Card } from "../ui/Card";
import { Table } from "../ui/Table";
import { Eye } from "@phosphor-icons/react";
import { format } from "date-fns";
import Link from "next/link";
import { CancelSale } from "./Delete";

type Products = {
  id: number;
  amount: string;
  name: string;
  price: string;
  totalValue: string;
}

type ProductsListProps = {
  data: Products[];
}

export function ProductsList({ data }: ProductsListProps) {

  const columnHelper = createColumnHelper<Products>();
  const columns = [
    columnHelper.accessor("id", {
      header: "Código",
      size: 5,
      cell: info => (
        <div className="flex justify-center">
          {info.renderValue()}
        </div>
      ),
    }),
    columnHelper.accessor("name", {
      header: "Nome"
    }),
    columnHelper.accessor("amount", {
      header: "Quantidade",
      size: 5,
      cell: info => (
        <div className="flex justify-center">
          {info.renderValue()}
        </div>
      ),
    }),
    columnHelper.accessor("price", {
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
  ];


  return (
    <Card title="Produtos">
      <div className="p-4">
        <Table
          data={data}
          columns={columns}
        />
      </div>
    </Card>
  );
}