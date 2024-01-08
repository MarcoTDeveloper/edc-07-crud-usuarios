import { TrashSimple } from "@phosphor-icons/react";
import { useState } from "react";
import { toast } from "react-toastify";

import { ConfirmModal } from "../ui/Modal/ConfirmModal";
import { Fetch } from "../../services/api";

type DeleteOrderProps = {
    slug: string;
    mutate: (slug: string) => void;
}

export function DeleteSale({ slug, mutate }: DeleteOrderProps) {
    const [openModal, setOpenModal] = useState(false);

    const handleDeleteOrder = ((slug: string) => {
        mutate(slug);
        Fetch.delete(`orders/${slug}`).then(() => {
            toast.success("Pedido excluído com sucesso!");
        }).catch(() => {
            toast.error("Ops! Não foi possível excluir o pedido. Tente novamente.");
        });
    });

    return (
        <>
            <button
                className="text-sm font-medium text-danger-500 hover:text-danger-600"
                onClick={() => setOpenModal(!openModal)}
            >
                <TrashSimple size={24} />
            </button>
            <ConfirmModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                title="Excluir pedido?"
                message="Tem certeza que deseja excluir este pedido? Essa ação não poderá ser desfeita."
                type="error"
                onConfirm={() => handleDeleteOrder(slug)}
            />
        </>
    );
}