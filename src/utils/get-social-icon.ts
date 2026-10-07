import {
	AtSign,
	CirclePlay,
	GitBranch,
	Link,
	type LucideIcon,
	MessagesSquare,
	Music,
	Send,
} from "lucide-react";

export function getSocialIcon(url: string): LucideIcon {
	switch (true) {
		case url.includes("t.me"):
			return Send;
		case url.includes("youtube.com") || url.includes("youtu.be"):
			return CirclePlay;
		case url.includes("twitter.com") || url.includes("x.com"):
			return AtSign;
		case url.includes("discord.com") || url.includes("discord.gg"):
			return MessagesSquare;
		case url.includes("tiktok.com"):
			return Music;
		case url.includes("github.com"):
			return GitBranch;
		default:
			return Link;
	}
}
