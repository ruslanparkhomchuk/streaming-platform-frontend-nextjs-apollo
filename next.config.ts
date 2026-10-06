import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/libs/i18n/request.ts");

const nextConfig: NextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname:
					"streaming-platform-media.s3.eu-north-1.amazonaws.com",
			},
		],
	},
};

export default withNextIntl(nextConfig);
