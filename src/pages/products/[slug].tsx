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
import { Hr } from "@/components/ui/Hr";
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
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState, setValue, getValues, watch } = useForm<UpdateProductFormData>();
    const [changePassword, setChangePassword] = useState<boolean>(false);
    const [usersRead, setUsersRead] = useState<boolean>(false);
    const watchUserName = watch("name");

    useEffect(() => {
        if (data) {
            setValue("id", data.id);
            setValue("name", data.name);
            setValue("price", data.price);
            setValue("permissions.products.create", data.permissions.products.create);
            setValue("permissions.products.read", data.permissions.products.read);
            setValue("permissions.products.update", data.permissions.products.update);
            setValue("permissions.products.delete", data.permissions.products.delete);
            setUsersRead(data.permissions.products.read);
        }
    }, [data, setValue]);

    const handleUpdateUser: SubmitHandler<UpdateProductFormData> = async (data) => {
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

            <form onSubmit={handleSubmit(handleUpdateUser)}>
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

                <div className="flex flex-col gap-4 md:grid md:grid-cols-12">
                    <div className="md:col-span-8">
                        <Card title="Dados do usuário">
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
                                        label="E-mail"
                                        id="number"
                                        type="email"
                                        className="mb-4"
                                        {...register("email", {
                                            required: "Campo obrigatório"
                                        })}
                                        required
                                        error={formState.errors.email?.message}
                                    />
                                </div>
                                <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                                    <Select
                                        label="Status"
                                        id="status"
                                        className="mb-4"
                                        {...register("status", {
                                            required: "Campo obrigatório"
                                        })}
                                        required
                                        error={formState.errors.status?.message}
                                    >
                                        <option value="">Selecione</option>
                                        <option value="true">Ativo</option>
                                        <option value="false">Inativo</option>
                                    </Select>
                                </div>
                                <CheckBox
                                    id="changePassword"
                                    label="Alterar senha"
                                    {...register("changePassword", {
                                        onChange: (e) => setChangePassword(e.target.checked)
                                    })}
                                />
                            </div>
                            <Collapse isOpen={changePassword}>
                                {changePassword && (
                                    <div className="px-4 pb-4">
                                        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                                            <Input
                                                label="Senha"
                                                id="password"
                                                type="password"
                                                className="mb-4 md:mb-0"
                                                {...register("password")}
                                            />
                                            <Input
                                                label="Confirmar Senha"
                                                id="passwordConfirmation"
                                                type="password"
                                                {...register("passwordConfirmation", {
                                                    validate: (value) => value === getValues("password") || "As senhas não conferem"
                                                })}
                                                error={formState.errors.passwordConfirmation?.message}
                                            />
                                        </div>
                                    </div>
                                )}
                            </Collapse>
                        </Card>
                    </div>
                </div>
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
        if (!user.permissions.includes("users.update")) {
            return {
                redirect: {
                    destination: "/users",
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