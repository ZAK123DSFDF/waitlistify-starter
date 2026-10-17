// src/components/ui-custom/logo.tsx
import { ListChecks } from "lucide-react"
import { Link } from "@tanstack/react-router"

type LogoProps = {
	accentColor?: string
	isFolded?: boolean
	isStatic?: boolean // Prop to toggle link vs static rendering
}

export function Logo({
	accentColor = "#8B5CF6",
	isFolded = false,
	isStatic = false,
}: LogoProps) {
	// Core inner layout shared between link and static versions
	const content = (
		<>
			{/*
        Icon Wrapper block
        Using min-w and min-h ensures the layout transitions never squash the container box!
      */}
			<div
				style={{ backgroundColor: accentColor }}
				className="w-7.5 h-7.5 min-w-7.5 min-h-7.5 rounded-lg flex items-center justify-center transition-colors duration-200 shrink-0"
			>
				<ListChecks size={17} color="#fff" strokeWidth={2.25} />
			</div>

			{/* Brand Text Node */}
			<span
				className={`text-[15px] font-bold text-zinc-100 tracking-[-0.02em] transition-opacity duration-200 shrink-0
          ${isFolded ? "hidden group-data-[collapsible=icon]:hidden" : ""}
        `}
			>
				Waitlistify
			</span>
		</>
	)

	const sharedClassName =
		"flex items-center gap-[9px] no-underline focus:outline-none select-none shrink-0"

	// If static, render as a clean structural div wrapper
	if (isStatic) {
		return <div className={sharedClassName}>{content}</div>
	}

	// Otherwise render as a functional application route transition link
	return (
		<Link to="/" className={sharedClassName}>
			{content}
		</Link>
	)
}
