import axios from "axios";
import { signOut } from "next-auth/react";

export const api = axios.create({
    baseURL: process.env.BACKEND_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

export const Fetch = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

Fetch.interceptors.response.use(response => {
    return response;
}, async error => {
    if (error.response.status === 401) {
        signOut();
    }

    return Promise.reject(error);
});