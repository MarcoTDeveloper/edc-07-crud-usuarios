import { useContext, useState } from "react";
import getConfig from "next/config";
import { Heart, Info, Question, WhatsappLogo, X } from "@phosphor-icons/react";
import { Player } from "@lottiefiles/react-lottie-player";
import classNames from "classnames";

import { AsideButton } from "@/components/Aside/AsideMain/AsideButton";
import { AuthContext } from "@/contexts/AuthContext";
import { SharpIcon } from "./SharpIcon";
import { Modal } from "../Modal";
import { AButton } from "../AButton";
import { Tabs } from "../Tabs";
import { Button } from "../Button";

import supportAnimation from "@/assets/images/support.json";
import phoneConnectedAnimation from "@/assets/images/phone_connected.json";

export function Support() {
    const { user } = useContext(AuthContext);
    const { publicRuntimeConfig } = getConfig();
    const [showSupportModal, setShowSupportModal] = useState<boolean>(false);
    const [selectedTab, setSelectedTab] = useState<string>("whatsapp");

    return (
        <>
            <AsideButton
                className="mt-auto"
                icon={<SharpIcon size={25} />}
                ariaLabel="Botão que abre o modal de suporte"
                onClick={() => setShowSupportModal(true)}
            >
                Suporte
            </AsideButton>
            <Modal
                isOpen={showSupportModal}
                onClose={() => setShowSupportModal(false)}
            >
                <div className="flex flex-col gap-4">
                    <header className="flex items-center justify-between pt-4 px-4">
                        <div className="flex flex-col">
                            <h2 className="text-2xl font-bold">Suporte</h2>
                            <small className="text-zinc-400 text-xs">
                                Versão {publicRuntimeConfig.version}
                            </small>
                        </div>
                        <button
                            className="text-gray-400 hover:text-gray-500"
                            aria-label="Botão que fecha o modal de suporte"
                            onClick={() => setShowSupportModal(false)}
                        >
                            <X size={25} />
                        </button>
                    </header>
                    <main className="flex flex-col px-4">
                        <div className="flex flex-col gap-4">
                            <Player
                                autoplay
                                loop
                                src={supportAnimation}
                                className="mx-auto w-full max-w-md"
                            />
                            <p className="text-xl text-center">
                                Achou algum bug ou precisa de ajuda com o
                                sistema? <b>Aqui é o lugar certo!</b>
                            </p>
                            <div className="flex justify-around gap-4">
                                <AButton
                                    className="w-full"
                                    href="https://wa.me/5537999228569?text=Olá,%20preciso%20tirar%20uma%20dúvida:%20"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="secondary"
                                    icon={<Question size={25} />}
                                >
                                    Tenho uma dúvida
                                </AButton>
                                <AButton
                                    className="w-full"
                                    href="https://wa.me/5537999228569?text=Olá,%20encontrei%20o%20seguinte%20BUG:%20"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="secondary"
                                    icon={<Info size={25} />}
                                >
                                    Reportar BUG
                                </AButton>
                            </div>
                        </div>
                    </main>
                    <footer className="flex items-center justify-center w-full p-4 bg-zinc-200 dark:bg-gray-500 rounded-b-md">
                        <a
                            href="https://sharpsolucoes.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center text-center"
                        >
                            <span className="flex gap-1 text-xs items-center">
                                Desenvolvido de{" "}
                                <Heart
                                    size={16}
                                    className="text-red-500 animate-pulse"
                                    weight="fill"
                                />{" "}
                                por
                            </span>
                            <h6 className="cursor-pointer">
                                Sharp Soluções Digitais
                            </h6>
                        </a>
                    </footer>
                </div>
            </Modal>
        </>
    );
}
