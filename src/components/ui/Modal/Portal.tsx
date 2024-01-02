import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
    children: React.ReactNode;
    wrapperId: string;
}

export function Portal({ children, wrapperId }: PortalProps) {
    const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

    function createWrapperAndAppendToBody(wrapperId: string) {
        const wrapperElement = document.createElement("div");
        wrapperElement.setAttribute("id", wrapperId);
        document.body.appendChild(wrapperElement);
        return wrapperElement;
    }

    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId);
        if (!element) {
            element = createWrapperAndAppendToBody(wrapperId);
        }
        setWrapperElement(element);
    }, [wrapperId]);

    if (wrapperElement === null) return null;

    return createPortal(children, wrapperElement);
}