// src/components/landing/Pricing.tsx
import { Check } from "lucide-react"
import { C, h2Style, secLabel, wrap } from "./shared"

export function Pricing({
	activeMuted,
	activeCard,
	activeBorder,
	activeBorder2,
	activeBg2,
}: {
	activeMuted: string
	activeCard: string
	activeBorder: string
	activeBorder2: string
	activeBg2: string
}) {
	const plans = [
		{
			name: "Starter",
			limits: "1 active waitlist page",
			monthly: 29,
			featured: false,
			feats: [
				"Up to 500 signups verified",
				"Standard queue placement engine",
				"Live styling configurations",
				"Type-safe data export entries",
				"Basic dashboard summary records",
			],
		},
		{
			name: "Pro",
			limits: "5 dynamic waitlist pages",
			monthly: 49,
			featured: true,
			feats: [
				"Unlimited signup collection capacity",
				"Custom domain mapping routes",
				"Paid presell payment configurations",
				"Custom conversion webhook fields",
				"Advanced analytical performance metrics",
			],
		},
		{
			name: "Ultimate",
			limits: "Unlimited pages forever",
			monthly: 99,
			featured: false,
			feats: [
				"Everything in Pro access",
				"Priority edge network performance",
				"Branded custom email notifications",
				"Dedicated webhook test streams",
				"Direct developer assistance channels",
			],
		},
	]

	return (
		<section
			id="pricing"
			style={{
				padding: "4.5rem 0",
				borderTop: `1px solid ${activeBorder}`,
				background: activeBg2,
			}}
		>
			<div style={wrap}>
				<div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
					<div style={secLabel}>Pricing Models</div>
					<h2 style={h2Style}>Pay once. Use forever.</h2>
					<p
						style={{
							color: activeMuted,
							fontSize: ".95rem",
							maxWidth: "480px",
							margin: "0 auto 1.5rem",
							lineHeight: 1.7,
						}}
					>
						No recurring monthly subscriptions. Buy your license tier once and
						launch your products seamlessly.
					</p>
					<div
						style={{
							display: "inline-flex",
							alignItems: "center",
							background: "rgba(139, 92, 246, 0.1)",
							border: "1px solid rgba(139, 92, 246, 0.25)",
							borderRadius: "12px",
							padding: "6px 14px",
							marginBottom: "2.5rem",
							fontSize: "13px",
							fontWeight: 600,
							color: "#c4b5fd",
						}}
					>
						LIFETIME FOUNDER LICENSE PACKAGES
					</div>
				</div>
				<div
					style={{
						display: "grid",
						gridTemplateColumns:
							"repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
						gap: "1.25rem",
					}}
				>
					{plans.map((p) => (
						<div
							key={p.name}
							style={{
								background: p.featured
									? `linear-gradient(160deg,rgba(139, 92, 246, 0.12),${activeCard})`
									: activeCard,
								border: `1px solid ${
									p.featured ? "rgba(139, 92, 246, 0.45)" : activeBorder
								}`,
								borderRadius: "18px",
								padding: "1.75rem",
								position: "relative",
							}}
						>
							{p.featured && (
								<div
									style={{
										position: "absolute",
										top: "-11px",
										left: "50%",
										transform: "translateX(-50%)",
										background: "#7c3aed", // violet-600
										color: "#fff",
										fontSize: "10px",
										fontWeight: 800,
										padding: ".25rem .75rem",
										borderRadius: "100px",
										whiteSpace: "nowrap",
										letterSpacing: ".05em",
									}}
								>
									BEST FOR BUILDERS
								</div>
							)}
							<div
								style={{
									fontSize: "11px",
									fontWeight: 700,
									letterSpacing: ".1em",
									textTransform: "uppercase",
									color: activeMuted,
									marginBottom: ".4rem",
								}}
							>
								{p.name}
							</div>
							<div
								style={{
									fontSize: "11px",
									color: C.muted2,
									marginBottom: "1.25rem",
								}}
							>
								{p.limits}
							</div>
							<div style={{ marginBottom: "1.25rem" }}>
								<span
									style={{
										fontSize: "2.4rem",
										fontWeight: 800,
										letterSpacing: "-.04em",
									}}
								>
									${p.monthly}
								</span>
								<span style={{ fontSize: ".85rem", color: activeMuted }}>
									/one-time
								</span>
							</div>
							<div
								style={{
									height: "1px",
									background: activeBorder,
									margin: "1.25rem 0",
								}}
							/>
							<ul
								style={{
									listStyle: "none",
									display: "flex",
									flexDirection: "column",
									gap: ".6rem",
									marginBottom: "1.5rem",
									padding: 0,
								}}
							>
								{p.feats.map((f, i) => (
									<li
										key={i}
										style={{
											fontSize: ".8rem",
											color: activeMuted,
											display: "flex",
											alignItems: "flex-start",
											gap: ".5rem",
										}}
									>
										<Check
											size={14}
											color="#a78bfa"
											style={{ flexShrink: 0, marginTop: "2px" }}
											strokeWidth={2.5}
										/>
										{f}
									</li>
								))}
							</ul>
							<button
								style={{
									width: "100%",
									padding: ".7rem",
									borderRadius: "10px",
									fontSize: ".8rem",
									fontWeight: 600,
									cursor: "pointer",
									transition: "all .2s",
									border: p.featured
										? "1px solid #7c3aed"
										: `1px solid ${activeBorder2}`,
									background: p.featured ? "#7c3aed" : "transparent",
									color: p.featured ? "#fff" : "inherit",
								}}
							>
								Get Lifetime Access
							</button>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
