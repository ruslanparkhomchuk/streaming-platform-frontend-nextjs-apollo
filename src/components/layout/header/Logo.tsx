import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export function Logo() {
	const t = useTranslations("layout.logo");

	return (
		<Link
			href="/"
			className="flex items-center gap-x-4 transition-opacity hover:opacity-75"
		>
			<Image
				src="/images/logo.svg"
				alt="Streaming Platform"
				width={52}
				height={35}
				className="h-[35px] w-auto"
			/>
			<div className="hidden leading-tight lg:block">
				<h2 className="text-lg font-semibold tracking-wider text-accent-foreground">
					Streaming Platform
				</h2>
				<p className="text-sm text-muted-foreground">{t("platform")}</p>
			</div>
		</Link>
	);
}
