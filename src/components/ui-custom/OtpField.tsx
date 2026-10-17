// src/components/ui-custom/OtpField.tsx
import { Controller } from "react-hook-form"
import type { Control, FieldValues, Path } from "react-hook-form"
import {
	Field,
	FieldLabel,
	FieldDescription,
	FieldError,
} from "@/components/ui/field"
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp"

type OtpFieldProps<TFieldValues extends FieldValues> = {
	control: Control<TFieldValues>
	name: Path<TFieldValues>
	label: string
	description?: string
	disabled?: boolean
	maxLength?: number
}

export const OtpField = <TFieldValues extends FieldValues>({
	control,
	name,
	label,
	description,
	disabled = false,
	maxLength = 6,
}: OtpFieldProps<TFieldValues>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Field
					data-invalid={fieldState.invalid}
					className="w-full flex flex-col items-center justify-center gap-2"
				>
					<FieldLabel
						htmlFor={field.name}
						className="text-sm font-medium text-zinc-300 data-[invalid=true]:text-destructive self-start"
					>
						{label}
					</FieldLabel>

					<div className="flex justify-center w-full py-2">
						<InputOTP
							id={field.name}
							maxLength={maxLength}
							disabled={disabled}
							value={field.value}
							onChange={field.onChange}
							aria-invalid={fieldState.invalid}
						>
							<InputOTPGroup>
								<InputOTPSlot
									index={0}
									className="bg-[#060F0A] text-zinc-100 border-zinc-800 data-[active=true]:border-[#10B981] data-[active=true]:ring-1 data-[active=true]:ring-[#10B981]"
								/>
								<InputOTPSlot
									index={1}
									className="bg-[#060F0A] text-zinc-100 border-zinc-800 data-[active=true]:border-[#10B981] data-[active=true]:ring-1 data-[active=true]:ring-[#10B981]"
								/>
								<InputOTPSlot
									index={2}
									className="bg-[#060F0A] text-zinc-100 border-zinc-800 data-[active=true]:border-[#10B981] data-[active=true]:ring-1 data-[active=true]:ring-[#10B981]"
								/>
							</InputOTPGroup>

							<InputOTPSeparator className="text-zinc-700" />

							<InputOTPGroup>
								<InputOTPSlot
									index={3}
									className="bg-[#060F0A] text-zinc-100 border-zinc-800 data-[active=true]:border-[#10B981] data-[active=true]:ring-1 data-[active=true]:ring-[#10B981]"
								/>
								<InputOTPSlot
									index={4}
									className="bg-[#060F0A] text-zinc-100 border-zinc-800 data-[active=true]:border-[#10B981] data-[active=true]:ring-1 data-[active=true]:ring-[#10B981]"
								/>
								<InputOTPSlot
									index={5}
									className="bg-[#060F0A] text-zinc-100 border-zinc-800 data-[active=true]:border-[#10B981] data-[active=true]:ring-1 data-[active=true]:ring-[#10B981]"
								/>
							</InputOTPGroup>
						</InputOTP>
					</div>

					{description && (
						<FieldDescription className="text-zinc-500 text-xs self-start">
							{description}
						</FieldDescription>
					)}

					{fieldState.invalid && (
						<FieldError
							errors={[fieldState.error]}
							className="text-xs text-destructive font-medium mt-0.5 self-start"
						/>
					)}
				</Field>
			)}
		/>
	)
}
