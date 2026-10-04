"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/common/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/common/form";
import { Input } from "@/components/ui/common/input";
import { Separator } from "@/components/ui/common/separator";
import { Skeleton } from "@/components/ui/common/skeleton";
import { Textarea } from "@/components/ui/common/textarea";
import { FormWrapper } from "@/components/ui/elements/FormWrapper";

import { useChangeProfileInfoMutation } from "@/graphql/generated/output";

import { useCurrent } from "@/hooks/useCurrent";

import {
	changeInfoSchema,
	type TypeChangeInfoSchema,
} from "@/schemas/user/change-info.schema";

export function ChangeInfoForm() {
	const t = useTranslations("dashboard.settings.profile.info");

	const { user, isLoadingProfile, refetch } = useCurrent();

	const form = useForm<TypeChangeInfoSchema>({
		resolver: zodResolver(changeInfoSchema),
		values: {
			username: user?.username ?? "",
			displayName: user?.displayName ?? "",
			bio: user?.bio ?? "",
		},
	});

	const { isValid, isDirty } = form.formState;

	const [update, { loading: isLoadingUpdate }] = useChangeProfileInfoMutation(
		{
			onCompleted() {
				refetch();
				toast.success(t("successMessage"));
			},
			onError() {
				toast.error(t("errorMessage"));
			},
		},
	);

	function onSubmit(data: TypeChangeInfoSchema) {
		update({ variables: { data } });
	}

	return isLoadingProfile ? (
		<ChangeInfoFormSkeleton />
	) : (
		<FormWrapper heading={t("heading")}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="grid gap-y-5"
				>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem className="px-5">
								<FormLabel>{t("usernameLabel")}</FormLabel>
								<FormControl>
									<Input
										placeholder={t("usernamePlaceholder")}
										disabled={isLoadingUpdate}
										{...field}
									/>
								</FormControl>
								<FormDescription>
									{t("usernameDescription")}
								</FormDescription>
							</FormItem>
						)}
					/>
					<Separator />
					<FormField
						control={form.control}
						name="displayName"
						render={({ field }) => (
							<FormItem className="px-5">
								<FormLabel>{t("displayNameLabel")}</FormLabel>
								<FormControl>
									<Input
										placeholder={t(
											"displayNamePlaceholder",
										)}
										disabled={isLoadingUpdate}
										{...field}
									/>
								</FormControl>
								<FormDescription>
									{t("displayNameDescription")}
								</FormDescription>
							</FormItem>
						)}
					/>
					<Separator />
					<FormField
						control={form.control}
						name="bio"
						render={({ field }) => (
							<FormItem className="px-5">
								<FormLabel>{t("bioLabel")}</FormLabel>
								<FormControl>
									<Textarea
										placeholder={t("bioPlaceholder")}
										disabled={isLoadingUpdate}
										{...field}
									/>
								</FormControl>
								<FormDescription>
									{t("bioDescription")}
								</FormDescription>
							</FormItem>
						)}
					/>
					<Separator />
					<div className="flex justify-end px-5 pb-5">
						<Button
							disabled={!isValid || !isDirty || isLoadingUpdate}
						>
							{t("submitButton")}
						</Button>
					</div>
				</form>
			</Form>
		</FormWrapper>
	);
}

export function ChangeInfoFormSkeleton() {
	return <Skeleton className="h-96 w-full" />;
}
