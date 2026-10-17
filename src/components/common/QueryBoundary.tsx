// src/components/common/QueryBoundary.tsx
import { type ReactNode, Suspense } from "react"
import { CatchBoundary } from "@tanstack/react-router"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QueryBoundaryProps {
	children: ReactNode
	fallback: ReactNode
	errorFallback?: (error: Error, reset: () => void) => ReactNode
	resetKey?: string | number
}

export function QueryBoundary({
	children,
	fallback,
	resetKey,
	errorFallback,
}: QueryBoundaryProps) {
	return (
		<CatchBoundary
			getResetKey={() => resetKey ?? "query-boundary"}
			errorComponent={({ error, reset }) => {
				if (errorFallback) {
					return errorFallback(error, reset)
				}

				return (
					<div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 text-center flex flex-col items-center justify-center gap-3">
						<div className="h-9 w-9 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
							<AlertCircle className="h-5 w-5" />
						</div>
						<div>
							<p className="text-xs font-semibold text-white">
								Failed to load data
							</p>
							<p className="text-xs text-zinc-400 mt-1 max-w-sm">
								{error.message}
							</p>
						</div>
						<Button
							type="button"
							variant="outline"
							onClick={reset}
							className="text-xs border-zinc-800 hover:bg-zinc-900 gap-2 h-8 px-3"
						>
							<RefreshCw className="h-3 w-3" />
							Try Again
						</Button>
					</div>
				)
			}}
		>
			<Suspense fallback={fallback}>{children}</Suspense>
		</CatchBoundary>
	)
}
