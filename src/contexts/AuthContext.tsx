import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useSession, signIn, signOut as NextAuthSignOut } from "next-auth/react";

import { DashboardLayout } from "@/layouts/dashboard";
import { Fetch } from "@/services/api";

export type UserProps = {
    id: number;
    name: string;
    email: string;
    avatar: string;
    position: {
        id: number;
        description: string;
    };
    permissions: string[];
}

type SessionProps = {
    user: UserProps,
    token: string;
}

type AuthContextTypes = {
    user: UserProps | null | undefined;
    session: SessionProps | null | undefined;
    signIn: any;
    signOut: () => void;
}

type AuthProviderProps = {
    children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextTypes);

export function AuthProvider({ children }: AuthProviderProps) {
    const { data } = useSession();
    const session = data?.user as SessionProps;
    const [user, setUser] = useState<UserProps | null | undefined>(null);

    useEffect(() => {
        if (session) {
            Fetch.defaults.headers.common["Authorization"] = `Bearer ${session.token}`;
            setUser(session.user);
        }
    }, [session]);

    const signOut = () => {
        NextAuthSignOut();
        axios.get("/api/logout", {
            headers: {
                token: `Bearer ${session.token}`
            }
        });
    };

    if (user) {
        return (
            <AuthContext.Provider value={{ user, session, signIn, signOut }}>
                <DashboardLayout>
                    {children}
                </DashboardLayout>
            </AuthContext.Provider>
        );
    } else {
        return (
            <AuthContext.Provider value={{ user, session, signIn, signOut }}>
                {children}
            </AuthContext.Provider>
        );
    }
}