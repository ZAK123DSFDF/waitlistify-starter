// src/components/ui-custom/confirm-dialog.tsx
import type { ReactNode } from "react"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Loader2 } from "lucide-react"

export interface ConfirmDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	title: ReactNode
	description: ReactNode
	confirmText?: string
	cancelText?: string
	isLoading?: boolean
	variant?: "default" | "destructive"
	onConfirm: () => void | Promise<void>
}

export function ConfirmDialog({
	open,
	onOpenChange,
	title,
	description,
	confirmText = "Confirm",
	cancelText = "Cancel",
	isLoading = false,
	variant = "default",
	onConfirm,
}: ConfirmDialogProps) {
	const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		onConfirm()
	}

	const confirmButtonStyles =
		variant === "destructive"
			? "bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/20"
			: "bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-600/20"

	return (
		<AlertDialog
			open={open}
			onOpenChange={(nextOpen) => {
				if (!isLoading) {
					onOpenChange(nextOpen)
				}
			}}
		>
			<AlertDialogContent className="bg-[#0b1317] border border-zinc-800 text-zinc-100 max-w-md rounded-2xl">
				<AlertDialogHeader>
					<AlertDialogTitle className="text-white text-base font-semibold">
						{title}
					</AlertDialogTitle>
					<AlertDialogDescription className="text-xs text-zinc-400 leading-relaxed">
						{description}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="mt-4 gap-2">
					<AlertDialogCancel
						disabled={isLoading}
						className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-300 text-xs rounded-xl"
					>
						{cancelText}
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleConfirm}
						disabled={isLoading}
						className={`${confirmButtonStyles} text-xs font-semibold rounded-xl cursor-pointer`}
					>
						{isLoading ? (
							<>
								<Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
								<span>Processing...</span>
							</>
						) : (
							confirmText
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
