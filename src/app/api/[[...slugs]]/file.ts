import { uploadFile } from "@/lib/upload";
import Elysia, { t } from "elysia";

export const fileModule = new Elysia({ prefix: "/file" })
    .post("", async ({ body }) => {
        return await uploadFile(body.image)
    }, {
        body: t.Object({
            image: t.File()
        })
    })