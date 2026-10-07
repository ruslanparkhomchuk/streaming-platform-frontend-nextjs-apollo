"use client";

import { Medal } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/common/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/common/dialog";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/common/tabs";

import {
	type FindChannelByUsernameQuery,
	useFindSponsorsByChannelQuery,
	useMakePaymentMutation,
} from "@/graphql/generated/output";

import { useAuth } from "@/hooks/useAuth";
import { useCurrent } from "@/hooks/useCurrent";

import { convertPrice } from "@/utils/convert-price";

interface SupportButtonProps {
	channel: FindChannelByUsernameQuery["findChannelByUsername"];
}

export function SupportButton({ channel }: SupportButtonProps) {
	const t = useTranslations("stream.actions.support");
	const router = useRouter();

	const { isAuthenticated } = useAuth();
	const { user, isLoadingProfile } = useCurrent();

	const { data, loading: isLoadingSponsors } = useFindSponsorsByChannelQuery({
		variables: {
			channelId: channel.id,
		},
	});
	const sponsors = data?.findSponsorsByChannel;

	const [makePayment, { loading: isLoadingMakePayment }] =
		useMakePaymentMutation({
			onCompleted(data) {
				router.push(data.makePayment.url);
			},
			onError() {
				toast.error(t("errorMessage"));
			},
		});

	const isSponsor = user
		? sponsors?.some(sponsor => sponsor.user?.id === user.id)
		: false;
	const isOwnerChannel = user?.id === channel.id;

	if (isOwnerChannel || isLoadingProfile || isLoadingSponsors) {
		return null;
	}

	if (isSponsor) {
		return (
			<Button variant="secondary" disabled>
				<Medal className="size-4" />
				{t("alreadySponsor")}
			</Button>
		);
	}

	const plans = channel.sponsorshipPlans ?? [];

	return isAuthenticated ? (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary">
					<Medal className="size-4" />
					{t("supportAuthor")}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<Tabs defaultValue={plans[0]?.id}>
					<TabsList className="mb-1">
						{plans.map(plan => (
							<TabsTrigger key={plan.id} value={plan.id}>
								{plan.title}
							</TabsTrigger>
						))}
					</TabsList>
					{plans.map(plan => (
						<TabsContent key={plan.id} value={plan.id}>
							<DialogTitle className="text-2xl">
								{convertPrice(plan.price)} {t("perMonth")}
							</DialogTitle>
							{plan.description && (
								<DialogDescription className="mt-2 text-sm">
									{plan.description}
								</DialogDescription>
							)}
							<Button
								onClick={() =>
									makePayment({
										variables: { planId: plan.id },
									})
								}
								disabled={isLoadingMakePayment}
								className="mt-3 w-full"
							>
								{t("choose")}
							</Button>
						</TabsContent>
					))}
				</Tabs>
			</DialogContent>
		</Dialog>
	) : (
		<Button
			onClick={() => router.push("/account/login")}
			variant="secondary"
		>
			<Medal className="size-4" />
			{t("supportAuthor")}
		</Button>
	);
}
