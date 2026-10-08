import type { MetadataRoute } from "next";

import { SITE_DESCRIPTION, SITE_NAME } from "@/libs/constants/seo.constants";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: SITE_NAME,
		description: SITE_DESCRIPTION,
		start_url: "/",
		display: "standalone",
		orientation: "portrait",
		background_color: "#1F2128",
		theme_color: "#1D4ED8",
		icons: [
			{
				src: "/images/touch-icons/256x256.png",
				sizes: "256x256",
				type: "image/png",
			},
			{
				src: "/images/touch-icons/512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
	};
}
