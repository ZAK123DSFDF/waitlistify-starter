// src/components/landing/Nav.tsx
import { ArrowRight } from "lucide-react"
import { Logo } from "#/components/ui-custom/logo.tsx"
import { wrap } from "./shared"

export function Nav({
	activeMuted,
	activeBorder,
	activeBg,
}: {
	activeMuted: string
	activeBorder: string
	activeBg: string
}) {
	const navItems = [
		{ label: "How it works", href: "#how" },
		{ label: "Features", href: "#features" },
		{ label: "Pricing", href: "#pricing" },
		{ label: "FAQ", href: "#faq" },
	]

	const isDarkBg = activeBg !== "#F7F3FF"

	return (
		<nav
			className="landing-nav"
			style={{
				borderBottom: `1px solid ${activeBorder}`,
				background: isDarkBg
					? "rgba(7, 12, 14, 0.92)"
					: "rgba(247, 243, 255, 0.92)",
				backdropFilter: "blur(16px)",
				position: "sticky",
				top: 0,
				zIndex: 50,
			}}
		>
			<div
				className="landing-nav-inner"
				style={{
					...wrap,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					height: "60px",
				}}
			>
				<Logo accentColor="#8b5cf6" />
				<div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
					{navItems.map((item, idx) => (
						<a
							key={idx}
							href={item.href}
							style={{
								color: activeMuted,
								fontSize: "13px",
								fontWeight: 500,
								textDecoration: "none",
								transition: "color 0.2s",
							}}
							className="hover:text-violet-400"
						>
							{item.label}
						</a>
					))}
				</div>
				<div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
					<a
						href="/login"
						style={{
							color: activeMuted,
							fontSize: "13px",
							fontWeight: 600,
							padding: ".45rem 1rem",
							borderRadius: "10px",
							textDecoration: "none",
						}}
						className="hover:text-white"
					>
						Sign in
					</a>
					<a
						href="#pricing"
						style={{
							display: "inline-flex",
							alignItems: "center",
							gap: "6px",
							backgroundColor: "#7c3aed", // violet-600
							color: "#fff",
							fontSize: "13px",
							fontWeight: 600,
							padding: ".45rem 1rem",
							borderRadius: "10px",
							textDecoration: "none",
							boxShadow: "0 4px 14px 0 rgba(124, 58, 237, 0.25)",
							transition: "all 0.2s",
						}}
						className="hover:bg-violet-500"
					>
						Create Waitlist <ArrowRight size={12} strokeWidth={2.5} />
					</a>
				</div>
			</div>
		</nav>
	)
}
