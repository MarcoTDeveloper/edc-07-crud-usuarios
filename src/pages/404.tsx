import { GetStaticProps } from "next/types";
import Link from "next/link";
import Image from "next/image";

import { Head } from "@/components/ui/Head";
import pageNotFoundImage from "@/assets/images/page_not_found.svg";

export default function NotFound() {
    return (
        <>
            <Head
                title="Página não encontrada"
            />

            <div className="flex flex-col items-center justify-center">
                <Image
                    src={pageNotFoundImage}
                    alt="Página não encontrada"
                    width={300}
                    height={300}
                    className="my-8"
                />
                <h1 className="text-3xl mb-2">Página não encontrada</h1>
                <p className="text-center max-w-2xl text-gray-400">
                    A página que você está procurando não existe ou ainda não foi desenvolvida. Devido ao fato de o sistema ainda estar em desenvolvimento, algumas páginas podem não estar disponíveis no momento. Pedimos desculpas pelo inconveniente e solicitamos que tente novamente posteriormente.
                </p>
                <Link
                    className="mt-8 text-primary-500 hover:underline"
                    href="/"
                >
                    Voltar para a página inicial
                </Link>
            </div>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {},
    };
};