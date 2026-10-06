"use client";

import Image from "next/image";
import Link from "next/link";

import type { FindRandomCategoriesQuery } from "@/graphql/generated/output";

import { useSidebar } from "@/hooks/useSidebar";

import { getMediaSource } from "@/utils/get-media-source";
import { cn } from "@/utils/tw-merge";

interface CategoryCardProps {
	category: FindRandomCategoriesQuery["findRandomCategories"][0];
}

export function CategoryCard({ category }: CategoryCardProps) {
	const { isCollapsed } = useSidebar();

	return (
		<Link
			href={`/categories/${category.slug}`}
			className="h-full w-full space-y-3"
		>
			<div
				className={cn(
					"group relative cursor-pointer rounded-xl",
					isCollapsed ? "h-60" : "h-52",
				)}
			>
				<div className="absolute inset-0 flex items-center justify-center rounded-xl bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
				<Image
					src={getMediaSource(category.thumbnailUrl)}
					alt={category.title}
					fill
					sizes="(min-width: 1280px) 15vw, (min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
					className="rounded-xl object-cover transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2"
				/>
			</div>
			<div>
				<h2 className="truncate text-base font-semibold text-foreground hover:text-primary">
					{category.title}
				</h2>
			</div>
		</Link>
	);
}
