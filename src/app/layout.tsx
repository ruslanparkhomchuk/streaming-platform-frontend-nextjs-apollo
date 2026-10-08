import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Inter } from "next/font/google";

import {
	SITE_DESCRIPTION,
	SITE_KEYWORDS,
	SITE_NAME,
} from "@/libs/constants/seo.constants";
import { APP_URL } from "@/libs/constants/url.constants";

import { ApolloClientProvider } from "@/providers/ApolloClientProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import { TooltipProvider } from "@/providers/TooltipProvider";

import "@/styles/globals.css";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
	metadataBase: new URL(APP_URL),
	applicationName: SITE_NAME,
	title: {
		absolute: SITE_NAME,
		template: `%s - ${SITE_NAME}`,
	},
	description: SITE_DESCRIPTION,
	authors: [
		{
			name: "Ruslan",
			url: new URL("https://github.com/ruslanparkhomchuk"),
		},
	],
	keywords: SITE_KEYWORDS,
	generator: "Next.js",
	creator: "Ruslan",
	publisher: "Ruslan",
	icons: {
		icon: "/images/favicon.ico",
		shortcut: "/images/favicon.ico",
		apple: "/images/touch-icons/256x256.png",
		other: {
			rel: "icon",
			url: "/images/touch-icons/256x256.png",
			sizes: "256x256",
			type: "image/png",
		},
	},
	openGraph: {
		title: SITE_NAME,
		description: SITE_DESCRIPTION,
		type: "website",
		locale: "en_US",
		alternateLocale: ["uk_UA"],
		images: [
			{
				url: "/images/touch-icons/512x512.png",
				width: 512,
				height: 512,
				alt: SITE_NAME,
			},
		],
		url: new URL(APP_URL),
	},
	twitter: {
		card: "summary",
		title: SITE_NAME,
		description: SITE_DESCRIPTION,
		images: [
			{
				url: "/images/touch-icons/512x512.png",
				width: 512,
				height: 512,
				alt: SITE_NAME,
			},
		],
	},
};
export default async function RootLayout({ children }: LayoutProps<"/">) {
	const locale = await getLocale();
	const messages = await getMessages();

	return (
		<html
			lang={locale}
			className={`${inter.variable} h-full antialiased`}
			data-scroll-behavior="smooth"
			suppressHydrationWarning
		>
			<body>
				<ApolloClientProvider>
					<NextIntlClientProvider messages={messages}>
						<ThemeProvider
							attribute="class"
							defaultTheme="dark"
							disableTransitionOnChange
						>
							<TooltipProvider>
								{children}
								<ToastProvider />
							</TooltipProvider>
						</ThemeProvider>
					</NextIntlClientProvider>
				</ApolloClientProvider>
			</body>
		</html>
	);
}
