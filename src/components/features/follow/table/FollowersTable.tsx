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
	type FindMyFollowersQuery,
	useFindMyFollowersQuery,
} from "@/graphql/generated/output";

import { useFormatDate } from "@/hooks/useFormatDate";

export function FollowersTable() {
	const t = useTranslations("dashboard.followers");

	const formatDate = useFormatDate();

	const { data, loading: isLoadingFollowers } = useFindMyFollowersQuery();
	const followers = data?.findMyFollowers ?? [];

	const followersColumns: ColumnDef<
		FindMyFollowersQuery["findMyFollowers"][0]
	>[] = [
		{
			accessorKey: "createdAt",
			header: t("columns.date"),
			cell: ({ row }) => formatDate(row.original.createdAt),
		},
		{
			accessorKey: "follower",
			header: t("columns.user"),
			cell: ({ row }) => {
				const follower = row.original.follower;

				if (!follower) {
					return null;
				}

				return (
					<div className="flex items-center gap-x-2">
						<ChannelAvatar channel={follower} size="sm" />
						<h2>{follower.username}</h2>
						{follower.isVerified && <ChannelVerified size="sm" />}
					</div>
				);
			},
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
					<DropdownMenuContent
						side="right"
						align="end"
						className="w-max"
					>
						<DropdownMenuItem asChild>
							<Link
								href={`/${row.original.follower?.username}`}
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
				{isLoadingFollowers ? (
					<DataTableSkeleton />
				) : (
					<DataTable columns={followersColumns} data={followers} />
				)}
			</div>
		</div>
	);
}
