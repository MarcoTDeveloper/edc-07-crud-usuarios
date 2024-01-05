import { FloppyDiskBack } from "@phosphor-icons/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Router from "next/router";

import { Button } from "@/components/ui/Button";
import { Head } from "@/components/ui/Head";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Fetch } from "@/services/api";
import { Select } from "@/components/ui/Select";
import { useFetch } from "@/hooks/useFetch";
import { Loading } from "@/components/ui/Loading";

type CreateOrderFormData = {
    product_id: number,
    amount: number,
}

type Product = {
    id: number;
    name: string;
}


export default function CreateOrder() {
    const { register, handleSubmit, formState } = useForm<CreateOrderFormData>();

    const { data: dataProducts } = useFetch<Product[]>("/products");

    if (!dataProducts) {
        return <Loading />;
    }

    const handleCreateOrder: SubmitHandler<CreateOrderFormData> = async (data) => {
        Fetch.post("/orders/create", data).then(() => {
            toast.success("Pedido feito com sucesso!");
            Router.push("/orders");
        }).catch(() => {
            toast.error("Erro ao fazer pedido!");
        });
    };

    return (
        <>
            <Head title="Novo produto" />

            <form onSubmit={handleSubmit(handleCreateOrder)}>
                <PageHeader
                    className="mb-4"
                    title="Novo pedido"
                    button={
                        <Button
                            type="submit"
                            ariaLabel="Botão que salva o pedido"
                            variant="secondary"
                            icon={<FloppyDiskBack size={24} />}
                            isLoading={formState.isSubmitting}
                        >
                            Salvar
                        </Button>
                    }
                    breadcrumb={[
                        { title: "Pedidos", href: "/orders" },
                        { title: "Criar pedido" }
                    ]}
                />


                <Card title="Dados do pedido">
                    <div className="p-4">
                        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                            <Select
                                label="Produtos"
                                id="productId"
                                className="mb-4"
                                {...register("product_id", {
                                    required: "Campo obrigatório"
                                })}
                                required
                                error={formState.errors.product_id?.message}
                            >
                                {!dataProducts ?
                                    <option value="Nada por aqui..." disabled>Nada por aqui...</option>
                                    : (
                                        <>
                                            <option value="Selecione" disabled>Selecione</option>
                                            {dataProducts.map(product => (
                                                <option key={product.id} value={product.id}>{product.name}</option>
                                            ))}
                                        </>
                                    )}
                            </Select>
                            <Input
                                label="Quantidade"
                                id="amount"
                                type="number"
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
