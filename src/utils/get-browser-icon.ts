import { CircleHelp, Compass, Globe, type LucideIcon } from "lucide-react";

export function getBrowserIcon(browser: string): LucideIcon {
	switch (browser.toLowerCase()) {
		case "safari":
			return Compass;
		case "chrome":
		case "firefox":
		case "edge":
		case "microsoft edge":
		case "opera":
			return Globe;
		default:
			return CircleHelp;
	}
}
