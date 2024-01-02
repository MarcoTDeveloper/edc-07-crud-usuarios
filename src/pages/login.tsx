import { GetStaticProps } from "next/types";
import { useContext } from "react";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import { SignIn } from "@phosphor-icons/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { AuthContext } from "../contexts/AuthContext";
import { Head } from "../components/ui/Head";
import { Button } from "../components/ui/Button";

import loginImg from "../assets/images/login_logo.png";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Loading } from "@/components/ui/Loading";

type LoginFormData = {
    email: string;
    password: string;
}

export default function Login() {
    const router = useRouter();
    const url = (typeof router.query.callbackUrl != "undefined" ? router.query.callbackUrl : "/") as string;
    const { signIn, session } = useContext(AuthContext);
    const { register, handleSubmit, formState } = useForm<LoginFormData>();

    const handleLogin: SubmitHandler<LoginFormData> = async ({ email, password }) => {
        const response = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        if (response.status === 200) {
            Router.push(url);
        } else {
            toast.error("E-mail ou senha incorretos");
        }
    };

    if (session) {
        Router.push(url);
        return <Loading />;
    }

    return (
        <>
            <Head title="Login" />
            <main className="h-full w-full flex items-center justify-center">
                <div className="w-full max-w-md mx-auto">
                    <Card className="w-full">
                        <div className="p-8 flex flex-col">
                            <Image
                                src={loginImg}
                                alt="Logo da Solo Fértil"
                                width={230}
                                height={230}
                                className="mx-auto my-12"
                                placeholder="blur"
                            />

                            <form onSubmit={handleSubmit(handleLogin)} className="mt-4">
                                <Input
                                    id="email"
                                    label="E-mail"
                                    type="email"
                                    placeholder="Digite seu e-mail"
                                    className="mb-4"
                                    {...register("email", {
                                        required: "Campo obrigatório"
                                    })}
                                    error={formState?.errors?.email?.message}
                                />
                                <Input
                                    id="password"
                                    label="Senha"
                                    type="password"
                                    placeholder="Digite sua senha"
                                    className="mb-4"
                                    {...register("password", {
                                        required: "Campo obrigatório"
                                    })}
                                    error={formState?.errors?.password?.message}
                                />
                                <Button
                                    ariaLabel="Botão que envia o formulário de login"
                                    variant="primary"
                                    icon={<SignIn size={24} />}
                                    className="w-full"
                                    isLoading={formState.isSubmitting}
                                    fullMobile
                                >
                                    Entrar
                                </Button>
                            </form>
                        </div>
                    </Card>
                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: "Login",
        },
    };
};