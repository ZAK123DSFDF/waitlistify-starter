// src/components/ui-custom/SelectField.tsx
import type React from "react"
import { Controller } from "react-hook-form"
import type { Control, FieldValues, Path } from "react-hook-form"
import {
	Field,
	FieldLabel,
	FieldDescription,
	FieldError,
} from "@/components/ui/field"
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select"

type SelectFieldProps<TFieldValues extends FieldValues> = {
	control: Control<TFieldValues>
	name: Path<TFieldValues>
	label: string
	placeholder?: string
	options: { value: string; label: string }[]
	icon?: React.ElementType
	disabled?: boolean
	description?: string

	// Infinite scroll / pagination props
	hasNext?: boolean
	onLoadMore?: (e: React.MouseEvent<HTMLButtonElement>) => void
	isLoading?: boolean
}

export const SelectField = <TFieldValues extends FieldValues>({
	control,
	name,
	label,
	placeholder = "Select an option",
	options,
	icon: Icon,
	disabled = false,
	description,
	hasNext,
	onLoadMore,
	isLoading,
}: SelectFieldProps<TFieldValues>) => {
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
								className={`absolute left-3 h-5 w-5 text-zinc-500 pointer-events-none z-10 ${disabled ? "opacity-40" : ""}`}
							/>
						)}

						<Select
							name={field.name}
							value={field.value}
							onValueChange={field.onChange}
							disabled={disabled}
						>
							<SelectTrigger
								id={field.name}
								aria-invalid={fieldState.invalid}
								className={`bg-[#060F0A] text-zinc-100 border-zinc-800 focus:ring-1 focus:ring-[#10B981] focus:ring-offset-0 w-full ${
									Icon ? "pl-10" : "pl-3"
								} ${
									fieldState.invalid
										? "border-destructive focus:ring-destructive"
										: "focus:border-[#10B981]"
								}`}
							>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>

							<SelectContent className="bg-[#0F1F14] border-zinc-800 text-zinc-200">
								{options.map((opt) => (
									<SelectItem
										key={opt.value}
										value={opt.value}
										className="focus:bg-[#10B981] focus:text-black cursor-pointer"
									>
										{opt.label}
									</SelectItem>
								))}

								{hasNext && (
									<div className="p-1.5 border-t border-zinc-800 sticky bottom-0 bg-[#0F1F14]">
										<button
											type="button"
											disabled={isLoading}
											onClick={onLoadMore}
											className="w-full text-xs py-1.5 rounded text-[#10B981] hover:bg-[#162e1e] font-medium transition-colors disabled:opacity-50"
										>
											{isLoading ? "Loading..." : "Load more options..."}
										</button>
									</div>
								)}
							</SelectContent>
						</Select>
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
