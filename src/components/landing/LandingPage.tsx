// src/components/landing/LandingPage.tsx
import { useState } from "react"
import { GlobalStyles } from "./GlobalStyles"
import { Nav } from "./Nav"
import { Hero } from "./Hero"
import { Problem } from "./Problem"
import { HowItWorks } from "./HowItWorks"
import { Features } from "./Features"
import { Comparison } from "./Comparison"
import { Pricing } from "./Pricing"
import { Testimonials } from "./Testimonials"
import { FAQ } from "./FAQ"
import { CTA } from "./CTA"
import { Footer } from "./Footer"
import { C } from "./shared"

export function LandingPage() {
	const [isDark, setIsDark] = useState(true)

	const toggleTheme = () => {
		setIsDark(!isDark)
	}

	// Dynamic light mode theme override token computation
	const activeBg = isDark ? C.bg : "#F7F3FF"
	const activeBg2 = isDark ? C.bg2 : "#EEE7FF"
	const activeCard = isDark ? C.card : "#FFFFFF"
	const activeText = isDark ? C.text : "#211334"
	const activeMuted = isDark ? C.muted : "#6D5A88"
	const activeBorder = isDark ? C.border : "rgba(0,0,0,0.08)"
	const activeBorder2 = isDark ? C.border2 : "rgba(0,0,0,0.15)"

	return (
		<div
			className="landing-page"
			style={{
				minHeight: "100vh",
				background: activeBg,
				color: activeText,
				fontFamily: "'Inter',system-ui,sans-serif",
				lineHeight: 1.6,
				fontSize: "15px",
				overflowX: "hidden",
				transition: "background-color 0.2s, color 0.2s",
			}}
		>
			<GlobalStyles />
			<Nav
				activeMuted={activeMuted}
				activeBorder={activeBorder}
				activeBg={activeBg}
			/>
			<Hero
				activeMuted={activeMuted}
				activeCard={activeCard}
				activeBorder={activeBorder}
				activeBorder2={activeBorder2}
			/>
			<Problem
				activeMuted={activeMuted}
				activeCard={activeCard}
				activeBorder={activeBorder}
			/>
			<HowItWorks
				activeMuted={activeMuted}
				activeCard={activeCard}
				activeBorder={activeBorder}
			/>
			<Features
				activeMuted={activeMuted}
				activeCard={activeCard}
				activeBorder={activeBorder}
				activeBg2={activeBg2}
			/>
			<Comparison
				activeMuted={activeMuted}
				activeCard={activeCard}
				activeBorder={activeBorder}
			/>
			<Pricing
				activeMuted={activeMuted}
				activeCard={activeCard}
				activeBorder={activeBorder}
				activeBorder2={activeBorder2}
				activeBg2={activeBg2}
			/>
			<Testimonials
				activeMuted={activeMuted}
				activeCard={activeCard}
				activeBorder={activeBorder}
			/>
			<FAQ
				activeMuted={activeMuted}
				activeCard={activeCard}
				activeBorder={activeBorder}
				activeBg2={activeBg2}
			/>
			<CTA activeMuted={activeMuted} />
			<Footer
				activeMuted={activeMuted}
				activeBorder={activeBorder}
				isDark={isDark}
				toggleTheme={toggleTheme}
			/>
		</div>
	)
}
