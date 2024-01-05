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

type UpdateProductProps = {
    slug: string;
}

type Product = {
    id: number;
    name: string;
    price: number;
}

interface UpdateProductFormData extends Product { }

export default function UpdateUser({ slug }: UpdateProductProps) {
    const { data } = useFetch<Product>(`/products/${slug}`);
    const { register, handleSubmit, formState, setValue, watch } = useForm<UpdateProductFormData>();
    const watchUserName = watch("name");

    useEffect(() => {
        if (data) {
            setValue("id", data.id);
            setValue("name", data.name);
            setValue("price", data.price);
        }
    }, [data, setValue]);

    const handleUpdateProduct: SubmitHandler<UpdateProductFormData> = async (data) => {
        Fetch.post("/products/update", data).then(() => {
            toast.success("Produto atualizado com sucesso!");
            Router.push("/products");
        }).catch(() => {
            toast.error("Erro ao atualizar produto!");
        });
    };

    if (!data) {
        return <Loading />;
    }

    return (
        <>
            <Head title="Editar produto" />

            <form onSubmit={handleSubmit(handleUpdateProduct)}>
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
                        { title: "Produtos", href: "/products" },
                        { title: watchUserName || "Editar Produto" }
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
        if (!user.permissions.includes("products.update")) {
            return {
                redirect: {
                    destination: "/products",
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