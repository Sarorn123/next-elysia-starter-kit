import { HTTP_CODE } from "@/lib/http-status-code";
import { Messages } from "@/root/next-intl";
import Elysia from "elysia";

type MessageKey = keyof Messages["ResponseMessage"];

export class MYCUSTOMERROR extends Error {
    constructor(public message: MessageKey) {
        super(message)
    }
}

export const errorModule = new Elysia({ name: "error" })
    .error({ MYCUSTOMERROR })
    .onError({ as: 'global' }, ({ code, error, set }) => {
        const message = error.message as MessageKey
        if (message === 'NOT_FOUND') {
            set.status = HTTP_CODE.NOT_FOUND
            return { message }
        }
        if (message === 'EXISTED') {
            set.status = HTTP_CODE.CONFLICT
            return { message }
        }
        if (message === 'INVALID_OTP') {
            set.status = HTTP_CODE.FORBIDDEN
            return { message }
        }
        if (message === 'UNAUTHORIZED') {
            set.status = HTTP_CODE.UNAUTHORIZED
            return { message }
        }
    })