import type { PropsWithChildren } from "react";

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/common/tooltip";

interface HintProps {
	label: string;
	asChild?: boolean;
	side?: "top" | "bottom" | "left" | "right";
	align?: "start" | "center" | "end";
}

export function Hint({
	children,
	label,
	asChild,
	align,
	side,
}: PropsWithChildren<HintProps>) {
	return (
		<Tooltip delayDuration={0}>
			<TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
			<TooltipContent
				className="bg-foreground text-background"
				side={side}
				align={align}
			>
				<p className="font-semibold">{label}</p>
			</TooltipContent>
		</Tooltip>
	);
}
