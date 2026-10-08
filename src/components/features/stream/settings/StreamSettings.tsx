"use client";

import { Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Button } from "@/components/ui/common/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/common/dialog";

import type { FindChannelByUsernameQuery } from "@/graphql/generated/output";

import { useCurrent } from "@/hooks/useCurrent";

import { ChangeInfoForm } from "./ChangeInfoForm";
import { ChangeThumbnailForm } from "./ChangeThumbnailForm";

interface StreamSettingsProps {
	channel: FindChannelByUsernameQuery["findChannelByUsername"];
}

export function StreamSettings({ channel }: StreamSettingsProps) {
	const t = useTranslations("stream.settings");

	const [isOpen, setIsOpen] = useState(false);

	const { user } = useCurrent();

	const isOwnerChannel = user?.id === channel.id;

	if (!isOwnerChannel) {
		return null;
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" size="icon-lg">
					<Pencil className="size-5" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-lg font-semibold">
						{t("heading")}
					</DialogTitle>
				</DialogHeader>
				<ChangeThumbnailForm stream={channel.stream} />
				<ChangeInfoForm
					stream={channel.stream}
					onSaved={() => setIsOpen(false)}
				/>
			</DialogContent>
		</Dialog>
	);
}
