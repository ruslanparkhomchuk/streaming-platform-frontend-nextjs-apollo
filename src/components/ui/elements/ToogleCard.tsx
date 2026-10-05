import type { PropsWithChildren } from "react";

import { Skeleton } from "@/components/ui/common/skeleton";
import { Switch } from "@/components/ui/common/switch";
import { CardContainer } from "@/components/ui/elements/CardContainer";

interface ToggleCardProps {
	heading: string;
	description: string;
	isDisabled?: boolean;
	value: boolean;
	onChange: (value: boolean) => void;
}

export function ToggleCard({
	children,
	heading,
	description,
	isDisabled,
	value,
	onChange,
}: PropsWithChildren<ToggleCardProps>) {
	return (
		<CardContainer
			heading={heading}
			description={description}
			rightContent={
				<Switch
					checked={value}
					onCheckedChange={onChange}
					disabled={isDisabled}
					className="data-[state=unchecked]:bg-muted-foreground/30"
				/>
			}
		/>
	);
}

export function ToggleCardSkeleton() {
	return <Skeleton className="mt-6 h-20 w-full" />;
}
