"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { Button } from "@/components/ui/common/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/common/dropdown-menu";
import { ChannelAvatar } from "@/components/ui/elements/ChannelAvatar";
import { ChannelVerified } from "@/components/ui/elements/ChannelVerified";
import {
	DataTable,
	DataTableSkeleton,
} from "@/components/ui/elements/DataTable";
import { Heading } from "@/components/ui/elements/Heading";

import {
	type FindMySponsorsQuery,
	useFindMySponsorsQuery,
} from "@/graphql/generated/output";

import { useFormatDate } from "@/hooks/useFormatDate";

export function SponsorsTable() {
	const t = useTranslations("dashboard.sponsors");
	const formatDate = useFormatDate();

	const { data, loading: isLoadingSponsors } = useFindMySponsorsQuery();
	const sponsors = data?.findMySponsors ?? [];

	const sponsorsColumns: ColumnDef<
		FindMySponsorsQuery["findMySponsors"][0]
	>[] = [
		{
			accessorKey: "expiresAt",
			header: t("columns.date"),
			cell: ({ row }) => formatDate(row.original.expiresAt),
		},
		{
			accessorKey: "user",
			header: t("columns.user"),
			cell: ({ row }) => {
				const user = row.original.user;

				if (!user) {
					return null;
				}

				return (
					<div className="flex items-center gap-x-2">
						<ChannelAvatar channel={user} size="sm" />
						<h2>{user.username}</h2>
						{user.isVerified && <ChannelVerified size="sm" />}
					</div>
				);
			},
		},
		{
			accessorKey: "plan",
			header: t("columns.plan"),
			cell: ({ row }) => row.original.plan?.title,
		},
		{
			accessorKey: "actions",
			header: t("columns.actions"),
			cell: ({ row }) => (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="size-8 p-0">
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent side="right" className="w-max">
						<DropdownMenuItem asChild>
							<Link
								href={`/${row.original.user?.username}`}
								target="_blank"
							>
								<User className="mr-2 size-4" />
								{t("columns.viewChannel")}
							</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			),
		},
	];

	return (
		<div className="lg:px-10">
			<Heading
				title={t("header.heading")}
				description={t("header.description")}
				size="lg"
			/>
			<div className="mt-5">
				{isLoadingSponsors ? (
					<DataTableSkeleton />
				) : (
					<DataTable columns={sponsorsColumns} data={sponsors} />
				)}
			</div>
		</div>
	);
}
