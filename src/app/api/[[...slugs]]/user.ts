import { db } from "@/db";
import { user } from "@/db/schema";
import Elysia, { t } from "elysia";
import { eq, desc, like, or } from 'drizzle-orm';
import { user as userTable } from "@/db/schema"
import { MYCUSTOMERROR } from "./error/error-module";
import { Scrypt } from "lucia";
import { generateId } from "lucia";
import { deleteFile } from "@/lib/upload";
import { count } from 'drizzle-orm';
import { Resend } from 'resend';

export const userModule = new Elysia({ prefix: "/user", name: "Service.User" })
    .get("/single", async ({ query, }) => {

        // console.log("{>", user)

        const user = await db.query.user.findFirst({
            where: eq(userTable.id, query.id)
        })
        if (!user) throw new MYCUSTOMERROR("NOT_FOUND")
        return {
            data: user,
            message: "SUCCESS"
        }

    }, {
        query: t.Object({
            id: t.String()
        })
    })
    .get("", async ({ query }) => {
        const search = `%${query.search}%`
        const where = query.search ?
            or(
                like(user.email, search),
                like(user.position, search),
                like(user.age, search)
            ) : undefined

        const users = await db.query.user.findMany({
            where,
            orderBy() {
                return desc(userTable.createdAt)
            }
        })

        return {
            data: users,
            message: "SUCCESS"
        }
    }, {
        query: t.Object({
            search: t.Optional(t.String()),
        })
    })
    .post("", async ({ body }) => {

        const email = body.email
        const existed = await db.select({ id: user.id }).from(user).where(eq(userTable.email, email))
        if (existed[0] && existed[0].id !== body.id) throw new MYCUSTOMERROR("EXISTED")
        const scrypt = new Scrypt();
        const pass = await scrypt.hash(body.password);
        const id = generateId(15);
        const data = {
            email,
            password: body.password === "dummy" ? undefined : pass,
            position: body.position,
            age: body.age,
            dob: body.dob.toDateString(),
            createdAt: new Date(),
            photo: body.photo
        }

        if (body.id) {

            const user = await db.query.user.findFirst({
                where: eq(userTable.id, body.id),
                columns: {
                    id: true,
                    photo: true
                }
            })

            if (!user) {
                throw new MYCUSTOMERROR("NOT_FOUND")
            }

            if (body.photo !== user?.photo) await deleteFile(user.photo)
            const updated = await db.update(userTable).set(data).where(eq(userTable.id, body.id!)).returning().catch((err) => {
                console.log(err)
                throw new Error(err)
            })
            return {
                data: updated[0],
                message: "SUCCESS"
            }
        } else {
            const inserted = await db.insert(userTable).values({ ...data, password: pass, id }).returning().catch((err) => {
                throw new Error(err)
            })
            return {
                data: inserted[0],
                message: "SUCCESS"
            }
        }
    }, {
        body: t.Object({
            id: t.Optional(t.String()),
            email: t.String({
                minLength: 3
            }),
            password: t.String({
                minLength: 3
            }),
            dob: t.Date(),
            age: t.String(),
            position: t.String(),
            photo: t.Optional(t.String())
        })
    })
    .delete("", async ({ body }) => {
        const user = await db.query.user.findFirst({
            where: eq(userTable.id, body.id),
            columns: {
                id: true,
                photo: true
            }
        })

        if (!user) {
            throw new MYCUSTOMERROR("NOT_FOUND")
        }

        const id = await db.delete(userTable).where(eq(userTable.id, body.id)).then(async () => {
            if (user.photo) await deleteFile(user.photo)
            return user.id
        })
        return {
            data: id,
            message: "SUCCESS"
        }
    },
        {
            body: t.Object({
                id: t.String()
            }),
        },
    )
    // @ts-ignore
    .get("/dashboard", async ({ user }) => {
        return {
            data: {
                userCount: (await db.select({ count: count() }).from(userTable))[0].count,
                income: "400,000",
                expense: "200,000",
            }

        }
    })