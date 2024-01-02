import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { api } from "@/services/api";

type CredentialsProps = {
    email: string;
    password: string;
};

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            authorize: async (credentials) => {
                const { email, password } = credentials as CredentialsProps;
                const { data } = await api.post("/me/login", {
                    email,
                    password
                }, {
                    headers: {
                        authorization: process.env.BACKEND_SECRET_KEY
                    }
                });
                if (data) {
                    return data;
                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user);
            return token;
        },

        session: async ({ session, token }) => {
            session.user = token.user as any;
            return session;
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 10 // 10 hours
    },
    pages: {
        signIn: "/login",
        error: "/login"
    }
};

export default NextAuth(authOptions);