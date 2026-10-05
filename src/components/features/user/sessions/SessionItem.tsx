import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/components/ui/common/button";
import { CardContainer } from "@/components/ui/elements/CardContainer";
import { ConfirmModal } from "@/components/ui/elements/ConfirmModal";

import {
	useFindSessionsByUserQuery,
	useRemoveSessionMutation,
} from "@/graphql/generated/output";
import type { FindSessionsByUserQuery } from "@/graphql/generated/output";

import { getBrowserIcon } from "@/utils/get-browser-icon";

import { SessionModal } from "./SessionModal";

interface SessionItemProps {
	session: FindSessionsByUserQuery["findSessionsByUser"][0];
	isCurrentSession?: boolean;
}

export function SessionItem({ session, isCurrentSession }: SessionItemProps) {
	const t = useTranslations("dashboard.settings.sessions.sessionItem");

	const { refetch } = useFindSessionsByUserQuery();

	const [remove, { loading: isLoadingRemove }] = useRemoveSessionMutation({
		onCompleted() {
			refetch();
			toast.success(t("successMessage"));
		},
		onError() {
			toast.error(t("errorMessage"));
		},
	});

	const Icon = getBrowserIcon(session.metadata.device.browser);

	return (
		<CardContainer
			heading={`${session.metadata.device.browser}, ${session.metadata.device.os}`}
			description={`${session.metadata.location.country}, ${session.metadata.location.city}`}
			icon={Icon}
			rightContent={
				<div className="flex items-center gap-x-4">
					{!isCurrentSession && (
						<ConfirmModal
							heading={t("confirmModal.heading")}
							message={t("confirmModal.message")}
							onConfirm={() =>
								remove({ variables: { id: session.id } })
							}
						>
							<Button
								variant="secondary"
								disabled={isLoadingRemove}
							>
								{t("deleteButton")}
							</Button>
						</ConfirmModal>
					)}
					<SessionModal session={session}>
						<Button>{t("detailsButton")}</Button>
					</SessionModal>
				</div>
			}
		/>
	);
}
