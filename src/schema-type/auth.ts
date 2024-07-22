import { z } from "zod";

const loginSchema = z.object({
    email: z.string()
        .min(1, { message: "Required" })
        .email("This is not a valid email."),
    password: z.string().min(5, "Password must be at least 5 characters."),
});

const signUpSchema = z.object({
    email: z.string()
        .min(1, { message: "Required" })
        .email("This is not a valid email."),
    password: z.string().min(5, "Password must be at least 5 characters."),
    confirm_password: z.string(),
}).refine(data => data.password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
})

const otpSchema = z.object({
    otp: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
    email: z.string()
});

type LoginSchema = z.infer<typeof loginSchema>;
type OTPSchema = z.infer<typeof otpSchema>;
type SignupSchema = z.infer<typeof signUpSchema>;

export {
    loginSchema,
    otpSchema,
    signUpSchema
}

export type {
    LoginSchema,
    OTPSchema,
    SignupSchema
}