import type { PropsWithChildren } from "react";

import { TooltipProvider as UITooltipProvider } from "@/components/ui/common/tooltip";

export function TooltipProvider({ children }: PropsWithChildren<unknown>) {
	return <UITooltipProvider>{children}</UITooltipProvider>;
}
