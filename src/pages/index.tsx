import Head from "next/head";
import { useContext } from "react";
import Router from "next/router";

import { AuthContext } from "@/contexts/AuthContext";
import Login from "./login";

export default function Index() {
    const { user } = useContext(AuthContext);

    if (user) {
        Router.push("/users");
    }

    return (
        <>
            <Head>
                <title>CRUD Usuários</title>
            </Head>

            <Login />
        </>
    );
}