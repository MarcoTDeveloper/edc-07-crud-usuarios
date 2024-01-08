import { useCallback, useContext } from "react";
import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";
import { Eye } from "@phosphor-icons/react";
import { format } from "date-fns";

import { AuthContext } from "@/contexts/AuthContext";
import { useFetch } from "@/hooks/useFetch";
import { DeleteSale } from "./Delete";
import { Loading } from "../ui/Loading";
import { Table } from "../ui/Table";
import { NoData } from "../ui/NoData";

export type Sales = {
    id: number;
    user: string;
    client_name: string;
    date: string;
    payment_methods: string;
    slug: string;
    status: boolean;
}

export function SalesList() {
    const { data, mutate, isLoading } = useFetch<Sales[]>("/sales");
    const { user } = useContext(AuthContext);

    const onDeleteSale = useCallback((slug: string) => {
        const updateSalesData = data?.filter(sale => sale.slug !== slug);
        mutate(updateSalesData, false);
    }, [data, mutate]);

    const columnHelper = createColumnHelper<Sales>();
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
        columnHelper.accessor("user", {
            header: "Usuário",
        }),
        columnHelper.accessor("client_name", {
            header: "Cliente",
        }),
        columnHelper.accessor("payment_methods", {
            header: "Método de pagamento",
            size: 10,
            cell: info => (
                <div className="flex items-center justify-center">
                    {info.renderValue()}
                </div>
            ),
        }),
        columnHelper.accessor("date", {
            header: "Data",
            size: 10,
            cell: info => (
                <div className="flex items-center justify-center">
                    {format(new Date(info.renderValue()!), "dd/LL/yyyy 'às' HH:mm")}
                </div>
            ),
        }),
        columnHelper.accessor("status", {
            header: "Situação",
            size: 5,
            cell: info => (
                <div className="flex items-center justify-center">
                    {info.renderValue() ? "Ativo" : "Cancelada"}
                </div>
            ),
        }),
        columnHelper.accessor("slug", {
            header: "",
            size: 10,
            cell: info => (
                <div className="flex items-center gap-2 justify-center">
                    {user?.permissions.includes("products.update") && (
                        <Link href={`/sales/${info.renderValue()}`}>
                            <Eye size={24} />
                        </Link>
                    )}
                    {user?.permissions.includes("sales.delete") && (
                        <DeleteSale
                            slug={info.renderValue() as string}
                            mutate={onDeleteSale}
                        />
                    )}
                </div>
            ),
        })
    ];

    if (!data || isLoading) {
        return <Loading />;
    } else if (!data || data.length === 0) {
        return <NoData message="Nenhuma venda encontrado!" />;
    }

    return (
        <Table
            data={data}
            columns={columns}
        />
    );
}