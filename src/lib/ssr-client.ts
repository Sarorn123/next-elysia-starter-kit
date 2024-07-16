
import { App } from "@/app/api/[[...slugs]]/route";
import { lucia } from "@/auth/lucia";
import { treaty } from "@elysiajs/eden";
import { cookies } from "next/headers";
import { env } from "./env";

export function getToken(): `Bearer ${string}` {
    const cookie = cookies().get(lucia.sessionCookieName)?.value
    if (cookie) return `Bearer ${cookie}`
    return "Bearer null"
}

export const ssrClient = treaty<App>(env.APP_URL,

    {
        fetcher: async (url, options) => {
            return fetch(url, {
                ...options,
                headers: {
                    "Authorization": getToken(),
                    "Content-Type": "application/json",
                },
            })
        }
    }

);