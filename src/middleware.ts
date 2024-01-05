export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/users/:path*",
        "/products/:path*",
        "/orders/:path*",
        "/sales/:path*",
        "/inventory/:path*",
    ]
};