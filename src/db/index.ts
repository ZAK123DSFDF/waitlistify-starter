// src/db/index.ts

import { env } from "cloudflare:workers";
import type { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { drizzle as drizzleJs } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export type DbInstance = ReturnType<typeof drizzlePg<typeof schema>>;
declare global {
	var __localDbInstance: DbInstance | undefined;
}

export function getConnectionString(): string | undefined {
	if (process.env.DATABASE_URL) {
		return process.env.DATABASE_URL;
	}

	try {
		const cfEnv = env as unknown as Env;

		if (cfEnv?.HYPERDRIVE?.connectionString) {
			return cfEnv.HYPERDRIVE.connectionString;
		}

		if (cfEnv?.DATABASE_URL) {
			return cfEnv.DATABASE_URL;
		}
	} catch {}

	return undefined;
}

const isLocal = process.env.NODE_ENV !== "production";

/**
 * Resolves the active Drizzle database instance.
 *
 * LOCAL (NODE_ENV !== "production", no override passed): the client is
 * cached on globalThis so repeated calls/hot-reloads reuse one connection
 * pool instead of opening a new one per query — this is what was exhausting
 * Postgres connections and causing "failed to get session".
 *
 * PRODUCTION (NODE_ENV === "production", i.e. Cloudflare Workers /
 * Hyperdrive): always creates a fresh client per call, unchanged from
 * before — caching here is what previously threw errors, since a cached
 * client can outlive its Worker isolate.
 */
export function getDb(overrideConnectionString?: string): DbInstance {
	if (isLocal && !overrideConnectionString) {
		if (globalThis.__localDbInstance) {
			return globalThis.__localDbInstance;
		}

		const connStr = getConnectionString();

		if (!connStr) {
			throw new Error(
				"❌ [DB] Connection string could not be resolved for local dev.",
			);
		}

		const client = postgres(connStr, {
			max: 1,
			prepare: false,
		});

		const instance = drizzleJs(client, { schema }) as unknown as DbInstance;
		globalThis.__localDbInstance = instance;
		return instance;
	}

	const connStr = overrideConnectionString || getConnectionString();

	if (!connStr) {
		throw new Error(
			"❌ [DB] Connection string could not be resolved from Hyperdrive or DATABASE_URL.",
		);
	}

	const client = postgres(connStr, {
		max: 1,
		prepare: false,
	});

	const instance = drizzleJs(client, { schema }) as unknown as DbInstance;

	return instance;
}

/**
 * Proxy export for Better Auth and global queries.
 * Evaluates getDb() dynamically per query execution inside request boundaries.
 */
export const db = new Proxy({} as DbInstance, {
	get(_, prop, receiver) {
		const activeDb = getDb();
		return Reflect.get(activeDb, prop, receiver);
	},
});
export type DB = DbInstance;
