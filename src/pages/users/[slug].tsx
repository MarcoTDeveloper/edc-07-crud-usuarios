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
    }
}

interface UpdateUserFormData extends User {
    changePassword: boolean;
    password: string;
    passwordConfirmation: string;
}

export default function UpdateUser({ slug }: UpdateUserProps) {
    const { data } = useFetch<User>(`/users/${slug}`);
    // const { data: departments } = useFetch<Departments[]>("/departments");
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState, setValue, getValues, watch } = useForm<UpdateUserFormData>();
    const [changePassword, setChangePassword] = useState<boolean>(false);
    const [usersRead, setUsersRead] = useState<boolean>(false);
    const watchUserName = watch("name");

    useEffect(() => {
        if (data) {
            setValue("id", data.id);
            setValue("name", data.name);
            setValue("email", data.email);
            setValue("position", data.position);
            setValue("status", data.status);
            setValue("permissions.config.update", data.permissions.config.update);
            setValue("permissions.users.create", data.permissions.users.create);
            setValue("permissions.users.read", data.permissions.users.read);
            setValue("permissions.users.update", data.permissions.users.update);
            setValue("permissions.users.delete", data.permissions.users.delete);
            setUsersRead(data.permissions.users.read);
        }
    }, [data, setValue]);

    const handleUpdateUsersRead = (status: boolean) => {
        setUsersRead(status);
        if (!status) {
            setValue("permissions.users.create", false);
            setValue("permissions.users.update", false);
            setValue("permissions.users.delete", false);
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
                                    {/* <Select
                                        label="Departamento"
                                        id="position"
                                        className="mb-4"
                                        {...register("position", {
                                            required: "Campo obrigatório"
                                        })}
                                        required
                                        error={formState.errors.position?.message}
                                    >
                                        <option value="">Selecione</option>
                                        {departments?.map(department => (
                                            <option key={department.id} value={department.id}>{department.description}</option>
                                        ))}
                                    </Select> */}
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
                                    id="configUpdate"
                                    label="Configurações"
                                    className="mb-2"
                                    {...register("permissions.config.update")}
                                />
                                <Hr className="my-4" />
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