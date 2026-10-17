import { sentryVitePlugin } from "@sentry/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import UnpluginFonts from "unplugin-fonts/vite";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
	const isProd = mode === "production" || process.env.NODE_ENV === "production";

	return {
		server: {
			allowedHosts: [".ngrok-free.app", "localhost"],
		},
		resolve: { tsconfigPaths: true },
		build: {
			rolldownOptions: {
				external: ["cloudflare:workers"],
			},
			rollupOptions: {
				external: ["cloudflare:workers"],
			},
		},
		plugins: [
			UnpluginFonts({
				google: {
					families: [
						{
							name: "Manrope",
							styles: "wght@400;500;600;700;800",
							fallback: {
								category: "sans-serif",
							},
						},
						{
							name: "Fraunces",
							styles: "wght@500;700",
							fallback: {
								category: "serif",
							},
						},
					],
				},
			}),
			!isProd && {
				name: "mock-cloudflare-workers",
				resolveId(id: string) {
					if (id === "cloudflare:workers") {
						return "\0cloudflare:workers-mock";
					}
				},
				load(id: string) {
					if (id === "\0cloudflare:workers-mock") {
						return "export const env = {};";
					}
				},
			},
			devtools(),
			nitro({ rollupConfig: { external: [/^@sentry\//] } }),
			tailwindcss(),
			tanstackStart({
				start: { entry: "src/start.ts" },
				server: { entry: "src/server.ts" },
			}),
			viteReact(),
			isProd &&
				import("@cloudflare/vite-plugin").then((m) =>
					m.cloudflare({
						viteEnvironment: { name: "ssr" },
					}),
				),
			sentryVitePlugin({
				org: process.env.SENTRY_ORG,
				project: process.env.SENTRY_PROJECT,
				authToken: process.env.SENTRY_AUTH_TOKEN,
				disable: !process.env.SENTRY_AUTH_TOKEN,
			}),
		].filter(Boolean),
	};
});
