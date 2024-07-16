import { Config, defineConfig } from 'drizzle-kit';
import { env } from '@/lib';

export default defineConfig({
    schema: './src/db/schema.ts',
    out: './src/db/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: env.DATABASE_URL
    }
}) satisfies Config;