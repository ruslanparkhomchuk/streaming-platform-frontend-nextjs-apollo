"use client";

import { LiveKitRoom } from "@livekit/components-react";

import type { FindChannelByUsernameQuery } from "@/graphql/generated/output";

import { LIVEKIT_WS_URL } from "@/libs/constants/url.constants";

interface StreamOverviewProps {
	channel: FindChannelByUsernameQuery["findChannelByUsername"];
}

export function StreamOverview({ channel }: StreamOverviewProps) {
	return (
		<LiveKitRoom
			token={""}
			serverUrl={LIVEKIT_WS_URL}
			className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 lg:grid-cols-7"
		>
			<div className="order-1 col-span-1 flex flex-col lg:col-span-5">
				Player
			</div>
			<div className="order-2 col-span-1 flex h-80 flex-col space-y-6 lg:col-span-2">
				Chat
			</div>
		</LiveKitRoom>
	);
}
