import Elysia, { t } from "elysia";
import { db } from "@/db";
import { eq } from 'drizzle-orm';
import { user as userTable } from "@/db/schema"
import { lucia } from "@/auth/lucia";
import { generateId } from "lucia";
import { MYCUSTOMERROR } from "./error/error-module";
import { Scrypt } from "lucia";
import { count } from 'drizzle-orm';
import { userModule } from "./user";
import { fileModule } from "./file";
import { Resend } from "resend";
import { generateOTP } from "@/helper"
import { env } from "@/lib";
import { sendOTP } from "@/lib/otp";

async function validateSession(bearerSessionId?: string) {
    const sessionIdBearerId = lucia.readBearerToken(bearerSessionId ?? "");
    if (!sessionIdBearerId) throw new MYCUSTOMERROR("UNAUTHORIZED")
    const { user, session } = await lucia.validateSession(sessionIdBearerId);
    if (!session) throw new MYCUSTOMERROR("UNAUTHORIZED")
    return user
}

export const appModule = new Elysia()
    .get("/", (req) => {
        return {
            yo: "Welcome to my api 🫦"
        }
    })
    .post("/register", async ({ body }) => {

        const email = body.email
        const password = body.password
        const existed = await db.select({ count: count() }).from(userTable).where(eq(userTable.email, email))
        if (existed[0].count) throw new MYCUSTOMERROR("EXISTED")
        const OTP = generateOTP()
        await sendOTP(email, OTP)
        const scrypt = new Scrypt();
        const pass = await scrypt.hash(password);
        const id = generateId(15);
        const inserted = await db.insert(userTable).values({
            id,
            email,
            password: pass,
            otp: OTP
        }).returning().catch(e => console.log(e))
        return {
            data: { inserted, },
            message: "SUCCESS"
        }
    },
        {
            body: t.Object({
                email: t.String({
                    minLength: 3
                }),
                password: t.String({
                    minLength: 3
                }),
            })
        })

    .post("/verify-otp", async ({ body }) => {
        const user = await db.query.user.findFirst({
            where: eq(userTable.email, body.email)
        })
        if (!user) throw new MYCUSTOMERROR("NOT_FOUND")
        if (user.otp !== body.otp) throw new MYCUSTOMERROR("INVALID_OTP")
        await db.update(userTable).set({
            otp: ""
        }).where(eq(userTable.email, body.email))
        return {
            message: "SUCCESS",
        }
    }, {
        body: t.Object({
            email: t.String({
                minLength: 3
            }),
            otp: t.String({
                minLength: 6
            })
        })
    })
    .post("/login", async ({ body }) => {
        const email = body.email
        const user = await db.query.user.findFirst({
            where: eq(userTable.email, email)
        })
        if (!user) throw new MYCUSTOMERROR("UNAUTHORIZED")

        if (user.otp) {
            const newOTP = generateOTP()
            await sendOTP(email, newOTP)
            await db.update(userTable).set({
                otp: newOTP
            }).where(eq(userTable.email, email))
            throw new MYCUSTOMERROR("INVALID_OTP")
        }

        const scrypt = new Scrypt();
        const validPassword = await scrypt.verify(user.password, body.password)
        if (!validPassword) throw new MYCUSTOMERROR("UNAUTHORIZED")
        const session = await lucia.createSession(user.id, {});
        const { password, ...userWithoutPassword } = user;
        return { sessionId: session.id, user: userWithoutPassword, message: "SUCCESS" }
    },
        {
            body: t.Object({
                email: t.String({
                    minLength: 3
                }),
                password: t.String({
                    minLength: 3
                }),
            })
        }
    )
    .use(fileModule)
    .guard(
        {
            headers: t.Object({
                authorization: t.TemplateLiteral('Bearer ${string}')
            })
        },
        (app) => app.resolve(async ({ headers: { authorization } }) => {
            return {
                user: await validateSession(authorization)
            }
        })
            .use(userModule)
            .get('/profile', ({ user }) => {
                return user
            })
            .get('/logout', async ({ user }) => {
                lucia.invalidateUserSessions(user.id)
                return {
                    message: "Logged out"
                }
            })
    )
