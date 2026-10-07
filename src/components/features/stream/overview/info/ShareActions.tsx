"use client";

import { Share } from "lucide-react";
import { useTranslations } from "next-intl";
import {
	RedditIcon,
	RedditShareButton,
	TelegramIcon,
	TelegramShareButton,
	TwitterShareButton,
	WhatsappIcon,
	WhatsappShareButton,
	XIcon,
} from "react-share";

import { Button } from "@/components/ui/common/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/common/popover";

import type { FindChannelByUsernameQuery } from "@/graphql/generated/output";

interface ShareActionsProps {
	channel: FindChannelByUsernameQuery["findChannelByUsername"];
}

export function ShareActions({ channel }: ShareActionsProps) {
	const t = useTranslations("stream.actions.share");

	const shareUrl =
		typeof window !== "undefined"
			? `${window.location.origin}/${channel.username}`
			: "";

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" size="icon-lg">
					<Share className="size-5" />
				</Button>
			</PopoverTrigger>
			<PopoverContent side="top" className="w-[300px]">
				<h2 className="font-medium">{t("heading")}</h2>
				<div className="grid grid-cols-4 gap-3">
					<TelegramShareButton url={shareUrl} className="w-full">
						<div className="flex aspect-square w-full items-center justify-center rounded-md bg-sky-500 transition-transform hover:-translate-y-1.5">
							<TelegramIcon
								size={36}
								bgStyle={{ fill: "transparent" }}
							/>
						</div>
					</TelegramShareButton>
					<TwitterShareButton url={shareUrl} className="w-full">
						<div className="flex aspect-square w-full items-center justify-center rounded-md bg-black transition-transform hover:-translate-y-1.5">
							<XIcon
								size={36}
								bgStyle={{ fill: "transparent" }}
							/>
						</div>
					</TwitterShareButton>
					<WhatsappShareButton url={shareUrl} className="w-full">
						<div className="flex aspect-square w-full items-center justify-center rounded-md bg-green-500 transition-transform hover:-translate-y-1.5">
							<WhatsappIcon
								size={36}
								bgStyle={{ fill: "transparent" }}
							/>
						</div>
					</WhatsappShareButton>
					<RedditShareButton url={shareUrl} className="w-full">
						<div className="flex aspect-square w-full items-center justify-center rounded-md bg-orange-600 transition-transform hover:-translate-y-1.5">
							<RedditIcon
								size={36}
								bgStyle={{ fill: "transparent" }}
							/>
						</div>
					</RedditShareButton>
				</div>
			</PopoverContent>
		</Popover>
	);
}
