import { useEffect, useState } from "react";
import { FloppyDiskBack, TrashSimple } from "@phosphor-icons/react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Image from "next/image";
import Router from "next/router";

import NoDataImage from "@/assets/images/no_data.svg";
import { Button } from "@/components/ui/Button";
import { Head } from "@/components/ui/Head";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Fetch } from "@/services/api";
import { Select } from "@/components/ui/Select";
import { SelectProduct } from "@/components/Sales/SelectProduct";
import { SelectedProductsTable } from "@/components/Sales/SelectedProductsTable";

export type SelectedProducts = {
    id?: string;
    productId: number;
    amount: number;
    description: string;
    uniValue: string;
    totalValue: string;
}

export type CreateSaleFormData = {
    clientName: string,
    paymentMethods: string,
    products: SelectedProducts[],
}

export default function CreateSale() {
    const { register, handleSubmit, formState, control } = useForm<CreateSaleFormData>();
    const { fields: productsFields, append: appendProducts, remove: removeProducts } = useFieldArray({
        control,
        name: "products",
    });

    const handleCreateSale: SubmitHandler<CreateSaleFormData> = async (data) => {
        if (productsFields.length === 0) {
            toast.warning("É necessário adicionar pelo menos um produto pra efetuar uma venda!");
            return;
        }
        Fetch.post("/sales", data).then(() => {
            toast.success("Venda feita com sucesso!");
            Router.push("/sales");
        }).catch(() => {
            toast.error("Erro ao fazer a venda!");
        });
    };

    return (
        <>
            <Head title="Nova venda" />

            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(handleCreateSale)}
            >
                <PageHeader
                    title="Nova venda"
                    button={
                        <Button
                            type="submit"
                            ariaLabel="Botão que salva a venda"
                            variant="secondary"
                            icon={<FloppyDiskBack size={24} />}
                            isLoading={formState.isSubmitting}
                        >
                            Salvar
                        </Button>
                    }
                    breadcrumb={[
                        { title: "Vendas", href: "/sales" },
                        { title: "Nova venda" }
                    ]}
                />
                <SelectProduct
                    productsFields={productsFields}
                    append={appendProducts}
                />
                <div className="flex flex-col md:grid md:grid-cols-10 md:items-start gap-4">
                    <Card className="p-4 col-span-8">
                        <header className="flex items-center justify-between gap-4">
                            <h2 className="text-2xl font-semibold">
                                Produtos selecionados
                            </h2>
                        </header>
                        <main>
                            {productsFields.length === 0 ?
                                <div
                                    className="flex flex-col items-center gap-4 py-4 text-2xl font-semibold text-gray-500 "
                                >
                                    <Image
                                        src={NoDataImage}
                                        width={170}
                                        height={170}
                                        alt="Desenho de duas pranchetas vazias"
                                    />
                                    Nenhum produto adicionado
                                </div>
                                : (
                                    <SelectedProductsTable
                                        data={productsFields}
                                        remove={removeProducts}
                                    />
                                )}
                        </main>
                    </Card>
                    <Card
                        title="Dados da venda"
                        className="col-span-2"
                    >
                        <div className="p-4">
                            <div className="flex flex-col gap-4">
                                <Input
                                    label="Cliente"
                                    id="client_name"
                                    type="text"
                                    className="mb-4"
                                    {...register("clientName", {
                                        required: "Campo obrigatório"
                                    })}
                                    required
                                    error={formState.errors.clientName?.message}
                                />
                                <Select
                                    label="Metodo de pagamento"
                                    id="payment_methods"
                                    className="mb-4"
                                    {...register("paymentMethods", {
                                        required: "Campo obrigatório"
                                    })}
                                    required
                                    error={formState.errors.paymentMethods?.message}
                                >
                                    <option value="">Selecione</option>
                                    <option value="Pix">Pix</option>
                                    <option value="Boleto">Boleto</option>
                                    <option value="Cartão">Cartão</option>
                                </Select>
                            </div>
                        </div>
                    </Card>
                </div>
            </form>
        </>
    );
}
