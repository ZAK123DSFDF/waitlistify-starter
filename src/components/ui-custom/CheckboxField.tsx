// src/components/ui-custom/CheckboxField.tsx
import { Controller } from "react-hook-form"
import type { Control, FieldValues, Path } from "react-hook-form"
import {
	Field,
	FieldLabel,
	FieldDescription,
	FieldError,
} from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"

type CheckboxFieldProps<TFieldValues extends FieldValues> = {
	control: Control<TFieldValues>
	name: Path<TFieldValues>
	label: string
	disabled?: boolean
	description?: string
}

export const CheckboxField = <TFieldValues extends FieldValues>({
	control,
	name,
	label,
	disabled = false,
	description,
}: CheckboxFieldProps<TFieldValues>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Field
					orientation="horizontal"
					data-invalid={fieldState.invalid}
					data-disabled={disabled}
					className="flex flex-col gap-1"
				>
					<div className="flex items-start space-x-2.5 py-1">
						<Checkbox
							id={field.name}
							name={field.name}
							checked={field.value}
							onCheckedChange={field.onChange}
							disabled={disabled}
							aria-invalid={fieldState.invalid}
							className="border-zinc-700 data-[state=checked]:bg-[#10B981] data-[state=checked]:border-[#10B981] transition-colors mt-0.5"
						/>

						<div className="grid gap-1.5 leading-none">
							<FieldLabel
								htmlFor={field.name}
								className="text-sm font-medium text-zinc-300 cursor-pointer select-none data-[disabled=true]:opacity-50 data-[invalid=true]:text-destructive"
							>
								{label}
							</FieldLabel>

							{description && (
								<FieldDescription className="text-zinc-500 text-xs selection:bg-transparent">
									{description}
								</FieldDescription>
							)}
						</div>
					</div>

					{/* Error string padded neatly underneath the label layout */}
					{fieldState.invalid && (
						<FieldError
							errors={[fieldState.error]}
							className="text-xs text-destructive font-medium pl-7"
						/>
					)}
				</Field>
			)}
		/>
	)
}
