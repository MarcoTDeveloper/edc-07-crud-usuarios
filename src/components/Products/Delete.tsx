import { TrashSimple } from "@phosphor-icons/react";
import { useState } from "react";
import { toast } from "react-toastify";

import { ConfirmModal } from "../ui/Modal/ConfirmModal";
import { Fetch } from "../../services/api";

type DeleteProductProps = {
    slug: string;
    mutate: (slug: string) => void;
}

export function DeleteProduct({ slug, mutate }: DeleteProductProps) {
    const [openModal, setOpenModal] = useState(false);

    const handleDeleteUser = ((slug: string) => {
        mutate(slug);
        Fetch.delete(`products/${slug}`).then(() => {
            toast.success("Produto excluído com sucesso!");
        }).catch(() => {
            toast.error("Ops! Não foi possível excluir o produto. Tente novamente.");
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
                title="Excluir produto?"
                message="Tem certeza que deseja excluir este produto? Essa ação não poderá ser desfeita."
                type="error"
                onConfirm={() => handleDeleteUser(slug)}
            />
        </>
    );
}