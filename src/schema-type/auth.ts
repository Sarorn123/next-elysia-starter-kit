import { z } from "zod";

const loginSchema = z.object({
    username: z.string(),
    password: z.string()
});

type LoginSchema = z.infer<typeof loginSchema>;

export {
    loginSchema
}

export type {
    LoginSchema
}