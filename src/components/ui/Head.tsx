import NextHead from "next/head";

interface HeadProps extends React.HTMLAttributes<HTMLHeadElement> {
    title: string;
}

export function Head(props: HeadProps) {
    return (
        <NextHead>
            <title>{`${props.title} | CRUD Usuários`}</title>
        </NextHead>
    );
}