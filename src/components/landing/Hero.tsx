// src/components/landing/Hero.tsx
import { useEffect, useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import { wrap } from "./shared"

export function Hero({
	activeMuted,
	activeCard,
	activeBorder,
	activeBorder2,
}: {
	activeMuted: string
	activeCard: string
	activeBorder: string
	activeBorder2: string
}) {
	const [_, setCount] = useState(1402)
	const bulletPoints = [
		"Deploy in 60 seconds",
		"100% Type-Safe Stack",
		"Built-in Polar Payments",
	]
	const statBoxes = [
		{ n: "94%", l: "of founders build features blindly" },
		{ n: "$1.4K+", l: "average cash raised before shipping" },
		{ n: "10x", l: "higher conversion with gamified queues" },
		{ n: "1 min", l: "to build a high converting page" },
	]

	useEffect(() => {
		const id = setInterval(() => {
			setCount((c) => c + Math.floor(Math.random() * 2))
		}, 3000)
		return () => clearInterval(id)
	}, [])

	return (
		<div style={{ position: "relative", overflow: "hidden" }}>
			{/* Top Violet Radial Glow Background */}
			<div
				style={{
					position: "absolute",
					top: "-20%",
					left: "50%",
					transform: "translateX(-50%)",
					width: "700px",
					height: "500px",
					background:
						"radial-gradient(ellipse, rgba(139, 92, 246, 0.15) 0%, transparent 65%)",
					pointerEvents: "none",
				}}
			/>
			<div
				style={{
					padding: "4rem 0 3rem",
					textAlign: "center",
					position: "relative",
				}}
			>
				<div style={wrap}>
					{/* Top Pill Kicker - Mobile Optimized Violet Badge */}
					<div
						style={{
							display: "inline-flex",
							alignItems: "center",
							gap: "6px",
							backgroundColor: "rgba(139, 92, 246, 0.1)",
							border: "1px solid rgba(139, 92, 246, 0.25)",
							color: "#c4b5fd", // violet-300
							padding: ".3rem .75rem",
							borderRadius: "100px",
							fontSize: "clamp(10px, 2.5vw, 12px)", // Dynamic sizing for mobile
							fontWeight: 600,
							letterSpacing: ".02em",
							marginBottom: "1.5rem",
							maxWidth: "calc(100% - 2rem)",
							boxSizing: "border-box",
							lineHeight: 1.2,
						}}
					>
						<span
							style={{
								width: "6px",
								height: "6px",
								backgroundColor: "#a78bfa", // violet-400
								borderRadius: "50%",
								flexShrink: 0,
							}}
						/>
						<span
							style={{
								overflow: "hidden",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap",
							}}
						>
							Multi-Tenant Launchpad for Indie Builders
						</span>
					</div>

					{/* Hero Headline */}
					<h1
						style={{
							fontSize: "clamp(2.1rem, 5vw, 3.6rem)",
							fontWeight: 800,
							letterSpacing: "-.04em",
							lineHeight: 1.08,
							marginBottom: "1.25rem",
						}}
					>
						Take a number.
						<br />
						<em style={{ fontStyle: "normal", color: "#a78bfa" }}>Get paid</em>{" "}
						before
						<br />
						you write code.
					</h1>

					{/* Hero Subtitle */}
					<p
						style={{
							fontSize: "clamp(0.875rem, 2vw, 1.05rem)",
							color: activeMuted,
							maxWidth: "540px",
							margin: "0 auto 2rem",
							lineHeight: 1.65,
							padding: "0 .5rem",
						}}
					>
						Spin up elegant waitlist pages in minutes. Assign everyone a dynamic
						queue position, let enthusiastic buyers pay to jump ahead, and
						validate demand instantly.
					</p>

					{/* Action Buttons */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: ".6rem",
							flexWrap: "wrap",
							marginBottom: "2rem",
							padding: "0 .5rem",
						}}
					>
						<a
							href="#pricing"
							style={{
								display: "inline-flex",
								alignItems: "center",
								justifyContent: "center",
								gap: "6px",
								backgroundColor: "#7c3aed", // violet-600
								color: "#fff",
								padding: ".75rem 1.25rem",
								borderRadius: "10px",
								fontSize: "clamp(13px, 2.5vw, 15px)", // Scaled down font size
								fontWeight: 600,
								textDecoration: "none",
								boxShadow: "0 4px 14px 0 rgba(124, 58, 237, 0.25)",
								whiteSpace: "nowrap",
							}}
						>
							Create Your Waitlist — Lifetime Access{" "}
							<ArrowRight size={14} strokeWidth={2.5} />
						</a>
						<a
							href="#how"
							style={{
								display: "inline-flex",
								alignItems: "center",
								justifyContent: "center",
								gap: "6px",
								background: "transparent",
								color: "inherit",
								border: `1px solid ${activeBorder2}`,
								padding: ".75rem 1.25rem",
								borderRadius: "10px",
								fontSize: "clamp(13px, 2.5vw, 15px)", // Scaled down font size
								fontWeight: 600,
								textDecoration: "none",
								whiteSpace: "nowrap",
							}}
						>
							See mechanics
						</a>
					</div>

					{/* Bullet Features */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: "1rem",
							flexWrap: "wrap",
						}}
					>
						{bulletPoints.map((t, i) => (
							<span
								key={i}
								style={{
									display: "inline-flex",
									alignItems: "center",
									gap: ".35rem",
									fontSize: "11px",
									color: activeMuted,
									fontWeight: 500,
								}}
							>
								<Check size={12} color="#a78bfa" strokeWidth={2.5} />
								{t}
							</span>
						))}
					</div>
				</div>
			</div>

			{/* Stat Grid */}
			<div style={wrap}>
				<div
					style={{
						display: "grid",
						gridTemplateColumns:
							"repeat(auto-fit, minmax(min(100%, 140px), 1fr))",
						gap: "1px",
						background: activeBorder,
						border: `1px solid ${activeBorder}`,
						borderRadius: "16px",
						overflow: "hidden",
						margin: "2rem 0 3rem",
					}}
				>
					{statBoxes.map((box, i) => (
						<div
							key={i}
							style={{
								background: activeCard,
								padding: "1.25rem 0.75rem",
								textAlign: "center",
							}}
						>
							<span
								style={{
									fontSize: "clamp(1.5rem, 4vw, 1.9rem)",
									fontWeight: 800,
									color: "#a78bfa", // violet-400
									letterSpacing: "-.03em",
									display: "block",
									marginBottom: ".25rem",
								}}
							>
								{box.n}
							</span>
							<span
								style={{
									fontSize: "11px",
									color: activeMuted,
									lineHeight: 1.3,
									display: "block",
								}}
							>
								{box.l}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
