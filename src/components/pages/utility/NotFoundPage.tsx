// src/components/pages/utility/NotFoundPage.tsx
import { Link, useRouter } from "@tanstack/react-router"
import { ArrowLeft, Home, Compass } from "lucide-react"

export function NotFoundPage() {
	const router = useRouter()

	return (
		<div className="min-h-screen w-full bg-[#0b1317] text-zinc-100 flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-violet-500/30 selection:text-violet-200">
			{/* Ambient Violet Glow Effects */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />
			<div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-violet-500/10 rounded-full blur-[90px] pointer-events-none" />

			{/* Subtle Background Grid Pattern */}
			<div
				className="absolute inset-0 opacity-[0.03] pointer-events-none"
				style={{
					backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
					backgroundSize: "24px 24px",
				}}
			/>

			<div className="relative z-10 max-w-lg w-full text-center space-y-8">
				{/* Visual Badge / Icon Header */}
				<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono font-medium tracking-wide shadow-inner shadow-violet-500/10">
					<Compass className="w-3.5 h-3.5 animate-spin-slow text-violet-400" />
					<span>404 — PAGE NOT FOUND</span>
				</div>

				{/* Huge Glowing 404 Display */}
				<div className="space-y-2 relative">
					<h1 className="text-8xl sm:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 via-zinc-200 to-violet-400/40 select-none">
						404
					</h1>
					<h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-200">
						Lost in the digital void
					</h2>
					<p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
						The workspace route or resource you are looking for doesn't exist,
						was moved, or has expired.
					</p>
				</div>

				{/* Action Buttons */}
				<div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
					<button
						type="button"
						onClick={() => router.history.back()}
						className="w-full sm:w-auto h-11 px-5 rounded-xl border border-violet-500/20 bg-zinc-900/60 hover:bg-zinc-800/80 text-zinc-200 text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:border-violet-500/40 cursor-pointer"
					>
						<ArrowLeft className="w-4 h-4 text-zinc-400" />
						Go Back
					</button>

					<Link
						to="/"
						className="w-full sm:w-auto h-11 px-6 rounded-xl bg-violet-600 hover:bg-violet-500 !text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-violet-600/25 hover:shadow-violet-500/35 cursor-pointer"
					>
						<Home className="w-4 h-4 text-white shrink-0" />
						<span className="text-white">Return Home</span>
					</Link>
				</div>
			</div>
		</div>
	)
}
