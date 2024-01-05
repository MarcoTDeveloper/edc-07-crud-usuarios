import { useCallback, useContext } from "react";
import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";
import { Eye } from "@phosphor-icons/react";

import { AuthContext } from "@/contexts/AuthContext";
import { useFetch } from "@/hooks/useFetch";
import { DeleteUser } from "./Delete";
import { Loading } from "../ui/Loading";
import { Table } from "../ui/Table";
import { NoData } from "../ui/NoData";

export type Users = {
    id: number;
    name: string;
    position: string;
    slug: string;
    status: boolean;
}

export function UsersList() {
    const { data, mutate, isLoading } = useFetch<Users[]>("/users");
    const { user } = useContext(AuthContext);

    const onDeleteUser = useCallback((slug: string) => {
        const updateUsersData = data?.filter(user => user.slug !== slug);
        mutate(updateUsersData, false);
    }, [data, mutate]);

    const columnHelper = createColumnHelper<Users>();
    const columns = [
        columnHelper.accessor("id", {
            header: "ID",
            size: 5,
            cell: info => (
                <div className="flex items-center justify-center">
                    {info.renderValue()}
                </div>
            )
        }),
        columnHelper.accessor("name", {
            header: "Nome",
        }),
        columnHelper.accessor("position", {
            header: "Departamento",
            size: 25,
            cell: info => (
                <div className="flex items-center justify-center">
                    {info.renderValue()}
                </div>
            ),
        }),
        columnHelper.accessor("status", {
            header: "Status",
            size: 10,
            cell: info => (
                <div className="flex items-center justify-center">
                    {info.renderValue() ? "Ativo" : "Inativo"}
                </div>
            ),
        }),
        columnHelper.accessor("slug", {
            header: "",
            size: 10,
            cell: info => (
                <div className="flex items-center gap-2 justify-center">
                    {user?.permissions.includes("users.update") && (
                        <Link href={`/users/${info.renderValue()}`}>
                            <Eye size={24} />
                        </Link>
                    )}
                    {user?.permissions.includes("users.delete") && (
                        <DeleteUser
                            slug={info.renderValue() as string}
                            mutate={onDeleteUser}
                        />
                    )}
                </div>
            ),
        })
    ];

    if (!data || isLoading) {
        return <Loading />;
    } else if (!data || data.length === 0) {
        return <NoData message="Nenhum usuário encontrado!" />;
    }

    return (
        <Table
            data={data}
            columns={columns}
        />
    );
}