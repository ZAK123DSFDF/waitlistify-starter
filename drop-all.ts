// drop-all.ts
import { Client } from "pg"

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
	console.error("❌ DATABASE_URL missing")
	process.exit(1)
}

if (process.env.NODE_ENV === "production") {
	console.error("❌ Refusing to drop all in production")
	process.exit(1)
}

async function main() {
	const client = new Client({ connectionString })
	await client.connect()

	try {
		console.log("🧹 Dropping all tables...")

		// Find every table in the public schema
		const { rows } = await client.query<{ tablename: string }>(
			`SELECT tablename FROM pg_tables WHERE schemaname = 'public'`
		)

		if (rows.length > 0) {
			const tables = rows
				.map((r) => `"${r.tablename.replace(/"/g, '""')}"`)
				.join(", ")
			await client.query(`DROP TABLE IF EXISTS ${tables} CASCADE`)
		}

		// Drizzle keeps its migrations table in the "drizzle" schema by default
		await client.query(`DROP SCHEMA IF EXISTS drizzle CASCADE`)

		console.log(`✅ Dropped ${rows.length} table(s) and the drizzle migrations schema!`)
	} finally {
		await client.end()
	}
}

main().catch((err) => {
	console.error("❌ Failed to drop tables:", err)
	process.exit(1)
})
