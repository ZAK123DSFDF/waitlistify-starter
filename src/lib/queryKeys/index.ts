// src/lib/queryKeys/index.ts
export type InferInput<T> = T extends (
	input: infer I,
	...args: never[]
) => unknown
	? I
	: never
type RouteMethods<TRouter> = {
	[K in keyof TRouter as TRouter[K] extends (...args: never[]) => unknown
		? K
		: never]: TRouter[K]
}
export function createRouterKeys<
	TDomain extends string,
	TRouter extends object,
>(domain: TDomain) {
	type Methods = RouteMethods<TRouter>

	type KeyMap = {
		[K in keyof Methods]: (
			input?: InferInput<Methods[K]>,
		) => readonly [
			TDomain,
			K,
			...(InferInput<Methods[K]> extends undefined
				? []
				: [InferInput<Methods[K]>]),
		]
	} & {
		all: readonly [TDomain]
	}

	return new Proxy(
		{ all: [domain] as const },
		{
			get(_target, prop: string) {
				if (prop === "all") return [domain]

				return (input?: unknown) => {
					return input !== undefined
						? ([domain, prop, input] as const)
						: ([domain, prop] as const)
				}
			},
		},
	) as unknown as KeyMap
}
