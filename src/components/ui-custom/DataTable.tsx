// src/components/ui-custom/DataTable.tsx
import { type LucideIcon, ChevronLeft, ChevronRight } from "lucide-react"
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
	type RowData,
} from "@tanstack/react-table"

// Shadcn UI Imports
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useMemo } from "react"

interface DataTableProps<TData extends RowData, TValue = unknown> {
	title: string
	badgeText?: string
	badgeIcon?: LucideIcon
	/** Pass single or multiple buttons/actions for the top-right region */
	actions?: React.ReactNode
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	pageSize?: number
	isLoading?: boolean
	manualPagination?: boolean
	pageCount?: number
	currentPage?: number
	onPageChange?: (page: number) => void
}

export function DataTable<TData extends RowData, TValue = unknown>({
	title,
	badgeText,
	badgeIcon: BadgeIcon,
	actions,
	columns,
	data,
	pageSize = 5,
	isLoading = false,
	manualPagination = false,
	pageCount,
	currentPage,
	onPageChange,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: manualPagination
			? undefined
			: getPaginationRowModel(),
		manualPagination,
		pageCount,
		state:
			manualPagination && currentPage !== undefined
				? {
						pagination: {
							pageIndex: currentPage - 1,
							pageSize,
						},
					}
				: undefined,
		initialState: !manualPagination
			? {
					pagination: {
						pageSize,
					},
				}
			: undefined,
	})
	const skeletonRows = useMemo(
		() => Array.from({ length: pageSize }, (_, i) => `sk-row-${i + 1}`),
		[pageSize],
	)

	const activePageIndex =
		manualPagination && currentPage !== undefined
			? currentPage
			: table.getState().pagination.pageIndex + 1
	const activePageCount =
		manualPagination && pageCount !== undefined
			? pageCount
			: table.getPageCount()
	const canPrev =
		manualPagination && currentPage !== undefined
			? currentPage > 1
			: table.getCanPreviousPage()
	const canNext =
		manualPagination && currentPage !== undefined && pageCount !== undefined
			? currentPage < pageCount
			: table.getCanNextPage()

	const handlePrevClick = () => {
		if (manualPagination && onPageChange && currentPage !== undefined) {
			onPageChange(currentPage - 1)
		} else {
			table.previousPage()
		}
	}

	const handleNextClick = () => {
		if (manualPagination && onPageChange && currentPage !== undefined) {
			onPageChange(currentPage + 1)
		} else {
			table.nextPage()
		}
	}

	return (
		<div className="p-5 rounded-2xl border border-violet-500/15 bg-transparent space-y-4">
			{/* Top Header Region */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
					{title}
				</span>

				{/* Header Actions Slot (Supports Multiple Buttons or Badges) */}
				<div className="flex items-center gap-2 shrink-0">
					{actions
						? actions
						: badgeText && (
								<div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
									{BadgeIcon && <BadgeIcon className="h-3 w-3" />}
									<span>{badgeText}</span>
								</div>
							)}
				</div>
			</div>

			{/* Table Element Content Frame */}
			<div className="overflow-x-auto rounded-xl border border-zinc-900 bg-zinc-950/40">
				<Table className="text-xs">
					<TableHeader className="bg-zinc-900/20 hover:bg-zinc-900/20 border-b border-zinc-900">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow
								key={headerGroup.id}
								className="border-b border-zinc-900 hover:bg-transparent"
							>
								{headerGroup.headers.map((header) => (
									<TableHead
										key={header.id}
										className="p-3 text-zinc-400 font-medium h-auto"
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody className="divide-y divide-zinc-900 text-zinc-300">
						{isLoading ? (
							skeletonRows.map((rowKey) => (
								<TableRow
									key={rowKey}
									className="border-b border-zinc-900 hover:bg-transparent"
								>
									{table.getAllColumns().map((column) => (
										<TableCell key={`${rowKey}-${column.id}`} className="p-3">
											<Skeleton className="h-4 w-full bg-zinc-800/60 rounded" />
										</TableCell>
									))}
								</TableRow>
							))
						) : table.getRowModel().rows.length > 0 ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									className="border-b border-zinc-900 hover:bg-zinc-900/10 transition-colors"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className="p-3">
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow className="hover:bg-transparent">
								<TableCell
									colSpan={columns.length}
									className="p-8 text-center text-zinc-500 font-medium border-none"
								>
									No records matching criteria found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{/* Dynamic Unified Pagination Controls Row Footer */}
			<div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1">
				<div>
					{isLoading ? (
						<Skeleton className="h-4 w-24 bg-zinc-800/60 rounded" />
					) : (
						<>
							Page{" "}
							<span className="font-medium text-zinc-300">
								{activePageIndex}
							</span>{" "}
							of{" "}
							<span className="font-medium text-zinc-300">
								{activePageCount || 1}
							</span>
						</>
					)}
				</div>
				<div className="flex items-center gap-1.5">
					<Button
						variant="outline"
						size="icon"
						onClick={handlePrevClick}
						disabled={!canPrev || isLoading}
						className="h-7 w-7 rounded-lg border border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
					>
						<ChevronLeft className="h-3.5 w-3.5" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						onClick={handleNextClick}
						disabled={!canNext || isLoading}
						className="h-7 w-7 rounded-lg border border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
					>
						<ChevronRight className="h-3.5 w-3.5" />
					</Button>
				</div>
			</div>
		</div>
	)
}
