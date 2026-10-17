// src/hooks/useAppMutation.ts
import {
	useMutation,
	useQueryClient,
	type QueryKey,
	type UseMutationOptions,
} from "@tanstack/react-query"
import { useRouter } from "@tanstack/react-router"
import { useCustomToast } from "@/components/ui-custom/ShowCustomToast"
import { returnError, type ErrorResponse } from "@/lib/exceptions"

export interface AppSuccessResponse {
	ok: true
	toast?: string
	redirectUrl?: string
	[key: string]: any
}

// --- Optimistic update config ---
// One entry = one query key to optimistically patch during the mutation.
interface OptimisticEntry<TQueryData, TVariables> {
	queryKey: QueryKey
	updater: (old: TQueryData | undefined, variables: TVariables) => TQueryData
}

type OptimisticConfig<TVariables> =
	| OptimisticEntry<any, TVariables>
	| OptimisticEntry<any, TVariables>[]

interface OptimisticSnapshot {
	queryKey: QueryKey
	previousData: unknown
}

// Internal context shape merged with whatever the caller's onMutate returns
type OptimisticContext = { __optimisticSnapshots?: OptimisticSnapshot[] }

export function useAppMutation<TData extends AppSuccessResponse, TVariables>(
	mutationFn: (variables: TVariables) => Promise<TData>,
	options?: Omit<
		UseMutationOptions<TData, unknown, TVariables, OptimisticContext>,
		"mutationFn" | "onSuccess" | "onError" | "onMutate" | "onSettled"
	> & {
		disableSuccessToast?: boolean
		disableErrorToast?: boolean
		redirectUrl?: string
		enableRedirect?: boolean
		/**
		 * Declarative optimistic update(s). Pass one or an array of
		 * { queryKey, updater } — cancel/snapshot/apply/rollback/invalidate
		 * is handled automatically.
		 */
		optimisticUpdate?: OptimisticConfig<TVariables>
		onMutate?: (
			variables: TVariables,
		) =>
			| Promise<Record<string, unknown> | void>
			| Record<string, unknown>
			| void
		onSuccess?: (
			data: TData,
			variables: TVariables,
			context: OptimisticContext,
		) => void
		onError?: (
			error: ErrorResponse,
			variables: TVariables,
			context: OptimisticContext | undefined,
		) => void
		onSettled?: (
			data: TData | undefined,
			error: unknown,
			variables: TVariables,
			context: OptimisticContext | undefined,
		) => void
	},
) {
	const { showCustomToast } = useCustomToast()
	const router = useRouter()
	const queryClient = useQueryClient()

	const entries: OptimisticEntry<any, TVariables>[] = options?.optimisticUpdate
		? Array.isArray(options.optimisticUpdate)
			? options.optimisticUpdate
			: [options.optimisticUpdate]
		: []

	return useMutation<TData, unknown, TVariables, OptimisticContext>({
		mutationFn,
		...options,

		onMutate: async (variables) => {
			let snapshots: OptimisticSnapshot[] = []

			if (entries.length > 0) {
				// 1. Cancel outgoing refetches for every affected key
				await Promise.all(
					entries.map((entry) =>
						queryClient.cancelQueries({ queryKey: entry.queryKey }),
					),
				)

				// 2. Snapshot + 3. apply optimistic update, per entry
				snapshots = entries.map((entry) => {
					const previousData = queryClient.getQueryData(entry.queryKey)
					queryClient.setQueryData(entry.queryKey, (old: unknown) =>
						entry.updater(old, variables),
					)
					return { queryKey: entry.queryKey, previousData }
				})
			}

			// Let caller add its own onMutate context/logic on top
			const customContext = await options?.onMutate?.(variables)

			return {
				...(customContext ?? {}),
				__optimisticSnapshots: snapshots,
			} as OptimisticContext
		},

		onError: (rawError: unknown, variables, context) => {
			const ctx = context as OptimisticContext | undefined

			// Rollback every snapshot taken in onMutate
			ctx?.__optimisticSnapshots?.forEach(({ queryKey, previousData }) => {
				queryClient.setQueryData(queryKey, previousData)
			})

			const normalizedError = returnError(rawError)
			if (!options?.disableErrorToast) {
				showCustomToast({
					type: "error",
					title: "Action Failed",
					description: normalizedError.toast,
				})
			}
			options?.onError?.(normalizedError, variables, context)
		},

		onSuccess: (res, variables, context) => {
			if (!options?.disableSuccessToast) {
				showCustomToast({
					type: "success",
					title: "Success",
					description: res?.toast || "Action completed successfully.",
				})
			}
			if (res?.redirectUrl && (options?.enableRedirect ?? true)) {
				router.navigate({ to: res.redirectUrl })
			} else if (options?.redirectUrl && (options?.enableRedirect ?? true)) {
				router.navigate({ to: options.redirectUrl })
			}
			options?.onSuccess?.(res, variables, context)
		},

		onSettled: (data, error, variables, context) => {
			const ctx = context as OptimisticContext | undefined

			// Quietly revalidate every optimistically-touched key in the background
			ctx?.__optimisticSnapshots?.forEach(({ queryKey }) => {
				queryClient.invalidateQueries({ queryKey })
			})

			options?.onSettled?.(data, error, variables, context)
		},
	})
}
