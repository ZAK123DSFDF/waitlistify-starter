// src/components/ui-custom/FormFields.tsx
// @/components/ui-custom/FormFields.tsx
import { useState } from "react"
import { Controller } from "react-hook-form"
import type { Control, FieldValues, Path } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"

import {
	Field,
	FieldLabel,
	FieldDescription,
	FieldError,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// ── 1. TYPE-SAFE INPUT FIELD ────────────────────────────────────────────────
type InputFieldProps<TFieldValues extends FieldValues> = {
	control: Control<TFieldValues>
	name: Path<TFieldValues>
	label: string
	placeholder: string
	type: "email" | "password" | "text" | "number"
	icon?: React.ElementType
	showPasswordToggle?: boolean
	disabled?: boolean
	leading?: string
	trailing?: string
	description?: string
}

export const InputField = <TFieldValues extends FieldValues>({
	control,
	name,
	label,
	placeholder,
	type,
	icon: Icon,
	showPasswordToggle = false,
	disabled = false,
	leading,
	trailing,
	description,
}: InputFieldProps<TFieldValues>) => {
	const [showPassword, setShowPassword] = useState(false)

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Field
					data-invalid={fieldState.invalid}
					className="w-full flex flex-col gap-1.5"
				>
					<FieldLabel
						htmlFor={field.name}
						className="text-sm font-medium text-zinc-300 data-[invalid=true]:text-destructive"
					>
						{label}
					</FieldLabel>

					<div className="relative flex items-center w-full">
						{Icon && (
							<Icon
								className={`absolute left-3.5 h-5 w-5 text-zinc-500 pointer-events-none ${disabled ? "opacity-40" : ""}`}
							/>
						)}

						{leading && (
							<span className="absolute left-3.5 text-zinc-500 text-sm font-medium pointer-events-none">
								{leading}
							</span>
						)}

						<Input
							{...field}
							id={field.name}
							type={showPasswordToggle && showPassword ? "text" : type}
							placeholder={placeholder}
							disabled={disabled}
							aria-invalid={fieldState.invalid}
							className={`bg-zinc-900/80 text-zinc-100 border-zinc-800/80 placeholder:text-zinc-500 h-11 rounded-xl focus-visible:ring-1 focus-visible:ring-violet-600 focus-visible:ring-offset-0 ${
								leading ? "pl-9" : Icon ? "pl-11" : "pl-3.5"
							} ${
								trailing || showPasswordToggle ? "pr-11" : "pr-3.5"
							} w-full transition-all autofill:bg-zinc-900/80 [:-webkit-autofill]:[--tw-autofill-bg:var(--color-zinc-900)]/80 [:-webkit-autofill]:[box-shadow:0_0_0_1000px_#142025_inset] [:-webkit-autofill]:[-webkit-text-fill-color:#f4f4f5] ${
								fieldState.invalid
									? "border-destructive focus-visible:ring-destructive"
									: "focus-visible:border-violet-600"
							}`}
						/>
						{trailing && !showPasswordToggle && (
							<span className="absolute right-3.5 text-zinc-500 text-sm font-medium pointer-events-none">
								{trailing}
							</span>
						)}

						{showPasswordToggle && (
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								disabled={disabled}
								className="absolute right-3.5 text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none"
							>
								{showPassword ? (
									<EyeOff className="h-5 w-5" />
								) : (
									<Eye className="h-5 w-5" />
								)}
							</button>
						)}
					</div>

					{description && (
						<FieldDescription className="text-zinc-500 text-xs">
							{description}
						</FieldDescription>
					)}
					{fieldState.invalid && (
						<FieldError
							errors={[fieldState.error]}
							className="text-xs text-destructive font-medium mt-0.5"
						/>
					)}
				</Field>
			)}
		/>
	)
}

// ── 2. TYPE-SAFE TEXTAREA FIELD ─────────────────────────────────────────────
type TextareaFieldProps<TFieldValues extends FieldValues> = {
	control: Control<TFieldValues>
	name: Path<TFieldValues>
	label: string
	placeholder?: string
	rows?: number
	disabled?: boolean
	description?: string
}

export const TextareaField = <TFieldValues extends FieldValues>({
	control,
	name,
	label,
	placeholder = "",
	rows = 4,
	disabled = false,
	description,
}: TextareaFieldProps<TFieldValues>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Field
					data-invalid={fieldState.invalid}
					className="w-full flex flex-col gap-1.5"
				>
					<FieldLabel
						htmlFor={field.name}
						className="text-sm font-medium text-zinc-300 data-[invalid=true]:text-destructive"
					>
						{label}
					</FieldLabel>

					<Textarea
						{...field}
						id={field.name}
						placeholder={placeholder}
						rows={rows}
						disabled={disabled}
						aria-invalid={fieldState.invalid}
						className={`bg-[#0b1316] text-zinc-100 border-zinc-800 placeholder:text-zinc-600 rounded-xl resize-none focus-visible:ring-1 focus-visible:ring-violet-600 focus-visible:ring-offset-0 w-full ${
							fieldState.invalid
								? "border-destructive focus-visible:ring-destructive"
								: "focus-visible:border-violet-600"
						}`}
					/>

					{description && (
						<FieldDescription className="text-zinc-500 text-xs">
							{description}
						</FieldDescription>
					)}
					{fieldState.invalid && (
						<FieldError
							errors={[fieldState.error]}
							className="text-xs text-destructive font-medium mt-0.5"
						/>
					)}
				</Field>
			)}
		/>
	)
}
