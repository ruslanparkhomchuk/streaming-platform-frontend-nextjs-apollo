"use client";

import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/common/button";
import { Input } from "@/components/ui/common/input";

export function Search() {
	const t = useTranslations("layout.header.search");

	const [searchTerm, setSearchTerm] = useState("");
	const router = useRouter();

	function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (searchTerm.trim()) {
			router.push(
				`/streams?searchTerm=${encodeURIComponent(searchTerm.trim())}`,
			);
		} else {
			router.push("/streams");
		}
	}

	return (
		<div className="ml-auto hidden lg:block">
			<form className="relative flex items-center" onSubmit={onSubmit}>
				<Input
					placeholder={t("placeholder")}
					type="text"
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					className="w-full rounded-full pr-10 pl-4 lg:w-[400px]"
				/>
				<Button
					className="absolute right-0 size-9 rounded-full"
					size="icon"
					type="submit"
				>
					<SearchIcon className="size-4" />
				</Button>
			</form>
		</div>
	);
}
