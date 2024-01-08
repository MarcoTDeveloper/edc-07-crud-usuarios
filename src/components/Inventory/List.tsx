import { useCallback, useContext } from "react";
import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";
import { Eye } from "@phosphor-icons/react";

import { AuthContext } from "@/contexts/AuthContext";
import { useFetch } from "@/hooks/useFetch";
import { Loading } from "../ui/Loading";
import { Table } from "../ui/Table";
import { NoData } from "../ui/NoData";

export type Inventory = {
    id: number,
    name: string,
    amount: number,
    unitary_value: number,
    total_value: number,
}

export function InventoryList() {
    const { data, isLoading } = useFetch<Inventory[]>("/inventory");

    const columnHelper = createColumnHelper<Inventory>();
    const columns = [
        columnHelper.accessor("id", {
            header: "ID",
            size: 5,
            cell: info => (
                <div className="flex items-center justify-center">
                    {info.renderValue()}
                </div>
            ),
        }),
        columnHelper.accessor("name", {
            header: "Produto"
        }),
        columnHelper.accessor("amount", {
            header: "Quantidade",
            size: 10,
            cell: info => (
                <div className="flex items-center justify-center">
                    {info.renderValue()}
                </div>
            ),
        }),
        columnHelper.accessor("unitary_value", {
            header: "Valor Unitário",
            size: 10,
            cell: info => (
                <div className="flex items-center justify-center">
                    {new Intl.NumberFormat("pt-Br", { style: "currency", currency: "BRL" }).format(info.renderValue()!)}
                </div>
            ),
        }),
        columnHelper.accessor("total_value", {
            header: "Valor Total",
            size: 10,
            cell: info => (
                <div className="flex items-center justify-center">
                    {new Intl.NumberFormat("pt-Br", { style: "currency", currency: "BRL" }).format(info.renderValue()!)}
                </div>
            ),
        }),
    ];

    if (!data || isLoading) {
        return <Loading />;
    } else if (!data || data.length === 0) {
        return <NoData message="Nenhum registro no estoque!" />;
    }

    return (
        <Table
            data={data}
            columns={columns}
        />
    );
}