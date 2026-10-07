import { useTranslations } from "next-intl";
import Link from "next/link";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/common/card";
import { Skeleton } from "@/components/ui/common/skeleton";

import type { FindChannelByUsernameQuery } from "@/graphql/generated/output";

import { getSocialIcon } from "@/utils/get-social-icon";

interface AboutChannelProps {
	channel: FindChannelByUsernameQuery["findChannelByUsername"];
}

export function AboutChannel({ channel }: AboutChannelProps) {
	const t = useTranslations("stream.aboutChannel");

	return (
		<Card className="mt-6">
			<CardHeader>
				<CardTitle className="text-xl">
					{t("heading")} {channel.displayName}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="text-[15px] text-foreground">
					<span className="font-semibold">
						{channel.followers?.length ?? 0}
					</span>{" "}
					{t("followersCount")}
				</div>
				<div className="text-[15px] text-muted-foreground">
					{channel.bio ?? t("noDescription")}
				</div>
				{channel.socialLinks?.length ? (
					<div className="flex flex-wrap gap-x-4 gap-y-1">
						{channel.socialLinks.map(socialLink => {
							const Icon = getSocialIcon(socialLink.url);

							return (
								<Link
									key={socialLink.id}
									href={socialLink.url}
									className="flex items-center gap-x-1.5 text-[15px] hover:text-primary"
									target="_blank"
								>
									<Icon className="size-4" />
									{socialLink.title}
								</Link>
							);
						})}
					</div>
				) : null}
			</CardContent>
		</Card>
	);
}

export function AboutChannelSkeleton() {
	return <Skeleton className="mt-6 h-36 w-full rounded-xl" />;
}
