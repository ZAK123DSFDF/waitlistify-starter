// src/components/landing/HowItWorks.tsx
import { MousePointerClick, Paintbrush, Users } from "lucide-react"
import { h2Style, secLabel, tagStyle, wrap } from "./shared"

export function HowItWorks({
	activeMuted,
	activeCard,
	activeBorder,
}: {
	activeMuted: string
	activeCard: string
	activeBorder: string
}) {
	const steps = [
		{
			n: "01",
			icon: () => <Paintbrush size={18} color="#a78bfa" />,
			title: "Brand Your Page",
			desc: "Customize headlines, metadata, and aesthetic theme presets using your live configuration builder dashboard safely.",
			tag: "Zero CSS Needed",
		},
		{
			n: "02",
			icon: () => <MousePointerClick size={18} color="#a78bfa" />,
			title: "Set Presell Caps",
			desc: "Enable Stripe or Polar checkout webhooks. Offer exclusive discounted lifetime deals for users willing to back you early.",
			tag: "Direct Revenue",
		},
		{
			n: "03",
			icon: () => <Users size={18} color="#a78bfa" />,
			title: "Autopilot Sorting",
			desc: "Every sign-up receives an embedded tracking ID, real position value, and custom referral mechanics automatically.",
			tag: "Viral Mechanics",
		},
	]

	return (
		<section
			id="how"
			style={{ padding: "4.5rem 0", borderTop: `1px solid ${activeBorder}` }}
		>
			<div style={wrap}>
				<div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
					<div style={secLabel}>The System Architecture</div>
					<h2 style={{ ...h2Style, marginBottom: ".75rem" }}>
						Three steps. Then monitor volume.
					</h2>
					<p
						style={{
							color: activeMuted,
							fontSize: ".95rem",
							maxWidth: "480px",
							margin: "0 auto",
							lineHeight: 1.7,
						}}
					>
						Hook up authentication layers, launch dynamic custom domains, and
						view signups rise on the fly.
					</p>
				</div>
				<div
					style={{
						display: "grid",
						gridTemplateColumns:
							"repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
						gap: "1.25rem",
					}}
				>
					{steps.map((s) => (
						<div
							key={s.n}
							style={{
								background: activeCard,
								border: `1px solid ${activeBorder}`,
								borderRadius: "16px",
								padding: "1.75rem",
								position: "relative",
								overflow: "hidden",
							}}
						>
							<div
								style={{
									position: "absolute",
									top: ".75rem",
									right: "1rem",
									fontSize: "3rem",
									fontWeight: 900,
									color: "rgba(139, 92, 246, 0.08)",
									lineHeight: 1,
									pointerEvents: "none",
									userSelect: "none",
								}}
							>
								{s.n}
							</div>
							<div
								style={{
									width: "38px",
									height: "38px",
									background: "rgba(139, 92, 246, 0.1)",
									border: "1px solid rgba(139, 92, 246, 0.25)",
									borderRadius: "10px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									marginBottom: "1rem",
								}}
							>
								{s.icon()}
							</div>
							<h3
								style={{
									fontSize: ".9rem",
									fontWeight: 700,
									marginBottom: ".5rem",
								}}
							>
								{s.title}
							</h3>
							<p
								style={{
									fontSize: ".8rem",
									color: activeMuted,
									lineHeight: 1.65,
									marginBottom: ".85rem",
								}}
							>
								{s.desc}
							</p>
							<span style={tagStyle}>{s.tag}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
