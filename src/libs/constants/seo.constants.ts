import type { Metadata } from "next";

export const SITE_NAME = "Streaming Platform";

export const SITE_DESCRIPTION =
	"Streaming Platform is a live streaming platform that connects streamers and viewers. Share your passions and join the Streaming Platform community!";

export const SITE_KEYWORDS = [
	"Streaming Platform",
	"live streaming platform",
	"streaming",
	"live streams",
	"viewer interaction",
	"video content",
	"online community",
];

export const NO_INDEX_PAGE = {
	robots: { index: false, follow: false },
} satisfies Metadata;
