import { NextApiRequest, NextApiResponse } from "next";
import { api } from "@/services/api";

export default function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
    api.get("/me/logout", {headers: {
        Authorization: process.env.BACKEND_SECRET_KEY,
        token: req.headers.token as string
    }});
    res.json(null);
}