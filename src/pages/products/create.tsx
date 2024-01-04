import { useEffect, useState } from "react";
import { FloppyDiskBack } from "@phosphor-icons/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Router from "next/router";

import { Button } from "@/components/ui/Button";
import { Head } from "@/components/ui/Head";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { CheckBox } from "@/components/ui/CheckBox";
import { Hr } from "@/components/ui/Hr";
import { Fetch } from "@/services/api";

type CreateProductFormData = {
    name: string;
    price: number;
}

export default function CreateUser() {
    const { register, handleSubmit, formState, setValue } = useForm<CreateProductFormData>();

    const handleCreateUser: SubmitHandler<CreateProductFormData> = async (data) => {
        Fetch.post("/products/create", data).then(() => {
            toast.success("Produto criado com sucesso!");
            Router.push("/products");
        }).catch(() => {
            toast.error("Erro ao criar produto!");
        });
    };

    return (
        <>
            <Head title="Novo produto" />

            <form onSubmit={handleSubmit(handleCreateUser)}>
                <PageHeader
                    className="mb-4"
                    title="Novo produto"
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
                        { title: "Produtos", href: "/products" },
                        { title: "Criar Produto" }
                    ]}
                />


                <Card title="Dados do produto">
                    <div className="p-4">
                        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                            <Input
                                label="Nome"
                                id="name"
                                type="text"
                                className="mb-4"
                                {...register("name", {
                                    required: "Campo obrigatório"
                                })}
                                required
                                error={formState.errors.name?.message}
                            />
                            <Input
                                label="Preço"
                                id="price"
                                type="number"
                                className="mb-4"
                                {...register("price", {
                                    required: "Campo obrigatório"
                                })}
                                required
                                error={formState.errors.price?.message}
                            />
                        </div>
                    </div>
                </Card>
            </form>
        </>
    );
}
