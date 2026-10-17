// src/components/ui-custom/ShowCustomToast.ts
import { toast } from "sonner"

export interface CustomToastOptions {
	type: "success" | "error" | "info" | "warning"
	title: string
	description?: string
}

export function useCustomToast() {
	const showCustomToast = ({
		type,
		title,
		description,
	}: CustomToastOptions) => {
		toast[type](title, {
			description: description,
		})
	}

	return { showCustomToast }
}
