import { useTranslations } from "next-intl";

import { DASHBOARD_ROUTES } from "./routes";
import { SidebarItem } from "./SidebarItem";

export function DashboardNav() {
	const t = useTranslations("layout.sidebar.dashboardNav");

	return (
		<div className="space-y-2 px-2 pt-4 lg:pt-0">
			{DASHBOARD_ROUTES.map(route => (
				<SidebarItem
					key={route.href}
					route={{ ...route, label: t(route.label) }}
				/>
			))}
		</div>
	);
}
