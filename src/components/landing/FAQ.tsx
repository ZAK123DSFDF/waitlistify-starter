// src/components/landing/FAQ.tsx
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { h2Style, secLabel, wrap } from "./shared"

const FAQ_ITEMS = [
	{
		q: "How does paid preselling work?",
		a: "You can set up custom payment checkpoints via Polar or Stripe. Eager clients choose to purchase early access tiers or skip queue positions, generating revenue before you build.",
	},
	{
		q: "Can I map multiple independent domains?",
		a: "Yes, Pro and Ultimate packages let you associate custom clean URLs directly to any individual waitlist page instantly.",
	},
	{
		q: "Is there a limit on subscriber capture rows?",
		a: "Starter package includes up to 500 rows, while our Pro and Ultimate tiers offer infinite database registration slots safely.",
	},
	{
		q: "How fast do pages render?",
		a: "Everything is engineered on top of TanStack Start and hosted via global Edge Cloudflare Workers, achieving lightning-fast load responses anywhere.",
	},
]

export function FAQItem({
	q,
	a,
	activeMuted,
	activeCard,
	activeBorder,
}: {
	q: string
	a: string
	activeMuted: string
	activeCard: string
	activeBorder: string
}) {
	const [open, setOpen] = useState(false)
	return (
		<div
			style={{
				background: activeCard,
				border: `1px solid ${activeBorder}`,
				borderRadius: "12px",
				overflow: "hidden",
				marginBottom: "2px",
			}}
		>
			<button
				type="button"
				onClick={() => setOpen(!open)}
				style={{
					width: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "1rem 1.25rem",
					background: "none",
					border: "none",
					color: "inherit",
					fontSize: ".85rem",
					fontWeight: 600,
					cursor: "pointer",
					textAlign: "left",
					gap: "1rem",
				}}
			>
				<span>{q}</span>
				<span
					style={{
						transform: open ? "rotate(180deg)" : "rotate(0deg)",
						transition: "transform .2s",
						flexShrink: 0,
						color: "#a78bfa",
					}}
				>
					<ChevronDown size={15} />
				</span>
			</button>
			{open && (
				<div
					style={{
						padding: "0 1.25rem 1rem",
						fontSize: ".8rem",
						color: activeMuted,
						lineHeight: 1.7,
						borderTop: `1px solid ${activeBorder}`,
						paddingTop: ".75rem",
					}}
				>
					{a}
				</div>
			)}
		</div>
	)
}

export function FAQ({
	activeMuted,
	activeCard,
	activeBorder,
	activeBg2,
}: {
	activeMuted: string
	activeCard: string
	activeBorder: string
	activeBg2: string
}) {
	return (
		<section
			id="faq"
			style={{
				padding: "4.5rem 0",
				borderTop: `1px solid ${activeBorder}`,
				background: activeBg2,
			}}
		>
			<div style={wrap}>
				<div style={{ maxWidth: "640px", margin: "0 auto" }}>
					<div style={{ textAlign: "center", marginBottom: "2rem" }}>
						<div style={secLabel}>FAQ</div>
						<h2 style={h2Style}>Common questions.</h2>
					</div>
					<div>
						{FAQ_ITEMS.map((item) => (
							<FAQItem
								key={item.q}
								q={item.q}
								a={item.a}
								activeMuted={activeMuted}
								activeCard={activeCard}
								activeBorder={activeBorder}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
