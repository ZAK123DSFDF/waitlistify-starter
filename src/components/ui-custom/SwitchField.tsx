// src/components/ui-custom/SwitchField.tsx
import { Controller } from "react-hook-form"
import type { Control, FieldValues, Path } from "react-hook-form"
import {
	Field,
	FieldLabel,
	FieldDescription,
	FieldError,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

type SwitchFieldProps<TFieldValues extends FieldValues> = {
	control: Control<TFieldValues>
	name: Path<TFieldValues>
	label: string
	disabled?: boolean
	description?: string
}

export const SwitchField = <TFieldValues extends FieldValues>({
	control,
	name,
	label,
	disabled = false,
	description,
}: SwitchFieldProps<TFieldValues>) => {
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
					<div className="flex items-center justify-between w-full py-2 border border-zinc-900 bg-[#09140e] px-4 rounded-xl">
						<div className="flex flex-col gap-1 pr-4 select-none">
							<FieldLabel
								htmlFor={field.name}
								className="text-sm font-medium text-zinc-200 cursor-pointer data-[disabled=true]:opacity-50 data-[invalid=true]:text-destructive"
							>
								{label}
							</FieldLabel>

							{description && (
								<FieldDescription className="text-zinc-500 text-xs">
									{description}
								</FieldDescription>
							)}
						</div>

						<Switch
							id={field.name}
							name={field.name}
							checked={field.value}
							onCheckedChange={field.onChange}
							disabled={disabled}
							aria-invalid={fieldState.invalid}
							className="data-[state=checked]:bg-[#10B981] data-[state=unchecked]:bg-zinc-800"
						/>
					</div>

					{fieldState.invalid && (
						<FieldError
							errors={[fieldState.error]}
							className="text-xs text-destructive font-medium px-2 mt-0.5"
						/>
					)}
				</Field>
			)}
		/>
	)
}
