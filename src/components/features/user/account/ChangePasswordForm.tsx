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
import { FormWrapper } from "@/components/ui/elements/FormWrapper";

import { useChangePasswordMutation } from "@/graphql/generated/output";

import { useCurrent } from "@/hooks/useCurrent";

import {
	changePasswordSchema,
	type TypeChangePasswordSchema,
} from "@/schemas/user/change-password.schema";

export function ChangePasswordForm() {
	const t = useTranslations("dashboard.settings.account.password");

	const { isLoadingProfile, refetch } = useCurrent();

	const form = useForm<TypeChangePasswordSchema>({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			oldPassword: "",
			newPassword: "",
		},
	});

	const [update, { loading: isLoadingUpdate }] = useChangePasswordMutation({
		onCompleted() {
			form.reset();
			refetch();
			toast.success(t("successMessage"));
		},
		onError() {
			toast.error(t("errorMessage"));
		},
	});

	const { isValid } = form.formState;

	function onSubmit(data: TypeChangePasswordSchema) {
		update({ variables: { data } });
	}

	return isLoadingProfile ? (
		<ChangePasswordFormSkeleton />
	) : (
		<FormWrapper heading={t("heading")}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="grid gap-y-5"
				>
					<FormField
						control={form.control}
						name="oldPassword"
						render={({ field }) => (
							<FormItem className="px-5">
								<FormLabel>{t("oldPasswordLabel")}</FormLabel>
								<FormControl>
									<Input
										placeholder="********"
										type="password"
										disabled={isLoadingUpdate}
										{...field}
									/>
								</FormControl>
								<FormDescription>
									{t("oldPasswordDescription")}
								</FormDescription>
							</FormItem>
						)}
					/>
					<Separator />
					<FormField
						control={form.control}
						name="newPassword"
						render={({ field }) => (
							<FormItem className="px-5">
								<FormLabel>{t("newPasswordLabel")}</FormLabel>
								<FormControl>
									<Input
										placeholder="********"
										type="password"
										disabled={isLoadingUpdate}
										{...field}
									/>
								</FormControl>
								<FormDescription>
									{t("newPasswordDescription")}
								</FormDescription>
							</FormItem>
						)}
					/>
					<Separator />
					<div className="flex justify-end px-5 pb-5">
						<Button disabled={!isValid || isLoadingUpdate}>
							{t("submitButton")}
						</Button>
					</div>
				</form>
			</Form>
		</FormWrapper>
	);
}

export function ChangePasswordFormSkeleton() {
	return <Skeleton className="h-96 w-full" />;
}
