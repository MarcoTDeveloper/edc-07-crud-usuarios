import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";

import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <>
            <SessionProvider session={session}>
                <ThemeProvider>
                    <AuthProvider>
                            <Component {...pageProps} />
                    </AuthProvider>
                </ThemeProvider>
            </SessionProvider>
            <ToastContainer
                theme="colored"
            />
        </>
    );
}
