"use server"

import { cookies } from "next/headers"

export async function setResizePanel(name: string, value: string) {
    cookies().set(name, value, {
        path: "/",
        httpOnly: false,
    })
}