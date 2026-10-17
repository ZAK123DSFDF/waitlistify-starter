// src/components/ui-custom/TableSearchInput.tsx
import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface TableSearchInputProps {
	onSearch: (value: string) => void
	placeholder?: string
	buttonLabel?: string
	defaultValue?: string
	className?: string
}

export function TableSearchInput({
	onSearch,
	placeholder = "Search...",
	buttonLabel = "Search",
	defaultValue = "",
	className = "",
}: TableSearchInputProps) {
	const [value, setValue] = useState(defaultValue)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		onSearch(value)
	}

	return (
		<form onSubmit={handleSubmit} className={`flex-1 flex gap-2 ${className}`}>
			<div className="relative flex-1">
				<Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
				<Input
					type="text"
					placeholder={placeholder}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					className="h-8 pl-8 text-xs bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-violet-600 focus-visible:ring-offset-0"
				/>
			</div>
			<Button
				type="submit"
				size="sm"
				className="h-8 px-3 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-xs text-zinc-300 gap-1.5"
			>
				{buttonLabel}
			</Button>
		</form>
	)
}
