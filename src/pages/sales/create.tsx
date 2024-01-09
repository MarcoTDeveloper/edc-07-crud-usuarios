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

export type SelectedProducts = {
    productId: number;
    amount: number;
    description: string;
    uniValue: string;
    totalValue: string;
}

type CreateSaleFormData = {
    clientName: string,
    paymentMethods: string,
    products: {
        productId: number;
        amount: number;
    }[],
}

export default function CreateSale() {
    const { register, handleSubmit, formState, control, setValue } = useForm<CreateSaleFormData>();
    const { fields: productsFields, remove: removeProducts } = useFieldArray({
        control,
        name: "products",
    });
    const [selectedProducts, setSelectedProducts] = useState<SelectedProducts[]>([]);

    const handleCreateSale: SubmitHandler<CreateSaleFormData> = async (data) => {
        Fetch.post("/sales", data).then(() => {
            toast.success("Venda feita com sucesso!");
            Router.push("/sales");
        }).catch(() => {
            toast.error("Erro ao fazer a venda!");
        });
    };

    useEffect(() => {
        if (selectedProducts) {
            setValue("products", selectedProducts);
        }
    },
        [selectedProducts, setValue, productsFields]);

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
                    setSelectedProducts={data => setSelectedProducts(prev => ({
                        ...prev,
                        data
                    }))}
                />
                <div className="flex flex-col md:grid md:grid-cols-10 md:items-start gap-4">
                    <Card className="p-4 col-span-8">
                        <header className="flex items-center justify-between gap-4">
                            <h2 className="text-2xl font-semibold">
                                Produtos selecionados
                            </h2>
                        </header>
                        <main className="space-y-4">
                            {selectedProducts.length === 0 ?
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
                                    <>
                                        {productsFields.map((fields, index) => {
                                            return (
                                                <div key={fields.id} className="flex items-center gap-4">
                                                    <div className="flex-1 flex flex-col md:grid md:grid-cols-11 gap-4">
                                                        <Input
                                                            id="amount"
                                                            label="Quant."
                                                            type="number"
                                                            {...register(`products.${index}.amount`)}
                                                            disabled
                                                            className="col-span-2"
                                                        />
                                                        <Input
                                                            id="productId"
                                                            label="Produtos"
                                                            type="text"
                                                            value={`products.${index}.productId`}
                                                            disabled
                                                            className="col-span-5"
                                                        >
                                                        </Input>
                                                        <Input
                                                            id="productUnitValue"
                                                            type="text"
                                                            label="Valor Uni. (R$)"
                                                            value={0}
                                                            disabled
                                                            className="md:col-span-2"
                                                        />
                                                        <Input
                                                            id="productTotalValue"
                                                            type="text"
                                                            label="Valor Total (R$)"
                                                            value={0}
                                                            disabled
                                                            className="md:col-span-2"
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        aria-label="Botão de remover produto"
                                                        className="mt-5 flex items-center justify-center text-red-500"
                                                        onClick={() => { removeProducts(index); }}
                                                    >
                                                        <TrashSimple size={24} />
                                                    </button>
                                                </div>
                                            );
                                        })}

                                        {JSON.stringify(selectedProducts)}
                                    </>
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
