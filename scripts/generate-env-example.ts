import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"

// First file found in this order is used as the source
const SOURCES = [".env.local", ".env", ".dev.vars"]
const OUTPUT = ".env.example"

// Keys whose values are safe to keep (not secrets)
const KEEP_VALUES = new Set(["POLAR_SERVER", "NODE_ENV"])

const source = SOURCES.find((file) => existsSync(resolve(file)))

if (!source) {
	console.error(`No env file found. Looked for: ${SOURCES.join(", ")}`)
	process.exit(1)
}

const KEY_RE = /^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_.]*)\s*=(.*)$/
const COMMENTED_KEY_RE = /^\s*#\s*([A-Za-z_][A-Za-z0-9_]*)\s*=.*$/

const lines = readFileSync(resolve(source), "utf8").split(/\r?\n/)
const output: string[] = []
let keyCount = 0
let openQuote: string | null = null // tracks multi-line quoted values

for (const line of lines) {
	// Skip the remaining lines of a multi-line value (like private keys)
	if (openQuote) {
		if (line.includes(openQuote)) openQuote = null
		continue
	}

	const match = line.match(KEY_RE)

	if (match) {
		const [, key = "", rawValue = ""] = match
		const value = rawValue.trim()
		const first = value.charAt(0)

		// Value starts a quote that doesn't close on the same line
		if (
			(first === '"' || first === "'" || first === "`") &&
			!value.slice(1).includes(first)
		) {
			openQuote = first
		}

		output.push(KEEP_VALUES.has(key) ? `${key}=${value}` : `${key}=`)
		keyCount++
		continue
	}

	// Commented-out variables like "# DATABASE_URL=postgres://..." can leak secrets too
	const commented = line.match(COMMENTED_KEY_RE)
	if (commented) {
		output.push(`# ${commented[1]}=`)
		continue
	}

	// Blank lines and normal comments are kept as they are
	output.push(line)
}

writeFileSync(resolve(OUTPUT), `${output.join("\n").trimEnd()}\n`)
console.log(`Generated ${OUTPUT} from ${source} (${keyCount} variables)`)
