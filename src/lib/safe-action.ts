import { ElysiaErrorType } from "@/types";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";
export const action = createSafeActionClient()

type HandleResponse = {
    error: unknown;
    validatePath: string;
    data: { message: string; data: any } | null;
};

export function handleResponse({ data, error, validatePath }: HandleResponse) {
    if (error) {
        const err = error as ElysiaErrorType;
        return { error: err.value.message };
    }
    revalidatePath(validatePath);
    if (data) return { success: data.message };
}