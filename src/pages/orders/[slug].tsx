import { useEffect } from "react";
import { FloppyDiskBack } from "@phosphor-icons/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Router from "next/router";
import { GetServerSideProps } from "next/types";
import { getServerSession } from "next-auth/next";

import { Button } from "@/components/ui/Button";
import { Head } from "@/components/ui/Head";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Loading } from "@/components/ui/Loading";
import { useFetch } from "@/hooks/useFetch";
import { Fetch } from "@/services/api";
import { authOptions } from "../api/auth/[...nextauth]";
import { UserProps } from "@/contexts/AuthContext";
import { Select } from "@/components/ui/Select";

type UpdateOrderProps = {
    slug: string;
}

type Product = {
    id: number;
    name: string;
}

type Order = {
    id: number;
    product_id: number;
    amount: number;
    product: Product;
}

interface UpdateOrderFormData extends Order { }

export default function UpdateOrder({ slug }: UpdateOrderProps) {
    const { data } = useFetch<Order>(`/orders/${slug}`);

    const { register, handleSubmit, formState, setValue, watch } = useForm<UpdateOrderFormData>();
    const watchUserName = watch("product.name");

    const { data: dataProducts } = useFetch<Product[]>("/products");

    useEffect(() => {
        if (data) {
            setValue("id", data.id);
            setValue("product_id", data.product_id);
            setValue("amount", data.amount);
        }
    }, [data, setValue]);

    if (!dataProducts) {
        return <Loading />;
    }

    const handleUpdateOrder: SubmitHandler<UpdateOrderFormData> = async (data) => {
        Fetch.put("/orders", data).then(() => {
            toast.success("Pedido atualizado com sucesso!");
            Router.push("/orders");
        }).catch(() => {
            toast.error("Erro ao atualizar pedido!");
        });
    };

    if (!data) {
        return <Loading />;
    }

    return (
        <>
            <Head title="Editar pedido" />

            <form onSubmit={handleSubmit(handleUpdateOrder)}>
                <PageHeader
                    className="mb-4"
                    title="Editar produto"
                    button={
                        <Button
                            type="submit"
                            ariaLabel="Botão que salva o produto"
                            variant="secondary"
                            icon={<FloppyDiskBack size={24} />}
                            isLoading={formState.isSubmitting}
                        >
                            Salvar
                        </Button>
                    }
                    breadcrumb={[
                        { title: "Pedidos", href: "/orders" },
                        { title: watchUserName || "Editar Pedido" }
                    ]}
                />

                <Card title="Dados do produto">
                    <div className="p-4">
                        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                            <Select
                                label="Produtos"
                                id="product_id"
                                className="mb-4"
                                {...register("product_id", {
                                    required: "Campo obrigatório"
                                })}
                                required
                                error={formState.errors.product_id?.message}
                            >
                                {!dataProducts ?
                                    <option value="Nada por aqui...">Nada por aqui...</option>
                                    : (
                                        <>
                                            <option value="Selecione">Selecione</option>
                                            {dataProducts.map(product => (
                                                <option key={product.id} value={product.id}>{product.name}</option>
                                            ))}
                                        </>
                                    )}
                            </Select>
                            <Input
                                label="Quantidade"
                                id="amount"
                                type="text"
                                className="mb-4"
                                {...register("amount", {
                                    required: "Campo obrigatório"
                                })}
                                required
                                error={formState.errors.amount?.message}
                            />
                        </div>
                    </div>
                </Card>
            </form>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);
    const { slug } = context.params as { slug: string };

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        };
    } else {
        const { user } = session?.user as { user: UserProps };
        if (!user.permissions.includes("orders.update")) {
            return {
                redirect: {
                    destination: "/orders",
                    permanent: false
                }
            };
        }

        return {
            props: {
                slug
            }
        };
    }
};