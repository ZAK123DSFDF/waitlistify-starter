// src/components/ui-custom/CustomDialog.tsx
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import type * as React from "react"

export type CustomDialogProps = {
	isOpen: boolean
	onClose: () => void
	title?: React.ReactNode
	description?: React.ReactNode
	icon?: React.ReactNode
	children: React.ReactNode
	className?: string
	maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl"
}

const MAX_WIDTH_CLASSES = {
	sm: "sm:max-w-sm",
	md: "sm:max-w-md",
	lg: "sm:max-w-lg",
	xl: "sm:max-w-xl",
	"2xl": "sm:max-w-2xl",
	"3xl": "sm:max-w-3xl",
	"4xl": "sm:max-w-4xl",
	"5xl": "sm:max-w-5xl",
}

export function CustomDialog({
	isOpen,
	onClose,
	title,
	description,
	icon,
	children,
	className,
	maxWidth = "lg",
}: CustomDialogProps) {
	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<DialogContent
				className={cn(
					"bg-[#0b1317] border-violet-500/20 text-zinc-100 p-6 sm:p-8 rounded-2xl shadow-2xl w-[95vw]",
					MAX_WIDTH_CLASSES[maxWidth],
					className,
				)}
			>
				{(title || description || icon) && (
					<DialogHeader className="text-center space-y-2 pb-4">
						{icon && (
							<div className="mx-auto h-11 w-11 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
								{icon}
							</div>
						)}
						{title && (
							<DialogTitle className="text-2xl font-bold tracking-tight text-zinc-100">
								{title}
							</DialogTitle>
						)}
						{description && (
							<DialogDescription className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
								{description}
							</DialogDescription>
						)}
					</DialogHeader>
				)}

				{children}
			</DialogContent>
		</Dialog>
	)
}
