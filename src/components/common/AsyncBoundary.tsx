// src/components/common/AsyncBoundary.tsx
import { type ReactNode, Suspense } from "react"
import { Await, CatchBoundary } from "@tanstack/react-router"
import { Loader2 } from "lucide-react"

type Resultish = { ok: boolean; error?: string }

interface AsyncBoundaryProps<T extends Resultish> {
	promise: Promise<T>
	children: (data: T) => ReactNode
	fallback?: ReactNode
	errorFallback?: (error: Error | string | undefined) => ReactNode
	resetKey?: string | number
}

export function AsyncBoundary<T extends Resultish>({
	promise,
	children,
	resetKey,
	fallback = (
		<div className="flex items-center justify-center p-6 text-zinc-500">
			<Loader2 className="h-5 w-5 animate-spin" />
		</div>
	),
	errorFallback = (err) => {
		const message = err instanceof Error ? err.message : err
		return (
			<div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
				Failed to load data: {message ?? "Unknown error"}
			</div>
		)
	},
}: AsyncBoundaryProps<T>) {
	return (
		<CatchBoundary
			getResetKey={() => resetKey ?? "async-boundary"}
			errorComponent={({ error }) => errorFallback(error)}
		>
			<Suspense fallback={fallback}>
				<Await promise={promise}>
					{(data) => {
						if (!data.ok) {
							return errorFallback(data.error)
						}
						return children(data)
					}}
				</Await>
			</Suspense>
		</CatchBoundary>
	)
}
