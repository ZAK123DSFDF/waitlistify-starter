// src/components/landing/CTA.tsx
import { ArrowRight } from "lucide-react"
import { h2Style, secLabel, wrap } from "./shared"

export function CTA({ activeMuted }: { activeMuted: string }) {
	return (
		<section style={{ padding: "4.5rem 0" }}>
			<div style={wrap}>
				<div
					style={{
						background: `linear-gradient(135deg,rgba(139, 92, 246, 0.1),rgba(139, 92, 246, 0.02))`,
						border: "1px solid rgba(139, 92, 246, 0.25)",
						borderRadius: "24px",
						padding: "clamp(2rem, 5vw, 4rem) 1.25rem", // Responsive container padding
						textAlign: "center",
						position: "relative",
						overflow: "hidden",
					}}
				>
					<div
						style={{
							position: "absolute",
							top: "-30%",
							left: "50%",
							transform: "translateX(-50%)",
							width: "500px",
							height: "300px",
							background:
								"radial-gradient(ellipse,rgba(139, 92, 246, 0.15) 0%,transparent 65%)",
							pointerEvents: "none",
						}}
					/>
					<div style={{ position: "relative", zIndex: 1 }}>
						<div style={secLabel}>Launch Today</div>
						<h2 style={h2Style}>Secure early buyers before shipping.</h2>
						<p
							style={{
								color: activeMuted,
								maxWidth: "440px",
								margin: "0 auto 2rem",
								fontSize: "clamp(0.875rem, 2vw, 0.95rem)",
								lineHeight: 1.7,
							}}
						>
							Build high intent waiting pools, gather transaction commitments up
							front, and validate product demand.
						</p>
						<a
							href="#pricing"
							style={{
								display: "inline-flex",
								alignItems: "center",
								justifyContent: "center",
								gap: "6px",
								background: "#7c3aed",
								color: "#fff",
								padding: "clamp(0.75rem, 2vw, 1rem) clamp(1.25rem, 3vw, 2rem)", // Fluid button padding
								borderRadius: "10px",
								fontSize: "clamp(13px, 2.5vw, 15px)", // Smooth font size progression
								fontWeight: 600,
								textDecoration: "none",
								boxShadow: "0 4px 14px rgba(124, 58, 237, 0.35)",
								whiteSpace: "nowrap",
								maxWidth: "100%",
								boxSizing: "border-box",
							}}
						>
							Get Started Instantly <ArrowRight size={14} strokeWidth={2.5} />
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}
