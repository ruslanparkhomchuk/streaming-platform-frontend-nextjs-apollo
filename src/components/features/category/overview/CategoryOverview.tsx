import { useTranslations } from "next-intl";
import Image from "next/image";

import { Heading } from "@/components/ui/elements/Heading";

import type { FindCategoryBySlugQuery } from "@/graphql/generated/output";

import { getMediaSource } from "@/utils/get-media-source";

import { StreamsList } from "../../stream/list/StreamsList";

interface CategoryOverviewProps {
	category: FindCategoryBySlugQuery["findCategoryBySlug"];
}

export function CategoryOverview({ category }: CategoryOverviewProps) {
	const t = useTranslations("categories.overview");

	return (
		<div className="space-y-8">
			<div className="space-y-6 gap-x-6 lg:flex lg:items-center lg:space-y-0">
				<Image
					src={getMediaSource(category.thumbnailUrl)}
					alt={category.title}
					width={192}
					height={192}
					className="size-48 rounded-xl object-cover"
				/>
				<Heading
					title={category.title}
					description={category.description ?? ""}
					size="xl"
				/>
			</div>
			<StreamsList
				heading={t("heading")}
				streams={category.streams ?? []}
			/>
		</div>
	);
}
