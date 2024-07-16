import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { errorModule } from '@/api/error/error-module';
import { appModule } from './module';

const app = new Elysia({ prefix: "/api" })
    .use(cors({
        origin: "*"
    }))
    .use(swagger())
    .use(errorModule)
    .use(appModule)
    .compile()

export const GET = app.handle
export const POST = app.handle
export const PUT = app.handle
export const DELETE = app.handle
export const PATCH = app.handle
export const HEAD = app.handle

export type App = typeof app