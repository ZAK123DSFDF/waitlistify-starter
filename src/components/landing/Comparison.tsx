// src/components/landing/Comparison.tsx
import { Check } from "lucide-react"
import { C, h2Style, secLabel, wrap } from "./shared"

export function Comparison({
	activeMuted,
	activeCard,
	activeBorder,
}: {
	activeMuted: string
	activeCard: string
	activeBorder: string
}) {
	const rows = [
		["Setup time", "Under 2 minutes", "3+ hours boilerplate coding"],
		["Presell options", "Single click activation", "Complex platform hookups"],
		[
			"Queue progression",
			"Automatic live updates",
			"Manual database calculation",
		],
		[
			"Domain mapping",
			"Edge-native mapping included",
			"Complex server proxy config",
		],
		[
			"Database stack",
			"Ultra-fast isolated rows",
			"Heavy legacy tables cluster",
		],
		[
			"Payment setup",
			"Built-in checkout structures",
			"Custom webhooks code logic",
		],
	]

	return (
		<section
			style={{ padding: "4.5rem 0", borderTop: `1px solid ${activeBorder}` }}
		>
			<div style={wrap}>
				<div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
					<div style={secLabel}>Why Waitlistify</div>
					<h2 style={h2Style}>Stop building custom forms.</h2>
					<p
						style={{
							color: activeMuted,
							fontSize: ".95rem",
							maxWidth: "480px",
							margin: "0 auto",
							lineHeight: 1.7,
						}}
					>
						Don't waste precious pre-launch momentum reinventing the database
						wheels for authentication or referral tokens.
					</p>
				</div>

				{/* Outer Card Container */}
				<div
					style={{
						width: "100%",
						background: activeCard,
						border: `1px solid ${activeBorder}`,
						borderRadius: "16px",
						overflow: "hidden",
					}}
				>
					{/* Scrollable Container for Mobile */}
					<div
						style={{
							width: "100%",
							overflowX: "auto",
							WebkitOverflowScrolling: "touch",
						}}
					>
						<div
							style={{
								width: "100%",
								minWidth: "600px",
								display: "flex",
								flexDirection: "column",
							}}
						>
							{/* Header Row */}
							<div
								style={{
									display: "grid",
									gridTemplateColumns: "1fr 1fr 1fr",
									alignItems: "center",
									padding: ".85rem 1.25rem",
									background: "rgba(255,255,255,0.025)",
									borderBottom: `1px solid ${activeBorder}`,
									fontSize: "11px",
									fontWeight: 700,
									letterSpacing: ".08em",
									textTransform: "uppercase",
								}}
							>
								<div>Feature</div>
								<div style={{ color: "#a78bfa" }}>Waitlistify</div>
								<div style={{ color: activeMuted }}>Custom Code</div>
							</div>

							{/* Data Rows */}
							{rows.map(([feat, us, them], i) => (
								<div
									key={i}
									style={{
										display: "grid",
										gridTemplateColumns: "1fr 1fr 1fr",
										alignItems: "center",
										padding: "1rem 1.25rem",
										fontSize: ".85rem",
										borderBottom:
											i < rows.length - 1
												? `1px solid ${activeBorder}`
												: "none",
									}}
								>
									<div style={{ color: activeMuted, fontWeight: 500 }}>
										{feat}
									</div>
									<div style={{ color: "#a78bfa", fontWeight: 600 }}>
										<span
											style={{
												display: "inline-flex",
												alignItems: "center",
												gap: ".5rem",
											}}
										>
											<Check size={15} strokeWidth={2.5} />
											{us}
										</span>
									</div>
									<div style={{ color: C.muted2 }}>{them}</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
