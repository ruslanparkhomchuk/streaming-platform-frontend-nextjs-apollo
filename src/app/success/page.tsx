import { CircleCheck } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/common/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/common/card";

import { convertPrice } from "@/utils/convert-price";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("success");

	return {
		title: t("heading"),
		robots: {
			index: false,
			follow: false,
		},
	};
}

export default async function SuccessPage(props: {
	searchParams: Promise<{
		price?: string;
		username?: string;
	}>;
}) {
	const t = await getTranslations("success");

	const searchParams = await props.searchParams;

	if (!searchParams.price || !searchParams.username) {
		redirect("/");
	}

	return (
		<div className="flex min-h-screen items-center justify-center">
			<Card className="w-full max-w-2xl">
				<CardHeader className="text-center">
					<div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
						<CircleCheck className="size-10 text-primary" />
					</div>
					<CardTitle className="text-3xl font-bold">
						{t("heading")}
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="rounded-lg bg-muted p-4">
						<h3 className="mb-2 font-semibold">
							{t("details.heading")}
						</h3>
						<ul className="space-y-2">
							<li className="flex items-center">
								<span>
									{t("details.price")}{" "}
									{convertPrice(Number(searchParams.price))}
								</span>
							</li>
							<li className="flex items-center">
								<span>
									{t("details.duration")}{" "}
									{t("details.oneMonth")}
								</span>
							</li>
							<li className="flex items-center">
								<span>
									{t("details.channel")}{" "}
									{searchParams.username}
								</span>
							</li>
						</ul>
					</div>
					<p className="text-center text-muted-foreground">
						{t("congratulations")}
					</p>
				</CardContent>
				<CardFooter className="flex flex-col space-y-4">
					<div className="flex w-full gap-x-4">
						<Button asChild className="flex-1">
							<Link href="/">{t("backToHome")}</Link>
						</Button>
						<Button asChild variant="secondary" className="flex-1">
							<Link href={`/${searchParams.username}`}>
								{t("backToChannel")}
							</Link>
						</Button>
					</div>
					<p className="text-center text-sm text-muted-foreground">
						{t("support")}
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
