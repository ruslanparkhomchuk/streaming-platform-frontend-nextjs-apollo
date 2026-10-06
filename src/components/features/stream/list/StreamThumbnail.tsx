"use client";

import Image from "next/image";

import { Card } from "@/components/ui/common/card";
import { ChannelAvatar } from "@/components/ui/elements/ChannelAvatar";
import { LiveBadge } from "@/components/ui/elements/LiveBadge";

import type { FindProfileQuery } from "@/graphql/generated/output";

import { getMediaSource } from "@/utils/get-media-source";

interface StreamThumbnailProps {
	url: string | null | undefined;
	user: Pick<
		FindProfileQuery["findProfile"],
		"username" | "avatar" | "isVerified"
	>;
	isLive?: boolean;
}

export function StreamThumbnail({ url, user, isLive }: StreamThumbnailProps) {
	return (
		<div className="group relative aspect-video cursor-pointer rounded-lg">
			<div className="absolute inset-0 flex items-center justify-center rounded-lg bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
			{url ? (
				<Image
					src={getMediaSource(url)}
					alt={user.username}
					fill
					sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
					className="rounded-lg object-cover transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2"
				/>
			) : (
				<Card className="flex h-full w-full flex-col items-center justify-center gap-y-4 rounded-lg transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
					<ChannelAvatar channel={user} isLive={isLive} />
				</Card>
			)}
			{isLive && (
				<div className="absolute top-2 right-2 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
					<LiveBadge />
				</div>
			)}
		</div>
	);
}
