import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { GetServerSideProps } from "next/types";
import { getServerSession } from "next-auth/next";

import { Head } from "@/components/ui/Head";
import { PageHeader } from "@/components/ui/PageHeader";
import { Loading } from "@/components/ui/Loading";
import { useFetch } from "@/hooks/useFetch";
import { Fetch } from "@/services/api";
import { authOptions } from "../api/auth/[...nextauth]";
import { UserProps } from "@/contexts/AuthContext";
import { NoData } from "@/components/ui/NoData";
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
    products: {
        productId: string;
        amount: number
    }[]
}

export default function UpdateProduct({ slug }: SaleProps) {
    const { data, isLoading } = useFetch<Sales>(`/sales/${slug}`);
    const { register, setValue } = useForm<SaleFormData>();

    useEffect(() => {
        if (data) {
            setValue("id", data.id);
            setValue("clientName", data.clientName);
            setValue("paymentMethods", data.paymentMethods);
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

                <Card title="Dados da venda">
                    <div className="p-4">
                        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                            <Input
                                label="Código"
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
                        </div>
                    </div>
                </Card>
                <ProductsList
                    data={data.products}
                />
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