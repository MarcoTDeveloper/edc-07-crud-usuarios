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

type CrudProps = {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
}

type CreateUserFormData = {
    name: string;
    email: string;
    position: string;
    status: string;
    password: string;
    passwordConfirmation: string;
    permissions: {
        users: CrudProps;
    }
}

export default function CreateUser() {
    const { register, handleSubmit, formState, setValue, getValues, setError } = useForm<CreateUserFormData>();
    const [usersRead, setUsersRead] = useState<boolean>(false);

    useEffect(() => {
        if (!usersRead) {
            setValue("permissions.users.create", false);
            setValue("permissions.users.update", false);
            setValue("permissions.users.delete", false);
        }
    }, [usersRead, setValue]);

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (data) => {
        Fetch.post("/users/create", data).then(() => {
            toast.success("Usuário criado com sucesso!");
            Router.push("/users");
        }).catch((error) => {
            toast.error("Erro ao criar usuário!");
            if (error.response.status == 409) {
                setError("email", { type: "custom", message: "o e-mail informado já existe!" });
            }
        });
    };

    return (
        <>
            <Head title="Novo usuário" />

            <form onSubmit={handleSubmit(handleCreateUser)}>
                <PageHeader
                    className="mb-4"
                    title="Novo usuário"
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
                        { title: "Criar Usuário" }
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
                                <div className="flex flex-col gap-4 md:grid md:grid-cols-4">
                                    <Select
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
                                        <option value="Desenvolvedor">Desenvolvedor</option>
                                        <option value="Usuários">Usuários</option>
                                        <option value="Suporte">Suporte</option>
                                    </Select>
                                    <Select
                                        label="Status"
                                        id="status"
                                        className="mb-4"
                                        {...register("status", {
                                            required: "Campo obrigatório"
                                        })}
                                        error={formState.errors.status?.message}
                                    >
                                        <option value="">Selecione</option>
                                        <option value="true">Ativo</option>
                                        <option value="false">Inativo</option>
                                    </Select>
                                    <Input
                                        label="Senha"
                                        id="password"
                                        type="password"
                                        className="mb-4 md:mb-0"
                                        {...register("password", {
                                            required: "Campo obrigatório"
                                        })}
                                        required
                                        error={formState.errors.password?.message}
                                    />
                                    <Input
                                        label="Confirmar Senha"
                                        id="passwordConfirmation"
                                        type="password"
                                        {...register("passwordConfirmation", {
                                            required: "Campo obrigatório",
                                            validate: (value) => value === getValues("password") || "As senhas não conferem"
                                        })}
                                        required
                                        error={formState.errors.passwordConfirmation?.message}
                                    />
                                </div>
                            </div>
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
                                        onChange: (e) => setUsersRead(e.target.checked)
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
                                    {...register("permissions.users.read", {
                                        onChange: (e) => setUsersRead(e.target.checked)
                                    })}
                                />
                                <CheckBox
                                    id="productCreate"
                                    label="Criar produtos"
                                    className="ml-5 mb-2"
                                    {...register("permissions.users.create")}
                                    disabled={!usersRead}
                                />
                                <CheckBox
                                    id="productUpdate"
                                    label="Editar produtos"
                                    className="ml-5 mb-2"
                                    {...register("permissions.users.update")}
                                    disabled={!usersRead}
                                />
                                <CheckBox
                                    id="productDelete"
                                    label="Excluir produtos"
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
