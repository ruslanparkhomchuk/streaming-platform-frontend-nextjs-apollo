"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

import { Button } from "@/components/ui/common/button";

import { useAuth } from "@/hooks/useAuth";

export function HeaderMenu() {
	const t = useTranslations("layout.headerMenu");
	const { isAuthenticated } = useAuth();

	return (
		<div className="ml-auto flex items-center gap-x-4">
			{isAuthenticated ? (
				<div>ProfileMenu</div>
			) : (
				<>
					<Button variant="secondary" asChild>
						<Link href="/account/login">{t("login")}</Link>
					</Button>
					<Button asChild>
						<Link href="/account/create">{t("register")}</Link>
					</Button>
				</>
			)}
		</div>
	);
}
