import Image from "next/image";

import { Head } from "@/components/ui/Head";
import welcomeImage from "@/assets/images/welcome.svg";

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-4">
                <Image
                    src={welcomeImage}
                    alt="Desenho de um homem com fogos de artifício atrás comemorando."
                    width={300}
                    height={300}
                    className="mx-auto mt-8"
                />
                <h1 className="text-2xl mx-auto">
                    Bem vindo(a) ao programa de múltiplo atendimento!
                </h1>
            </div>
        </>
    );
}