import { SVGProps, useContext } from "react";

import { ThemeContext } from "../contexts/ThemeContext";

export function Logo(props: SVGProps<SVGSVGElement>) {
    const { theme } = useContext(ThemeContext);
    const themeColor = theme == "system" ?  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : theme;
    
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 258 320"
            {...props}
        >
            <path
                style={{
                    fill: {light: "#47adc9", dark: "#d1d5db"}[themeColor],
                }}
                d="m221.616 186.227-93.487-60.58 27.672-20.941 65.815 40.386v41.135z"
            />
            <path
                d="m128.445.185 93.171 54.412v44.126L128.129 42.63V0Z"
                style={{
                    fill: {light: "#3f97bc", dark: "#d1d5db"}[themeColor],
                }}
            />
            <path
                style={{
                    fill: {light: "#42a0c1", dark: "#d1d5db"}[themeColor],
                }}
                d="M221.616 145.092v41.135l35.899 22.437V76.286l-35.899-21.689v90.495z"
            />
            <path
                style={{
                    fill: {light: "#4379a9", dark: "#d1d5db"}[themeColor],
                }}
                d="m34.641 86.756.814-.384 92.674-43.742V0L35.015 48.053l-.374 38.703z"
            />
            <path
                d="M34.641 48.24 1.36 65.815v20.941s32.16 22.437 32.907 22.437.374-60.953.374-60.953Z"
                style={{
                    fill: {light: "#4379a9", dark: "#d1d5db"}[themeColor],
                }}
            />
            <path
                style={{
                    fill: {light: "#4379a9", dark: "#d1d5db"}[themeColor],
                }}
                d="m30.46 50.389 6.051-3.064-.672 38.324-3.034.733-2.345-35.993z"
            />
            <path
                style={{
                    fill: {light: "#47adc9", dark: "#d1d5db"}[themeColor],
                }}
                d="m35.951 134.233 93.627 60.363-27.624 21.005-65.908-40.234-.095-41.134z"
            />
            <path
                d="m129.552 320.059.317.184-.099-42.63-93.617-55.876.102 44.126Z"
                style={{
                    fill: {light: "#3f97bc", dark: "#d1d5db"}[themeColor],
                }}
            />
            <path
                style={{
                    fill: {light: "#42a0c1", dark: "#d1d5db"}[themeColor],
                }}
                d="m36.046 175.367-.095-41.134L0 111.879l.306 132.378 35.949 21.606-.102-44.126-.107-46.37z"
            />
            <path
                style={{
                    fill: {light: "#4379a9", dark: "#d1d5db"}[themeColor],
                }}
                d="m223.155 233.271-.813.386-92.572 43.956.099 42.63 93.002-48.268.284-38.704z"
            />
            <path
                d="m223.244 271.788 33.241-17.653-.048-20.941s-32.212-22.363-32.96-22.361-.233 60.955-.233 60.955Z"
                style={{
                    fill: {light: "#4379a9", dark: "#d1d5db"}[themeColor],
                }}
            />
            <path
                style={{
                    fill: {light: "#4379a9", dark: "#d1d5db"}[themeColor],
                }}
                d="m227.421 269.628-6.044 3.078.582-38.325 3.033-.74 2.429 35.987z"
            />            
        </svg>
    );
}