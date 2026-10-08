"use client";

import { useEffect, useState } from "react";

import {
	type FindChannelByUsernameQuery,
	type FindChatMessagesByStreamQuery,
	useChatMessageAddedSubscription,
	useFindChatMessagesByStreamQuery,
	useFindSponsorsByChannelQuery,
} from "@/graphql/generated/output";

import { MessageItem } from "./MessageItem";

interface MessagesListProps {
	channel: FindChannelByUsernameQuery["findChannelByUsername"];
}

export function MessagesList({ channel }: MessagesListProps) {
	const streamId = channel.stream?.id ?? "";

	const { data } = useFindChatMessagesByStreamQuery({
		variables: {
			streamId,
		},
	});

	const { data: sponsorsData } = useFindSponsorsByChannelQuery({
		variables: {
			channelId: channel.id,
		},
	});
	const sponsors = sponsorsData?.findSponsorsByChannel ?? [];

	const sponsorIds = new Set(sponsors.map(sponsor => sponsor.user?.id));

	const [messages, setMessages] = useState<
		FindChatMessagesByStreamQuery["findChatMessagesByStream"]
	>([]);

	const { data: newMessageData } = useChatMessageAddedSubscription({
		variables: {
			streamId,
		},
	});

	useEffect(() => {
		if (data && data.findChatMessagesByStream) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setMessages(data.findChatMessagesByStream);
		}
	}, [data]);

	useEffect(() => {
		if (newMessageData) {
			const newMessage = newMessageData.chatMessageAdded;

			// eslint-disable-next-line react-hooks/set-state-in-effect
			setMessages(prev => [newMessage, ...prev]);
		}
	}, [newMessageData]);

	return (
		<div className="flex h-full flex-1 flex-col-reverse overflow-y-auto">
			{messages.map(message => (
				<MessageItem
					key={message.id}
					message={message}
					isSponsor={sponsorIds.has(message.user?.id)}
				/>
			))}
		</div>
	);
}
