import { useTranslations } from "next-intl";

import { RecommendedChannels } from "./RecommendedChannels";
import { USER_ROUTES } from "./routes";
import { SidebarItem } from "./SidebarItem";

export function UserNav() {
	const t = useTranslations("layout.sidebar.userNav");

	return (
		<div className="space-y-2 px-2 pt-4 lg:pt-0">
			{USER_ROUTES.map(route => (
				<SidebarItem
					key={route.href}
					route={{ ...route, label: t(route.label) }}
				/>
			))}
			<RecommendedChannels />
		</div>
	);
}
