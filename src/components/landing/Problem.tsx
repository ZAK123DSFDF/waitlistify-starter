// src/components/landing/Problem.tsx
import { AlertCircle } from "lucide-react"
import { C, h2Style, secLabel, tagStyle, wrap } from "./shared"

export function Problem({
	activeMuted,
	activeCard,
	activeBorder,
}: {
	activeMuted: string
	activeCard: string
	activeBorder: string
}) {
	const bars = [
		{
			label: "Vanilla Signups",
			loss: "2–3% validation accuracy",
			rec: "→ Passive list building sets up false product signals",
			w: "30%",
		},
		{
			label: "Gamified Queues",
			loss: "40% referral multiplication",
			rec: "→ Viral incentive hooks users into promoting your link",
			w: "65%",
		},
		{
			label: "Paid Presells",
			loss: "100% true validation threshold",
			rec: "→ Customers paying upfront proves absolute market fit",
			w: "100%",
		},
	]
	const failures = [
		"Traditional email lists do not gauge monetary commitment",
		"Free signups rarely convert to active paying software clients",
		"Building in silence risks weeks of zero-ROI development cycles",
		"Most founders discover lack of interest only after shipping production lines",
	]

	return (
		<section
			style={{ padding: "4.5rem 0", borderTop: `1px solid ${activeBorder}` }}
		>
			<div
				style={{
					...wrap,
					display: "grid",
					gridTemplateColumns:
						"repeat(auto-fit, minmax(min(100%, 320px), 1fr))", // Min width lowered to prevent grid blowout
					gap: "2.5rem",
					alignItems: "center",
				}}
			>
				<div>
					<div style={secLabel}>The Validation Trap</div>
					<h2 style={h2Style}>
						Signups are fine.
						<br />
						Pre-revenue is better.
					</h2>
					<p
						style={{
							color: activeMuted,
							fontSize: "clamp(0.875rem, 2vw, 0.95rem)",
							lineHeight: 1.7,
							marginBottom: "1.5rem",
						}}
					>
						Building software on assumptions is expensive. Waitlistify turns
						standard email capture into a live high-intent crowd leaderboard
						with transaction processing built right in.
					</p>
					<div
						style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}
					>
						{failures.map((t, i) => (
							<div
								key={i}
								style={{
									display: "flex",
									alignItems: "flex-start",
									gap: ".6rem",
									fontSize: ".83rem",
									color: activeMuted,
								}}
							>
								<AlertCircle
									size={14}
									color={C.red}
									style={{ flexShrink: 0, marginTop: "2px" }}
								/>
								<span>{t}</span>
							</div>
						))}
					</div>
				</div>
				<div
					style={{
						background: activeCard,
						border: `1px solid ${activeBorder}`,
						borderRadius: "16px",
						padding: "clamp(1rem, 3vw, 1.5rem)",
						boxSizing: "border-box",
						width: "100%",
					}}
				>
					{/* Header Row: Prevent bad alignment/overlap */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							gap: "0.5rem",
							marginBottom: "1rem",
							flexWrap: "nowrap",
						}}
					>
						<span
							style={{
								fontSize: ".8rem",
								fontWeight: 700,
								whiteSpace: "nowrap",
							}}
						>
							Validation Spectrum
						</span>
						<span
							style={{
								...tagStyle,
								flexShrink: 0,
								display: "inline-flex",
								alignItems: "center",
							}}
						>
							Live Tiers
						</span>
					</div>
					<div
						style={{
							height: "1px",
							background: activeBorder,
							marginBottom: "1.25rem",
						}}
					/>
					<div
						style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
					>
						{bars.map((b, i) => (
							<div key={i}>
								{/* Bar Header Labels: Flex wrap for narrow screens */}
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "baseline",
										gap: "0.5rem",
										flexWrap: "wrap",
										fontSize: ".8rem",
										marginBottom: ".4rem",
									}}
								>
									<span style={{ color: activeMuted, fontWeight: 600 }}>
										{b.label}
									</span>
									<span
										style={{
											color: "#a78bfa",
											fontWeight: 700,
											fontSize: ".75rem",
										}}
									>
										{b.loss}
									</span>
								</div>
								<div
									style={{
										height: "6px",
										background: "rgba(139, 92, 246, 0.1)",
										borderRadius: "100px",
										overflow: "hidden",
									}}
								>
									<div
										style={{
											height: "100%",
											background: "#8b5cf6", // violet-500
											borderRadius: "100px",
											width: b.w,
										}}
									/>
								</div>
								<div
									style={{
										fontSize: ".72rem",
										color: activeMuted,
										marginTop: ".35rem",
										fontWeight: 600,
										lineHeight: 1.4,
									}}
								>
									{b.rec}
								</div>
							</div>
						))}
					</div>
					<div
						style={{
							height: "1px",
							background: activeBorder,
							margin: "1.25rem 0",
						}}
					/>
					<p
						style={{
							fontSize: ".72rem",
							color: C.muted2,
							textAlign: "center",
							lineHeight: 1.4,
						}}
					>
						Incentivize dynamic queue progression with secure single-click
						checkouts
					</p>
				</div>
			</div>
		</section>
	)
}
