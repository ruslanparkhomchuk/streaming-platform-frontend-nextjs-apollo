"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/common/button";
import { Skeleton } from "@/components/ui/common/skeleton";
import { ChannelAvatar } from "@/components/ui/elements/ChannelAvatar";
import { ChannelVerified } from "@/components/ui/elements/ChannelVerified";
import { Hint } from "@/components/ui/elements/Hint";
import { LiveBadge } from "@/components/ui/elements/LiveBadge";

import type { FindRecommendedChannelsQuery } from "@/graphql/generated/output";

import { useSidebar } from "@/hooks/useSidebar";

import { cn } from "@/utils/tw-merge";

interface ChannelItemProps {
	channel: FindRecommendedChannelsQuery["findRecommendedChannels"][0];
}

export function ChannelItem({ channel }: ChannelItemProps) {
	const pathname = usePathname();
	const { isCollapsed } = useSidebar();

	const isActive = pathname === `/${channel.username}`;
	const isLive = channel.stream?.isLive ?? false;

	return isCollapsed ? (
		<Hint label={channel.username} side="right" asChild>
			<Link
				href={`/${channel.username}`}
				className="mt-3 flex w-full items-center justify-center"
			>
				<ChannelAvatar channel={channel} isLive={isLive} />
			</Link>
		</Hint>
	) : (
		<Button
			className={cn(
				"relative h-11 w-full justify-start",
				isActive && "bg-accent",
			)}
			variant="ghost"
			asChild
		>
			<Link
				href={`/${channel.username}`}
				className="flex w-full min-w-0 items-center"
			>
				<ChannelAvatar size="sm" channel={channel} isLive={isLive} />
				<h2 className="truncate pr-2 pl-3">{channel.username}</h2>
				{channel.isVerified && <ChannelVerified size="sm" />}
				{isLive && (
					<div className="ml-auto shrink-0 pl-2">
						<LiveBadge />
					</div>
				)}
			</Link>
		</Button>
	);
}

export function ChannelItemSkeleton() {
	return <Skeleton className="mt-3 h-11 w-full rounded-full" />;
}
