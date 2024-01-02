import Image from "next/image";
import dynamic from "next/dynamic";

const Logo = dynamic(() => import("../../Logo").then((mod) => mod.Logo), {
    ssr: false,
});

import santasHatImage from "@/assets/images/santa-hat.png";

export function SantasHat() {
    return (
        <div className="relative flex items-center w-10 md:w-16">
            <Image
                src={santasHatImage}
                alt="Chapéu de natal"
                width={40}
                height={40}
                quality={100}
                placeholder="blur"
                className="absolute -top-1 w-10 h-10"
            />
            <Logo className="w-10 md:h-16" />
        </div>
    );
}