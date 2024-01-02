import Image from "next/image";
import NoDataImage from "@/assets/images/no_data.svg";

type NoDataProps = {
    message?: string;
}

export function NoData({ message = "Nenhum dado encontrado" }: NoDataProps) {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center md:my-32">
                    <Image
                        src={NoDataImage}
                        width={200}
                        height={200}
                        alt="Desenho de duas pranchetas vazias"
                    />
                    <h4 className="text-2xl font-bold text-center text-gray-500 dark:text-gray-400 mt-4 w-[80%] max-w-[920px]">
                        {message}
                    </h4>
                </div>
            </div>
        </div>
    );
}