"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/components/ui/common/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/common/dropdown-menu";
import {
	DataTable,
	DataTableSkeleton,
} from "@/components/ui/elements/DataTable";
import { Heading } from "@/components/ui/elements/Heading";

import {
	type FindMySponsorshipPlansQuery,
	useFindMySponsorshipPlansQuery,
	useRemoveSponsorshipPlanMutation,
} from "@/graphql/generated/output";

import { useCurrent } from "@/hooks/useCurrent";
import { useFormatDate } from "@/hooks/useFormatDate";

import { convertPrice } from "@/utils/convert-price";

import { CreatePlanForm } from "../forms/CreatePlanForm";

import { VerifiedChannelAlert } from "./VerifiedChannelAlert";

export function PlansTable() {
	const t = useTranslations("dashboard.plans");

	const { user } = useCurrent();

	const { data, loading: isLoadingPlans } = useFindMySponsorshipPlansQuery();
	const plans = data?.findMySponsorshipPlans ?? [];

	const formatDate = useFormatDate();

	const plansColumns: ColumnDef<
		FindMySponsorshipPlansQuery["findMySponsorshipPlans"][0]
	>[] = [
		{
			accessorKey: "createdAt",
			header: t("columns.date"),
			cell: ({ row }) => formatDate(row.original.createdAt),
		},
		{
			accessorKey: "title",
			header: t("columns.title"),
			cell: ({ row }) => row.original.title,
		},
		{
			accessorKey: "price",
			header: t("columns.price"),
			cell: ({ row }) => convertPrice(row.original.price),
		},
		{
			accessorKey: "actions",
			header: t("columns.actions"),
			cell: ({ row }) => <PlanActions planId={row.original.id} />,
		},
	];

	return user?.isVerified ? (
		<div className="lg:px-10">
			<div className="block items-center justify-between space-y-3 lg:flex lg:space-y-0">
				<Heading
					title={t("header.heading")}
					description={t("header.description")}
					size="lg"
				/>
				<CreatePlanForm />
			</div>
			<div className="mt-5">
				{isLoadingPlans ? (
					<DataTableSkeleton />
				) : (
					<DataTable columns={plansColumns} data={plans} />
				)}
			</div>
		</div>
	) : (
		<VerifiedChannelAlert />
	);
}

function PlanActions({ planId }: { planId: string }) {
	const t = useTranslations("dashboard.plans");

	const { refetch } = useFindMySponsorshipPlansQuery();

	const [remove, { loading: isLoadingRemove }] =
		useRemoveSponsorshipPlanMutation({
			onCompleted() {
				refetch();
				toast.success(t("columns.successMessage"));
			},
			onError() {
				toast.error(t("columns.removeMessage"));
			},
		});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="size-8 p-0">
					<MoreHorizontal className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent side="right" className="w-max">
				<DropdownMenuItem
					variant="destructive"
					onClick={() => remove({ variables: { planId } })}
					disabled={isLoadingRemove}
				>
					<Trash className="mr-2 size-4" />
					{t("columns.remove")}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
