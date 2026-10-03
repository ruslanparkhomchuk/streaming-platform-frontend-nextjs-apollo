import {
	Banknote,
	DollarSign,
	Folder,
	Home,
	KeyRound,
	Medal,
	MessageSquare,
	Radio,
	Settings,
	Users,
} from "lucide-react";

import type { Route } from "./route.interface";

export const DASHBOARD_ROUTES: Route[] = [
	{ label: "settings", href: "/dashboard/settings", icon: Settings },
	{ label: "keys", href: "/dashboard/keys", icon: KeyRound },
	{ label: "chatSettings", href: "/dashboard/chat", icon: MessageSquare },
	{ label: "followers", href: "/dashboard/followers", icon: Users },
	{ label: "sponsors", href: "/dashboard/sponsors", icon: Medal },
	{ label: "premium", href: "/dashboard/plans", icon: DollarSign },
	{ label: "transactions", href: "/dashboard/transactions", icon: Banknote },
];

export const USER_ROUTES: Route[] = [
	{ label: "home", href: "/", icon: Home },
	{ label: "categories", href: "/categories", icon: Folder },
	{ label: "streams", href: "/streams", icon: Radio },
];
