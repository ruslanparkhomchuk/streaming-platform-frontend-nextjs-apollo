"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/common/card";
import { ChannelAvatar } from "@/components/ui/elements/ChannelAvatar";

import {
	type FindChannelByUsernameQuery,
	useFindSponsorsByChannelQuery,
} from "@/graphql/generated/output";

interface ChannelSponsorsProps {
	channel: FindChannelByUsernameQuery["findChannelByUsername"];
}

export function ChannelSponsors({ channel }: ChannelSponsorsProps) {
	const t = useTranslations("stream.sponsors");

	const { data, loading: isLoadingSponsors } = useFindSponsorsByChannelQuery({
		variables: {
			channelId: channel.id,
		},
	});
	const sponsors = data?.findSponsorsByChannel ?? [];

	if (!sponsors.length || isLoadingSponsors) {
		return null;
	}

	return (
		<Card className="mt-6">
			<CardHeader>
				<CardTitle className="text-xl">
					{t("heading")} for {channel.displayName}
				</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-cols-12">
				{sponsors.map(
					sponsor =>
						sponsor.user && (
							<Link
								key={sponsor.id}
								href={`/${sponsor.user.username}`}
							>
								<ChannelAvatar channel={sponsor.user} />
							</Link>
						),
				)}
			</CardContent>
		</Card>
	);
}
