// src/components/landing/Testimonials.tsx
import { Star } from "lucide-react"
import { C, h2Style, secLabel, wrap } from "./shared"

export function Testimonials({
	activeMuted,
	activeCard,
	activeBorder,
}: {
	activeMuted: string
	activeCard: string
	activeBorder: string
}) {
	const testis = [
		{
			text: '"Set up my product page on a Sunday afternoon. Gathered 450 emails and processed $800 in early presells before Monday night."',
			author: "Alex M.",
			role: "SaaS Developer",
		},
		{
			text: '"The gamified queue positions are highly effective. Users shared their referral links on X to jump ahead, bringing in half our list traffic automatically."',
			author: "Elena G.",
			role: "Micro-SaaS Founder",
		},
		{
			text: '"Simple, fast, clean. No subscription overhead. Pay once, validate infinite landing ideas without recurring balance drains."',
			author: "Jordan K.",
			role: "Indie Builder",
		},
	]

	return (
		<section
			style={{ padding: "4.5rem 0", borderTop: `1px solid ${activeBorder}` }}
		>
			<div style={wrap}>
				<div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
					<div style={secLabel}>Success Proof</div>
					<h2 style={h2Style}>Validated Before Shipping.</h2>
					<p
						style={{
							color: activeMuted,
							fontSize: ".95rem",
							maxWidth: "480px",
							margin: "0 auto",
							lineHeight: 1.7,
						}}
					>
						See how smart builders secure paying core clients prior to coding.
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
					{testis.map((t, i) => (
						<div
							key={i}
							style={{
								background: activeCard,
								border: `1px solid ${activeBorder}`,
								borderRadius: "14px",
								padding: "1.25rem",
							}}
						>
							<div
								style={{ display: "flex", gap: "2px", marginBottom: ".75rem" }}
							>
								{Array(5)
									.fill(0)
									.map((_, idx) => (
										<Star key={idx} size={12} fill="#F59E0B" color="#F59E0B" />
									))}
							</div>
							<p
								style={{
									fontSize: ".8rem",
									color: activeMuted,
									lineHeight: 1.65,
									marginBottom: ".85rem",
									fontStyle: "italic",
								}}
							>
								{t.text}
							</p>
							<div style={{ fontSize: ".75rem", fontWeight: 700 }}>
								{t.author}
							</div>
							<div style={{ fontSize: ".72rem", color: C.muted2 }}>
								{t.role}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
