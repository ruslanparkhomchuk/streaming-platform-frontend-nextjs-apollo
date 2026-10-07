import type { FindChannelByUsernameQuery } from "@/graphql/generated/output";

import { FollowButton } from "./FollowButton";
import { SupportButton } from "./SupportButton";

interface StreamActionsProps {
	channel: FindChannelByUsernameQuery["findChannelByUsername"];
}

export function StreamActions({ channel }: StreamActionsProps) {
	return (
		<div className="mt-5 items-center space-y-4 space-x-3 lg:mt-0 lg:flex lg:space-y-0">
			<FollowButton channel={channel} />
			{channel.isVerified && !!channel.sponsorshipPlans?.length && (
				<SupportButton channel={channel} />
			)}
		</div>
	);
}
