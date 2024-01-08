import { useCallback, useContext } from "react";
import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";
import { Eye } from "@phosphor-icons/react";
import { format } from "date-fns";

import { AuthContext } from "@/contexts/AuthContext";
import { useFetch } from "@/hooks/useFetch";
import { CancelSale } from "./Delete";
import { Loading } from "../ui/Loading";
import { Table } from "../ui/Table";
import { NoData } from "../ui/NoData";

export type Sales = {
    id: number;
    date: string;
    paymentMethods: string;
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
        columnHelper.accessor("date", {
            header: "Data",
            size: 10,
            cell: info => (
                <div className="flex items-center justify-center">
                    {format(new Date(info.renderValue()!), "dd/LL/yyyy 'às' HH:mm")}
                </div>
            ),
        }),
        columnHelper.accessor("paymentMethods", {
            header: "Método de pagamento",
            size: 10,
            cell: info => (
                <div className="flex items-center justify-center">
                    {info.renderValue()}
                </div>
            ),
        }),

        columnHelper.accessor("slug", {
            header: "",
            size: 10,
            cell: info => (
                <div className="flex items-center gap-2 justify-end">
                    {info.row.original.status == true ? (
                        <>
                            {user?.permissions.includes("sales.read") && (
                                <Link href={`/sales/${info.renderValue()}`}>
                                    <Eye size={24} />
                                </Link>
                            )}
                            {user?.permissions.includes("sales.delete") && (
                                <CancelSale
                                    slug={info.renderValue() as string}
                                    mutate={onDeleteSale}
                                />
                            )}
                        </>) : (
                        <>
                            {user?.permissions.includes("sales.read") && (
                                <Link href={`/sales/${info.renderValue()}`}>
                                    <Eye size={24} />
                                </Link>
                            )}
                        </>)}
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