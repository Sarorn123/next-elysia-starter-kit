import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from './index';

async function main() {
    console.log('Running migrations 👉')
    await migrate(db, { migrationsFolder: "./src/db/migrations" });
    console.log('Migrated successfully 👌')
    process.exit(0)
}

main().catch((e) => {
    console.error('Migration failed')
    console.error(e)
    process.exit(1)
});