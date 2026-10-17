// src/lib/exceptions.ts
import { ORPCError } from "@orpc/client"
export interface ErrorResponse {
	ok: false
	status: number
	error: string
	toast: string
	fields: Record<string, string> | null
	data?: any
}
export class AppError extends Error {
	public status: number
	public toast: string
	public error: string
	public fields: Record<string, string> | null
	public data: any
	public readonly ok = false

	constructor(options: {
		status?: number
		error?: string
		toast?: string
		fields?: Record<string, string> | null
		data?: any
	}) {
		const message =
			options.error || options.toast || "An unexpected error occurred"
		super(message)

		this.name = "AppError"
		this.status = options.status || 500
		this.error = options.error || message
		this.toast = options.toast || this.error
		this.fields = options.fields || null
		this.data = options.data

		Object.setPrototypeOf(this, AppError.prototype)
	}
}
export function returnError(err: unknown): ErrorResponse {
	console.error("Full error object captured:", err)
	if (err instanceof ORPCError) {
		const data = err.data as
			| { toast?: string; fields?: Record<string, string> }
			| undefined
		return {
			ok: false,
			status: err.status ?? 500,
			error: err.code,
			toast: data?.toast || err.message || "Something went wrong",
			fields: data?.fields || null,
			data: err.data,
		}
	}
	if (err instanceof AppError) {
		return {
			ok: false,
			status: err.status,
			error: err.error,
			toast: err.toast,
			fields: err.fields,
			data: err.data,
		}
	}
	if (typeof err === "object" && err !== null) {
		const errorObj = err as Record<string, any>
		const extractedToastMessage =
			errorObj.toast ||
			errorObj.message ||
			errorObj.data?.message ||
			"Something went wrong"

		return {
			ok: false,
			status: errorObj.status || 500,
			error: errorObj.error || "UNKNOWN_ERROR",
			toast: extractedToastMessage,
			fields: errorObj.fields || null,
			data: errorObj.data,
		}
	}
	if (err instanceof Error) {
		return {
			ok: false,
			status: 500,
			error: err.message,
			toast: "An unexpected system error occurred",
			fields: null,
		}
	}
	return {
		ok: false,
		status: 500,
		error: "INTERNAL_SERVER_ERROR",
		toast: "Something went wrong",
		fields: null,
	}
}
