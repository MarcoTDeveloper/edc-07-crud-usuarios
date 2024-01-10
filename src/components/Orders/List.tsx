import { useCallback, useContext } from "react";
import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";
import { Eye } from "@phosphor-icons/react";
import { format } from "date-fns";

import { AuthContext } from "@/contexts/AuthContext";
import { useFetch } from "@/hooks/useFetch";
import { DeleteOrder } from "./Delete";
import { Loading } from "../ui/Loading";
import { Table } from "../ui/Table";
import { NoData } from "../ui/NoData";
import { Products } from "../Products/List";

export type Orders = {
    id: number;
    product: Products;
    user: string;
    date: string;
    amount: number;
    slug: string;
}

export function OrdersList() {
    const { data, mutate, isLoading } = useFetch<Orders[]>("/orders");
    const { user } = useContext(AuthContext);

    const onDeleteOrder = useCallback((slug: string) => {
        const updateOrdersData = data?.filter(order => order.slug !== slug);
        mutate(updateOrdersData, false);
    }, [data, mutate]);

    const columnHelper = createColumnHelper<Orders>();
    const columns = [
        columnHelper.accessor("id", {
            header: "Código",
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
        columnHelper.accessor("product.name", {
            header: "Produto",
        }),
        columnHelper.accessor("amount", {
            header: "Quantidade",
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
        columnHelper.accessor("slug", {
            header: "",
            size: 10,
            cell: info => (
                <div className="flex items-center gap-2 justify-center">
                    {user?.permissions.includes("orders.update") && (
                        <Link href={`/orders/${info.renderValue()}`}>
                            <Eye size={24} />
                        </Link>
                    )}
                    {user?.permissions.includes("orders.delete") && (
                        <DeleteOrder
                            slug={info.renderValue() as string}
                            mutate={onDeleteOrder}
                        />
                    )}
                </div>
            ),
        })
    ];

    if (!data || isLoading) {
        return <Loading />;
    } else if (!data || data.length === 0) {
        return <NoData message="Nenhum pedido encontrado!" />;
    }

    return (
        <Table
            data={data}
            columns={columns}
        />
    );
}