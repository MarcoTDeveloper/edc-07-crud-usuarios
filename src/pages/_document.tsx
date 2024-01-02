import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="pt-BR" className="scroll-smooth">
            <Head>
                <meta name="author" content="Sharp Soluções Digitais" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />

                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Lexend:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" />

                <link rel="shortcut icon" href="/favicon.png" type="image/png" />
            </Head>
            <body className="bg-gradient-to-l from-zinc-100 to-zinc-50 text-gray-700 dark:from-gray-900 dark:to-gray-900 dark:text-gray-300">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}