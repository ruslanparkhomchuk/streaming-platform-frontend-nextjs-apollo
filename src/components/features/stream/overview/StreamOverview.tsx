"use client";

import { LiveKitRoom } from "@livekit/components-react";

import type { FindChannelByUsernameQuery } from "@/graphql/generated/output";

import { useStreamToken } from "@/hooks/useStreamToken";

import { LIVEKIT_WS_URL } from "@/libs/constants/url.constants";

import { AboutChannel, AboutChannelSkeleton } from "./info/AboutChannel";
import { ChannelSponsors } from "./info/ChannelSponsors";
import { StreamInfo, StreamInfoSkeleton } from "./info/StreamInfo";
import { StreamVideo, StreamVideoSkeleton } from "./player/StreamVideo";

interface StreamOverviewProps {
	channel: FindChannelByUsernameQuery["findChannelByUsername"];
}

export function StreamOverview({ channel }: StreamOverviewProps) {
	const { token, name, identity } = useStreamToken(channel.id);

	if (!token || !name || !identity) {
		return <StreamOverviewSkeleton />;
	}

	return (
		<LiveKitRoom
			token={token}
			serverUrl={LIVEKIT_WS_URL}
			className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]"
		>
			<div className="order-1 flex flex-col">
				<StreamVideo channel={channel} />
				<StreamInfo channel={channel} />
				<AboutChannel channel={channel} />
				<ChannelSponsors channel={channel} />
			</div>
			<div className="order-2 flex h-80 flex-col space-y-6">Chat</div>
		</LiveKitRoom>
	);
}

export function StreamOverviewSkeleton() {
	return (
		<div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
			<div className="order-1 flex flex-col">
				<StreamVideoSkeleton />
				<StreamInfoSkeleton />
				<AboutChannelSkeleton />
			</div>
			<div className="order-2 flex h-80 flex-col space-y-6"></div>
		</div>
	);
}
