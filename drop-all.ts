// drop-all.ts
import { drizzle } from "drizzle-orm/bun-sql"

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
	console.error("❌ DATABASE_URL missing")
	process.exit(1)
}

const db = drizzle(connectionString)

console.log("🧹 Dropping all tables...")
await db.execute(`
	DROP TABLE IF EXISTS "account" CASCADE;
	DROP TABLE IF EXISTS "session" CASCADE;
	DROP TABLE IF EXISTS "user" CASCADE;
	DROP TABLE IF EXISTS "verification" CASCADE;
	DROP TABLE IF EXISTS "waitlist_users" CASCADE;
	DROP TABLE IF EXISTS "waitlists" CASCADE;
	DROP TABLE IF EXISTS "__drizzle_migrations" CASCADE;
`)
console.log("✅ All tables dropped cleanly!")
process.exit(0)
