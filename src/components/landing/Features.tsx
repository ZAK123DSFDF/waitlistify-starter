// src/components/landing/Features.tsx
import { Eye, Globe, LayoutGrid, Lock, Sparkles, Users } from "lucide-react"
import { h2Style, secLabel, wrap } from "./shared"

export function Features({
	activeMuted,
	activeCard,
	activeBorder,
	activeBg2,
}: {
	activeMuted: string
	activeCard: string
	activeBorder: string
	activeBg2: string
}) {
	const feats = [
		{
			icon: () => <Sparkles size={17} color="#a78bfa" />,
			title: "Live preview engine",
			desc: "Tweak colors, styling options, descriptions, and call-to-actions, and preview modifications before publishing live.",
		},
		{
			icon: () => <Users size={17} color="#a78bfa" />,
			title: "Real-time queue tracking",
			desc: "Every user sees their verified number, remaining spots ahead, and unique sharing parameters instantly.",
		},
		{
			icon: () => <LayoutGrid size={17} color="#a78bfa" />,
			title: "Clean creator panel",
			desc: "Manage waitlist setups, search verified emails, and measure traffic performance metrics within one simple app.",
		},
		{
			icon: () => <Eye size={17} color="#a78bfa" />,
			title: "Conversion logs",
			desc: "See customer behaviors when checkouts complete. Follow revenue trajectories across multiple domains effortlessly.",
		},
		{
			icon: () => <Globe size={17} color="#a78bfa" />,
			title: "Custom domains routing",
			desc: "Point DNS A-records directly to our server infrastructure. Host waitlists over your native branded business sites.",
		},
		{
			icon: () => <Lock size={17} color="#a78bfa" />,
			title: "Type-safe storage",
			desc: "Backed by Drizzle ORM and fast Cloudflare D1 nodes, making form collection lightning fast and reliable.",
		},
	]

	return (
		<section
			id="features"
			style={{
				padding: "4.5rem 0",
				borderTop: `1px solid ${activeBorder}`,
				background: activeBg2,
			}}
		>
			<div style={wrap}>
				<div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
					<div style={secLabel}>What we handle</div>
					<h2 style={h2Style}>Built for speed & high validation.</h2>
					<p
						style={{
							color: activeMuted,
							fontSize: ".95rem",
							maxWidth: "480px",
							margin: "0 auto",
							lineHeight: 1.7,
						}}
					>
						Focus completely on generating pipeline excitement while our modern
						full-stack backend processes user traffic seamlessly.
					</p>
				</div>
				<div
					style={{
						display: "grid",
						gridTemplateColumns:
							"repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
						gap: "1rem",
					}}
				>
					{feats.map((f) => (
						<div
							key={f.title}
							style={{
								background: activeCard,
								border: `1px solid ${activeBorder}`,
								borderRadius: "14px",
								padding: "1.25rem",
							}}
						>
							<div
								style={{
									width: "36px",
									height: "36px",
									background: "rgba(139, 92, 246, 0.1)",
									border: "1px solid rgba(139, 92, 246, 0.2)",
									borderRadius: "10px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									marginBottom: ".9rem",
								}}
							>
								{f.icon()}
							</div>
							<h3
								style={{
									fontSize: ".85rem",
									fontWeight: 700,
									marginBottom: ".4rem",
								}}
							>
								{f.title}
							</h3>
							<p
								style={{
									fontSize: ".78rem",
									color: activeMuted,
									lineHeight: 1.6,
								}}
							>
								{f.desc}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
