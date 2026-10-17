// src/components/ui-custom/unpublished-state.tsx
import { EyeOff, AlertCircle } from "lucide-react"

interface UnpublishedStateProps {
	slug?: string
	title?: string
	description?: string
}

export function UnpublishedState({
	slug,
	title = "Page Not Published",
	description = "This waitlist page is currently private or not accepting new signups right now. Please check back later!",
}: UnpublishedStateProps) {
	return (
		<div className="min-h-screen bg-[#070c0e] text-zinc-100 flex items-center justify-center p-6 sm:p-10">
			<div className="max-w-md w-full bg-[#0b1317] border border-zinc-800 rounded-2xl p-8 text-center space-y-4 shadow-xl">
				<div className="h-12 w-12 rounded-2xl bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center text-zinc-400 mx-auto">
					<EyeOff className="h-6 w-6" />
				</div>

				<div className="space-y-1">
					<h1 className="text-lg font-semibold text-white">{title}</h1>
					<p className="text-xs text-zinc-400 leading-relaxed">{description}</p>
				</div>

				{slug && (
					<div className="pt-2 text-[11px] text-zinc-500 font-mono flex items-center justify-center gap-1.5 border-t border-zinc-800/60">
						<AlertCircle className="h-3 w-3" />
						<span>/{slug}</span>
					</div>
				)}
			</div>
		</div>
	)
}
