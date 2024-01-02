import { Head } from "./Head";

export function Loading() {
    return (
        <>
            <Head title="Carregando..." />

            <div className="flex-1 flex flex-col items-center justify-center min-h-[550px] p-5">
                <div className="flex space-x-2 animate-pulse mb-3">
                    <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                </div>
                <h3>Aguarde, carregando...</h3>
            </div>
        </>
    );
}