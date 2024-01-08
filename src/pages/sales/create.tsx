import { FloppyDiskBack, PlusCircle } from "@phosphor-icons/react";
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
    client_name: string,
    payment_methods: string,
    products: {
        product_id: number,
        amount: number
    }[],
}

type Product = {
    id: number;
    name: string;
    amount: number;
}

export default function CreateSale() {
    const { register, handleSubmit, formState, control } = useForm<CreateSaleFormData>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "products",
    });

    const { data: dataProducts } = useFetch<Product[]>("/products");

    if (!dataProducts) {
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
        append({product_id: 0, amount: 1 });
    }

    return (
        <>
            <Head title="Nova venda" />

            <form onSubmit={handleSubmit(handleCreateSale)}>
                <PageHeader
                    className="mb-4"
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
                        { title: "Criar venda" }
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
                                {...register("client_name", {
                                    required: "Campo obrigatório"
                                })}
                                required
                                error={formState.errors.client_name?.message}
                            />
                            <Select
                                label="Metodo de pagamento"
                                id="payment_methods"
                                className="mb-4"
                                {...register("payment_methods", {
                                    required: "Campo obrigatório"
                                })}
                                required
                                error={formState.errors.payment_methods?.message}
                            >
                                <option value="Selecione">Selecione</option>
                                <option value="Pix">Pix</option>
                                <option value="Boleto">Boleto</option>
                                <option value="Cartão">Cartão</option>
                            </Select>
                        </div>
                    </div>
                </Card>

                <Card title="Dados dos produtos" className="mt-7 pb-4">
                
                <Button
                    onClick={addProducts}
                    className="mx-4 mt-4"
                    type="button"
                    ariaLabel="Botão que salva o produto da venda"
                    variant="secondary"
                    icon={<PlusCircle size={24} />}
                    isLoading={formState.isSubmitting}
                >
                    Adicionar
                </Button>

                {fields.map((field, index) => {
                    return (
                    <div
                        key={field.id}
                        className="p-4 grid grid-cols-2 gap-4"
                    >
                        <Select
                            label="Produtos"
                            id="product_id"
                            className="mb-3"
                            {...register(`products.${index}.product_id`, {
                                required: "Campo obrigatório"
                            })}
                            required
                            error={formState.errors.products?.[index]?.product_id?.message}
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
                        type="number"
                        className="mb-3"
                        {...register(`products.${index}.amount`, {
                            required: "Campo obrigatório"
                        })}
                        required
                        error={formState.errors.products?.[index]?.amount?.message}
                        />
                    </div>
                    );
                })}            
                </Card>
            </form>
        </>
    );
}
