import fs from "node:fs/promises"
import path from "node:path"

const SRC_DIR = path.join(process.cwd(), "src")

// Supported file extensions for comment insertion
const VALID_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx"])

async function processDirectory(dirPath: string) {
	const entries = await fs.readdir(dirPath, { withFileTypes: true })

	for (const entry of entries) {
		const fullPath = path.join(dirPath, entry.name)

		// Recursively process subdirectories (skip node_modules automatically)
		if (entry.isDirectory()) {
			await processDirectory(fullPath)
			continue
		}

		const ext = path.extname(entry.name)
		if (!VALID_EXTENSIONS.has(ext)) continue

		// Get relative path using forward slashes for clean consistency
		const relativePath = path
			.relative(process.cwd(), fullPath)
			.replace(/\\/g, "/")

		const commentHeader = `// ${relativePath}\n`

		const fileContent = await fs.readFile(fullPath, "utf-8")

		// Avoid adding duplicate headers if the script is run multiple times
		if (fileContent.startsWith(`// ${relativePath}`)) {
			console.log(`⏩ Already tagged: ${relativePath}`)
			continue
		}

		// Prepend comment header
		await fs.writeFile(fullPath, commentHeader + fileContent, "utf-8")
		console.log(`✅ Tagged: ${relativePath}`)
	}
}

console.log("🚀 Tagging files in src/ with relative path comments...")
processDirectory(SRC_DIR)
	.then(() => console.log("🎉 Done adding path comments!"))
	.catch(console.error)
