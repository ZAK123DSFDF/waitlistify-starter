// src/components/ui-custom/CustomAreaChart.tsx
import type * as React from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts"
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"

interface CustomAreaChartProps {
	title: string
	subtitle?: string
	badgeText?: string
	/** Right-aligned action slot for buttons, tabs, or indicators */
	actions?: React.ReactNode
	data: any[]
	xAxisKey: string
	dataKey: string
	chartConfig: ChartConfig
	gradientId?: string
	isLoading?: boolean
	yAxisFormatter?: (value: any) => string
}

export function CustomAreaChart({
	title,
	subtitle,
	badgeText,
	actions,
	data,
	xAxisKey,
	dataKey,
	chartConfig,
	gradientId = "customChartGradient",
	isLoading = false,
	yAxisFormatter,
}: CustomAreaChartProps) {
	return (
		<div className="w-full p-5 rounded-2xl border border-zinc-800 bg-zinc-900/10 flex flex-col justify-between min-h-[380px]">
			<div className="flex items-start justify-between mb-6 gap-4">
				<div className="space-y-0.5">
					<span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
						{title}
					</span>
					{subtitle && <p className="text-[10px] text-zinc-500">{subtitle}</p>}
				</div>

				{/* Actions slot or legacy fallback badge */}
				<div className="flex items-center gap-2 shrink-0">
					{actions
						? actions
						: badgeText && (
								<span className="text-[10px] text-emerald-400 font-medium px-2 py-0.5 rounded-full bg-emerald-500/5 border border-emerald-500/10">
									{badgeText}
								</span>
							)}
				</div>
			</div>

			{isLoading ? (
				<div className="h-[280px] w-full flex items-end gap-3 pt-6 pb-2">
					<Skeleton className="h-[40%] w-full bg-violet-500/10 rounded-md" />
					<Skeleton className="h-[65%] w-full bg-violet-500/10 rounded-md" />
					<Skeleton className="h-[35%] w-full bg-violet-500/10 rounded-md" />
					<Skeleton className="h-[80%] w-full bg-violet-500/15 rounded-md" />
					<Skeleton className="h-[50%] w-full bg-violet-500/10 rounded-md" />
					<Skeleton className="h-[90%] w-full bg-violet-500/15 rounded-md" />
					<Skeleton className="h-[70%] w-full bg-violet-500/10 rounded-md" />
				</div>
			) : (
				<ChartContainer
					config={chartConfig}
					className="min-h-[280px] w-full text-xs"
				>
					<AreaChart
						accessibilityLayer
						data={data}
						margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
					>
						<defs>
							<linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor={`var(--color-${dataKey})`}
									stopOpacity={0.25}
								/>
								<stop
									offset="95%"
									stopColor={`var(--color-${dataKey})`}
									stopOpacity={0}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid
							strokeDasharray="3 3"
							stroke="#18181b"
							vertical={false}
						/>
						<XAxis
							dataKey={xAxisKey}
							stroke="#52525b"
							fontSize={10}
							tickLine={false}
							axisLine={false}
							dy={10}
						/>
						<YAxis
							stroke="#52525b"
							fontSize={10}
							tickLine={false}
							axisLine={false}
							tickFormatter={yAxisFormatter}
						/>
						<ChartTooltip content={<ChartTooltipContent indicator="line" />} />
						<Area
							type="monotone"
							dataKey={dataKey}
							stroke={`var(--color-${dataKey})`}
							strokeWidth={2}
							fillOpacity={1}
							fill={`url(#${gradientId})`}
						/>
					</AreaChart>
				</ChartContainer>
			)}
		</div>
	)
}
