import { z } from "zod";

const createUserSchema = z.object({
    id: z.string().optional(),
    photo: z.union([z.string(), z.instanceof(File)]).optional(),
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(5, {
        message: "Password must be at least 5 characters.",
    }),
    age: z.string().min(2, "Required 2 characters").refine((val) => {
        const age = parseInt(val);
        return age >= 18 && age <= 100;
    }, {
        message: "Age must number and greater than 18 and less than 100.",
    }),
    dob: z
        .date({
            invalid_type_error: "dob must be a date.",
        })
        .min(
            new Date(1900, 1, 1),
            "You must be at least 18 to create an account."
        ),

    position: z.string().min(1, "Position is required."),
});

const userSchemaParams = z.object({
    id: z.string(),
});

type CreateUserSchema = z.infer<typeof createUserSchema>;
type UserSchemaParams = z.infer<typeof userSchemaParams>;
type UserQueryParams = {
    search: string
}

export { createUserSchema, userSchemaParams }
export type { CreateUserSchema, UserSchemaParams, UserQueryParams }