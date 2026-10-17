// src/components/landing/Footer.tsx
import { Logo } from "@/components/ui-custom/logo"
import { C, wrap } from "./shared"

export function Footer({
	activeMuted,
	activeBorder,
	isDark,
	toggleTheme,
}: {
	activeMuted: string
	activeBorder: string
	isDark: boolean
	toggleTheme: () => void
}) {
	return (
		<footer
			style={{ borderTop: `1px solid ${activeBorder}`, padding: "1.75rem 0" }}
		>
			<div
				className="landing-footer-inner"
				style={{
					...wrap,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Logo accentColor="#8b5cf6" isStatic />
				<div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
					{["Privacy", "Terms"].map((l) => (
						<a
							key={l}
							href="#"
							style={{
								fontSize: "12px",
								color: activeMuted,
								textDecoration: "none",
							}}
						>
							{l}
						</a>
					))}

					{/* Custom Theme Controller Placement */}
					<button
						onClick={toggleTheme}
						style={{
							display: "inline-flex",
							alignItems: "center",
							gap: "4px",
							background: "transparent",
							border: `1px solid ${activeBorder}`,
							padding: "3px 10px",
							borderRadius: "20px",
							color: "inherit",
							fontSize: "11px",
							fontWeight: 600,
							cursor: "pointer",
						}}
					>
						{isDark ? "☀️ Light" : "🌙 Dark"}
					</button>
				</div>
				<span style={{ fontSize: "12px", color: C.muted2 }}>
					© 2026 Waitlistify
				</span>
			</div>
		</footer>
	)
}
