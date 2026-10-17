// src/components/ui-custom/GenericDropdown.tsx
import * as React from "react"
import { ChevronsUpDown, type LucideIcon } from "lucide-react"
import { Link, type LinkOptions } from "@tanstack/react-router"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenuButton } from "@/components/ui/sidebar"

export type DropdownActionItem = {
	type: "action"
	label: string
	icon: LucideIcon
	onClick: () => void
}

export type DropdownLinkItem = {
	type: "link"
	label: string
	icon: LucideIcon
} & LinkOptions

export type DropdownSeparatorItem = {
	type: "separator"
	id?: string
}

type DropdownItem =
	| DropdownActionItem
	| DropdownLinkItem
	| DropdownSeparatorItem

interface GenericDropdownProps {
	triggerLabel?: string
	triggerDescription?: string
	triggerIcon?: React.ReactNode
	menuTitle?: string
	items: DropdownItem[]
	side?: "top" | "bottom" | "left" | "right"
	align?: "start" | "center" | "end"
}

export function GenericDropdown({
	triggerLabel,
	triggerDescription,
	triggerIcon,
	menuTitle,
	items,
	side = "bottom",
	align = "end",
}: GenericDropdownProps) {
	const baseId = React.useId()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<SidebarMenuButton
					size="lg"
					className="w-full h-12 rounded-xl px-2 text-zinc-300 hover:bg-zinc-900/50 hover:text-zinc-100 flex items-center justify-between transition-all data-[state=open]:bg-zinc-900/60"
				>
					<div className="flex items-center gap-2.5 overflow-hidden w-full">
						{triggerIcon && <div className="shrink-0 ">{triggerIcon}</div>}

						{(triggerLabel || triggerDescription) && (
							<div className="grid flex-1 text-left text-xs leading-tight group-data-[collapsible=icon]:hidden overflow-hidden">
								{triggerLabel && (
									<span className="truncate font-semibold text-zinc-200">
										{triggerLabel}
									</span>
								)}
								{triggerDescription && (
									<span className="truncate text-[10px] text-zinc-500 font-mono mt-0.5">
										{triggerDescription}
									</span>
								)}
							</div>
						)}
					</div>
					<ChevronsUpDown className="ml-auto h-3.5 w-3.5 text-zinc-500 shrink-0 group-data-[collapsible=icon]:hidden" />
				</SidebarMenuButton>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				className="w-56 bg-[#0b1317] border border-violet-500/10 rounded-xl text-zinc-200 shadow-xl p-1 z-[100]"
				side={side}
				align={align}
				sideOffset={12}
			>
				{menuTitle && (
					<DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 px-3 py-2">
						{menuTitle}
					</DropdownMenuLabel>
				)}

				{items.map((item, index) => {
					if (item.type === "separator") {
						return (
							<DropdownMenuSeparator
								key={item.id || `${baseId}-sep-${index}`}
								className="bg-violet-500/10 my-1 mx-1"
							/>
						)
					}

					const ItemIcon = item.icon

					if (item.type === "link") {
						const { type, label, icon, ...linkOptions } = item
						return (
							<DropdownMenuItem
								key={label}
								asChild
								className="group flex items-center gap-2 px-3 py-2 text-xs rounded-lg cursor-pointer text-zinc-300 transition-colors focus:bg-violet-600 data-highlighted:bg-violet-600"
							>
								<Link
									{...linkOptions}
									className="flex items-center gap-2 w-full"
								>
									<ItemIcon className="h-3.5 w-3.5 shrink-0 text-zinc-500 group-focus:text-white group-data-highlighted:text-white transition-colors" />
									<span className="font-medium text-zinc-500 group-focus:text-white group-data-highlighted:text-white transition-colors">
										{label}
									</span>
								</Link>
							</DropdownMenuItem>
						)
					}

					return (
						<DropdownMenuItem
							key={item.label}
							onClick={item.onClick}
							className="group flex items-center gap-2 px-3 py-2 text-xs rounded-lg cursor-pointer text-zinc-300 transition-colors focus:bg-violet-600 data-highlighted:bg-violet-600"
						>
							<ItemIcon className="h-3.5 w-3.5 shrink-0 text-zinc-500 group-focus:text-white group-data-highlighted:text-white transition-colors" />
							<span className="font-medium text-zinc-500 group-focus:text-white group-data-highlighted:text-white transition-colors">
								{item.label}
							</span>
						</DropdownMenuItem>
					)
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
