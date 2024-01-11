import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { GetServerSideProps } from "next/types";
import { getServerSession } from "next-auth/next";

import { Head } from "@/components/ui/Head";
import { PageHeader } from "@/components/ui/PageHeader";
import { Loading } from "@/components/ui/Loading";
import { useFetch } from "@/hooks/useFetch";
import { authOptions } from "../api/auth/[...nextauth]";
import { UserProps } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ProductsList } from "@/components/Sales/ProductsList";

type SaleProps = {
    slug: string;
}

type Sales = {
    id: number;
    user: string;
    clientName: string;
    paymentMethods: string;
    status: string;
    totalValue: string;
    products: {
        id: number;
        amount: string;
        name: string;
        price: string;
        totalValue: string;
    }[]
}

type SaleFormData = {
    id: number;
    clientName: string;
    paymentMethods: string;
    status: string;
    totalValue: string;
    products: {
        productId: string;
        amount: number;
    }[]
}

export default function UpdateProduct({ slug }: SaleProps) {
    const { data, isLoading } = useFetch<Sales>(`/sales/${slug}`);
    const { register, setValue } = useForm<SaleFormData>();

    console.log(data);

    useEffect(() => {
        if (data) {
            setValue("id", data.id);
            setValue("clientName", data.clientName);
            setValue("paymentMethods", data.paymentMethods);
            setValue("status", data.status == "true" ? "Ativa" : "Cancelada");
            setValue("totalValue", data.totalValue);
        }
    }, [data, setValue]);

    if (!data || isLoading) {
        return <Loading />;
    }

    return (
        <>
            <Head title="Sobre a venda" />

            <form
                className="flex flex-col gap-4"
            >
                <PageHeader
                    title="Sobre a venda"
                    breadcrumb={[
                        { title: "Vendas", href: "/sales" },
                        { title: "Sobre a venda" }
                    ]}
                />

                <div className="flex flex-col gap-4 md:grid md:grid-cols-10 md:items-start">
                    <div className="col-span-8">
                        <ProductsList
                            data={data.products}
                        />
                    </div>
                    <Card title="Dados da venda" className="col-span-2">
                        <div className="p-4">
                            <div className="flex flex-col gap-4">
                                <Input
                                    label="Código da venda"
                                    id="id"
                                    className="mb-4"
                                    {...register("id")}
                                    disabled
                                />
                                <Input
                                    label="Nome do cliente"
                                    id="clientName"
                                    className="mb-4"
                                    {...register("clientName")}
                                    disabled
                                />
                                <Input
                                    label="Método de pagamento"
                                    id="paymentMethods"
                                    className="mb-4"
                                    {...register("paymentMethods")}
                                    disabled
                                />

                                <Input
                                    label="Situação"
                                    id="status"
                                    className="mb-4"
                                    {...register("status")}
                                    disabled
                                />
                                <Input
                                    label="Total da venda"
                                    id="totalValue"
                                    className="mb-4"
                                    {...register("totalValue")}
                                    disabled
                                />
                            </div>
                        </div>
                    </Card>
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
        if (!user.permissions.includes("sales.read")) {
            return {
                redirect: {
                    destination: "/sales",
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