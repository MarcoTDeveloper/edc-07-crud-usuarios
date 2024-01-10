import { useCallback, useContext } from "react";
import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";
import { Eye } from "@phosphor-icons/react";

import { AuthContext } from "@/contexts/AuthContext";
import { useFetch } from "@/hooks/useFetch";
import { DeleteProduct } from "./Delete";
import { Loading } from "../ui/Loading";
import { Table } from "../ui/Table";
import { NoData } from "../ui/NoData";

export type Products = {
    id: number;
    name: string;
    price: number;
    slug: string;
}

export function ProductsList() {
    const { data, mutate, isLoading } = useFetch<Products[]>("/products");
    const { user } = useContext(AuthContext);

    const onDeleteProduct = useCallback((slug: string) => {
        const updateProductsData = data?.filter(product => product.slug !== slug);
        mutate(updateProductsData, false);
    }, [data, mutate]);

    const columnHelper = createColumnHelper<Products>();
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
        columnHelper.accessor("name", {
            header: "Nome",
        }),
        columnHelper.accessor("price", {
            header: "Preço (R$)",
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
                <div className="flex items-center gap-2 justify-center">
                    {user?.permissions.includes("products.update") && (
                        <Link href={`/products/${info.renderValue()}`}>
                            <Eye size={24} />
                        </Link>
                    )}
                    {user?.permissions.includes("products.delete") && (
                        <DeleteProduct
                            slug={info.renderValue() as string}
                            mutate={onDeleteProduct}
                        />
                    )}
                </div>
            ),
        })
    ];

    if (!data || isLoading) {
        return <Loading />;
    } else if (!data || data.length === 0) {
        return <NoData message="Nenhum produto encontrado!" />;
    }

    return (
        <Table
            data={data}
            columns={columns}
        />
    );
}