import { FloppyDiskBack, PlusCircle, TrashSimple } from "@phosphor-icons/react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
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

type CreateSaleFormData = {
    clientName: string,
    paymentMethods: string,
    products: {
        productId: string,
        amount: number
    }[],
}

type Inventory = {
    id: number
    name: string
    amount: number
    unitaryValue: number
    totalValue: number
}

export default function CreateSale() {
    const { data: products } = useFetch<Inventory[]>("/inventory");
    const { register, handleSubmit, formState, control } = useForm<CreateSaleFormData>();
    const { fields: productsFields, append: appendProducts, remove: removeProducts } = useFieldArray({
        control,
        name: "products",
    });


    if (!products) {
        return <Loading />;
    }

    const handleCreateSale: SubmitHandler<CreateSaleFormData> = async (data) => {
        Fetch.post("/sales", data).then(() => {
            toast.success("Venda feita com sucesso!");
            Router.push("/sales");
        }).catch(() => {
            toast.error("Erro ao fazer a venda!");
        });
    };

    function addProducts() {
        appendProducts({ productId: "", amount: 1 });
    }

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

                <Card title="Dados da venda">
                    <div className="p-4">
                        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
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

                <Card className="p-4">
                    <header className="flex items-center justify-between gap-4">
                        <h2 className="text-2xl font-semibold">
                            Dados dos produtos
                        </h2>
                        <Button
                            onClick={addProducts}
                            type="button"
                            ariaLabel="Botão que salva o produto da venda"
                            variant="secondary"
                            icon={<PlusCircle size={24} />}
                            isLoading={formState.isSubmitting}
                        >
                            Adicionar
                        </Button>
                    </header>
                    <main className="space-y-4">
                        {productsFields.map((field, index) => {
                            return (
                                <div key={field.id} className="flex items-center gap-4">
                                    <div className="flex-1 flex flex-col md:grid md:grid-cols-2 gap-4">
                                        <Select
                                            label="Produtos"
                                            id="productId"
                                            {...register(`products.${index}.productId`, {
                                                required: "Campo obrigatório"
                                            })}
                                            required
                                            error={formState.errors.products?.[index]?.productId?.message}
                                        >
                                            {!products ?
                                                <option value="Nada por aqui...">Nada por aqui...</option>
                                                : (
                                                    <>
                                                        <option value="">Selecione</option>
                                                        {products.map(product => (
                                                            <option key={product.id} value={product.id}>{product.name}</option>
                                                        ))}
                                                    </>
                                                )}
                                        </Select>
                                        <Input
                                            label="Quantidade"
                                            id="amount"
                                            type="number"
                                            {...register(`products.${index}.amount`, {
                                                required: "Campo obrigatório",
                                                min: {
                                                    value: 1,
                                                    message: "A quantidade mínima é de 1"
                                                }
                                            })}
                                            required
                                            error={formState.errors.products?.[index]?.amount?.message}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        aria-label="Botão de remover produto"
                                        className="mt-5 flex items-center justify-center text-red-500"
                                        onClick={() => removeProducts(index)}
                                    >
                                        <TrashSimple size={24} />
                                    </button>
                                </div>
                            );
                        })}
                    </main>
                </Card>
            </form>
        </>
    );
}
