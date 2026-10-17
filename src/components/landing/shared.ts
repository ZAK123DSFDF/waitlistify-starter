// src/components/landing/shared.ts
const C = {
	bg: "#090714",
	bg2: "#120d24",
	card: "#17102b",
	card2: "#1d1435",
	border: "rgba(255,255,255,0.07)",
	border2: "rgba(255,255,255,0.12)",
	green: "#2FA6A0",
	green3: "rgba(47,166,160,0.12)",
	text: "#F7F2FF",
	muted: "#A99BC4",
	muted2: "#75668F",
	red: "#F87171",
}

const wrap = { maxWidth: "1080px", margin: "0 auto", padding: "0 2rem" }
const secLabel = {
	fontSize: "11px",
	fontWeight: "700",
	letterSpacing: ".1em",
	textTransform: "uppercase" as const,
	color: C.green,
	marginBottom: ".75rem",
}
const h2Style = {
	fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
	fontWeight: "800",
	letterSpacing: "-.03em",
	lineHeight: "1.15",
	marginBottom: ".75rem",
}
const tagStyle = {
	display: "inline-block",
	fontSize: "10px",
	fontWeight: "700",
	letterSpacing: ".08em",
	textTransform: "uppercase" as const,
	color: C.green,
	background: C.green3,
	border: `1px solid rgba(47,166,160,0.2)`,
	padding: ".25rem .65rem",
	borderRadius: "100px",
}

export { C, wrap, secLabel, h2Style, tagStyle }

