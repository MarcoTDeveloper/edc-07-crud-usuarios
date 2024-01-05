import { useContext, useEffect, useState } from "react";
import { FloppyDiskBack, User } from "@phosphor-icons/react";
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
import { Select } from "@/components/ui/Select";
import { CheckBox } from "@/components/ui/CheckBox";
import { Loading } from "@/components/ui/Loading";
import { AuthContext, UserProps } from "@/contexts/AuthContext";
import { useFetch } from "@/hooks/useFetch";
import { Collapse } from "@/components/ui/Collapse";
import { Fetch } from "@/services/api";
import { authOptions } from "../api/auth/[...nextauth]";

type UpdateProductProps = {
    slug: string;
}

type Product = {
    id: number;
    name: string;
    price: number;
}

export default function UpdateUser({ slug }: UpdateProductProps) {
    const { data } = useFetch<Product>(`/products/${slug}`);
    const { register, handleSubmit, formState, setValue, getValues, watch } = useForm();
    const watchUserName = watch("name");

    const handleUpdateUser: SubmitHandler<Product> = async (data) => {
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

            <form /*onSubmit={handleSubmit(handleUpdateUser)}*/>
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
                                // error={formState.errors.name?.message}
                            />
                            <Input
                                label="Preço"
                                id="number"
                                type="price"
                                className="mb-4"
                                {...register("price", {
                                    required: "Campo obrigatório"
                                })}
                                required
                                // error={formState.errors.email?.message}
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