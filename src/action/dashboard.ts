"use server"

import { getToken, ssrClient } from "@/lib"

export async function getDashboardData() {

    const { data, status, error } = await ssrClient.api.user.dashboard.get().catch((err) => {
        throw new Error(err);
    })
    return { data, };
}