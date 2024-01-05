import { useContext, useEffect, useState } from "react";
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
import { Select } from "@/components/ui/Select";
import { CheckBox } from "@/components/ui/CheckBox";
import { Hr } from "@/components/ui/Hr";
import { Loading } from "@/components/ui/Loading";
import { AuthContext, UserProps } from "@/contexts/AuthContext";
import { useFetch } from "@/hooks/useFetch";
import { Collapse } from "@/components/ui/Collapse";
import { Fetch } from "@/services/api";
import { authOptions } from "../api/auth/[...nextauth]";

type UpdateUserProps = {
    slug: string;
}

type CrudProps = {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
}

type User = {
    id: number;
    name: string;
    email: string;
    position: string;
    status: string;
    permissions: {
        config: {
            update: boolean;
        };
        users: CrudProps;
        products: CrudProps;
        orders: CrudProps;
        sales: CrudProps;
        inventory: CrudProps;
    }
}

interface UpdateUserFormData extends User {
    changePassword: boolean;
    password: string;
    passwordConfirmation: string;
}

export default function UpdateUser({ slug }: UpdateUserProps) {
    const { data } = useFetch<User>(`/users/${slug}`);
    const { register, handleSubmit, formState, setValue, getValues, watch } = useForm<UpdateUserFormData>();
    const [changePassword, setChangePassword] = useState<boolean>(false);

    const [usersRead, setUsersRead] = useState<boolean>(false);
    const [productsRead, setProductsRead] = useState<boolean>(false);
    const [ordersRead, setOrdersRead] = useState<boolean>(false);
    const [salesRead, setSalesRead] = useState<boolean>(false);
    const [inventoryRead, setInventoryRead] = useState<boolean>(false);

    const watchUserName = watch("name");

    useEffect(() => {
        if (data) {
            setValue("id", data.id);
            setValue("name", data.name);
            setValue("email", data.email);
            setValue("position", data.position);
            setValue("status", data.status);

            setValue("permissions.users.create", data.permissions.users.create);
            setValue("permissions.users.read", data.permissions.users.read);
            setValue("permissions.users.update", data.permissions.users.update);
            setValue("permissions.users.delete", data.permissions.users.delete);

            setValue("permissions.products.create", data.permissions.products.create);
            setValue("permissions.products.read", data.permissions.products.read);
            setValue("permissions.products.update", data.permissions.products.update);
            setValue("permissions.products.delete", data.permissions.products.delete);

            setValue("permissions.orders.create", data.permissions.orders.create);
            setValue("permissions.orders.read", data.permissions.orders.read);
            setValue("permissions.orders.update", data.permissions.orders.update);
            setValue("permissions.orders.delete", data.permissions.orders.delete);

            setValue("permissions.sales.create", data.permissions.sales.create);
            setValue("permissions.sales.read", data.permissions.sales.read);
            setValue("permissions.sales.update", data.permissions.sales.update);
            setValue("permissions.sales.delete", data.permissions.sales.delete);

            setValue("permissions.inventory.read", data.permissions.inventory.read);

            setUsersRead(data.permissions.users.read);
            setProductsRead(data.permissions.products.read);
            setOrdersRead(data.permissions.orders.read);
            setSalesRead(data.permissions.sales.read);
            setInventoryRead(data.permissions.inventory.read);

        }
    }, [data, setValue]);

    const handleUpdateUsersRead = (status: boolean) => {
        setUsersRead(status);
        if (!status) {
            setValue("permissions.users.create", false);
            setValue("permissions.users.update", false);
            setValue("permissions.users.delete", false);

            setValue("permissions.products.create", false);
            setValue("permissions.products.update", false);
            setValue("permissions.products.delete", false);

            setValue("permissions.orders.create", false);
            setValue("permissions.orders.update", false);
            setValue("permissions.orders.delete", false);

            setValue("permissions.sales.create", false);
            setValue("permissions.sales.update", false);
            setValue("permissions.sales.delete", false);
        }
    };

    const handleUpdateUser: SubmitHandler<UpdateUserFormData> = async (data) => {
        Fetch.post("/users/update", data).then(() => {
            toast.success("Usuário atualizado com sucesso!");
            Router.push("/users");
        }).catch(() => {
            toast.error("Erro ao atualizar usuário!");
        });
    };

    if (!data) {
        return <Loading />;
    }

    return (
        <>
            <Head title="Editar usuário" />

            <form onSubmit={handleSubmit(handleUpdateUser)}>
                <PageHeader
                    className="mb-4"
                    title="Editar usuário"
                    button={
                        <Button
                            type="submit"
                            ariaLabel="Botão que salva o usuário"
                            variant="secondary"
                            icon={<FloppyDiskBack size={24} />}
                            isLoading={formState.isSubmitting}
                        >
                            Salvar
                        </Button>
                    }
                    breadcrumb={[
                        { title: "Usuários", href: "/users" },
                        { title: watchUserName || "Editar Usuário" }
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
                    <div className="md:col-span-4">
                        <Card title="Funções do usuário">
                            <div className="p-4">
                                <CheckBox
                                    id="userRead"
                                    label="Usuários"
                                    className="mb-2"
                                    {...register("permissions.users.read", {
                                        onChange: (e) => handleUpdateUsersRead(e.target.checked)
                                    })}
                                />
                                <CheckBox
                                    id="userCreate"
                                    label="Criar Usuários"
                                    className="ml-5 mb-2"
                                    {...register("permissions.users.create")}
                                    disabled={!usersRead}
                                />
                                <CheckBox
                                    id="userUpdate"
                                    label="Editar Usuários"
                                    className="ml-5 mb-2"
                                    {...register("permissions.users.update")}
                                    disabled={!usersRead}
                                />
                                <CheckBox
                                    id="userDelete"
                                    label="Excluir Usuários"
                                    className="ml-5 mb-2"
                                    {...register("permissions.users.delete")}
                                    disabled={!usersRead}
                                />

                                <Hr className="my-4" />

                                <CheckBox
                                    id="productRead"
                                    label="Produtos"
                                    className="mb-2"
                                    {...register("permissions.products.read", {
                                        onChange: (e) => setProductsRead(e.target.checked)
                                    })}
                                />
                                <CheckBox
                                    id="productCreate"
                                    label="Criar produtos"
                                    className="ml-5 mb-2"
                                    {...register("permissions.products.create")}
                                    disabled={!productsRead}
                                />
                                <CheckBox
                                    id="productUpdate"
                                    label="Editar produtos"
                                    className="ml-5 mb-2"
                                    {...register("permissions.products.update")}
                                    disabled={!productsRead}
                                />
                                <CheckBox
                                    id="productDelete"
                                    label="Excluir produtos"
                                    className="ml-5 mb-2"
                                    {...register("permissions.products.delete")}
                                    disabled={!productsRead}
                                />

                                <Hr className="my-4" />

                                <CheckBox
                                    id="orderRead"
                                    label="Pedidos"
                                    className="mb-2"
                                    {...register("permissions.orders.read", {
                                        onChange: (e) => setOrdersRead(e.target.checked)
                                    })}
                                />
                                <CheckBox
                                    id="orderCreate"
                                    label="Criar pedidos"
                                    className="ml-5 mb-2"
                                    {...register("permissions.orders.create")}
                                    disabled={!ordersRead}
                                />
                                <CheckBox
                                    id="orderUpdate"
                                    label="Editar pedidos"
                                    className="ml-5 mb-2"
                                    {...register("permissions.orders.update")}
                                    disabled={!ordersRead}
                                />
                                <CheckBox
                                    id="orderDelete"
                                    label="Excluir pedidos"
                                    className="ml-5 mb-2"
                                    {...register("permissions.orders.delete")}
                                    disabled={!ordersRead}
                                />

                                <Hr className="my-4" />

                                <CheckBox
                                    id="saleRead"
                                    label="Vendas"
                                    className="mb-2"
                                    {...register("permissions.sales.read", {
                                        onChange: (e) => setSalesRead(e.target.checked)
                                    })}
                                />
                                <CheckBox
                                    id="saleCreate"
                                    label="Criar vendas"
                                    className="ml-5 mb-2"
                                    {...register("permissions.sales.create")}
                                    disabled={!salesRead}
                                />
                                <CheckBox
                                    id="saleUpdate"
                                    label="Editar vendas"
                                    className="ml-5 mb-2"
                                    {...register("permissions.sales.update")}
                                    disabled={!salesRead}
                                />
                                <CheckBox
                                    id="saleDelete"
                                    label="Excluir vendas"
                                    className="ml-5 mb-2"
                                    {...register("permissions.sales.delete")}
                                    disabled={!salesRead}
                                />

                                <Hr className="my-4" />

                                <CheckBox
                                    id="inventoryRead"
                                    label="Ver estoque"
                                    className="mb-2"
                                    {...register("permissions.inventory.read", {
                                        onChange: (e) => setInventoryRead(e.target.checked)
                                    })}
                                />
                            </div>
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