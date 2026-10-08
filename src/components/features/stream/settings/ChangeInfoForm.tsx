"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/common/select";
import { Separator } from "@/components/ui/common/separator";

import {
	type FindChannelByUsernameQuery,
	useChangeStreamInfoMutation,
	useFindAllCategoriesQuery,
} from "@/graphql/generated/output";

import {
	changeStreamInfoSchema,
	type TypeChangeStreamInfoSchema,
} from "@/schemas/stream/change-stream-info.schema";

interface ChangeInfoFormProps {
	stream: FindChannelByUsernameQuery["findChannelByUsername"]["stream"];
	onSaved?: () => void;
}

export function ChangeInfoForm({ stream, onSaved }: ChangeInfoFormProps) {
	const t = useTranslations("stream.settings.info");
	const router = useRouter();

	const { data } = useFindAllCategoriesQuery();
	const categories = data?.findAllCategories ?? [];

	const form = useForm<TypeChangeStreamInfoSchema>({
		resolver: zodResolver(changeStreamInfoSchema),
		values: {
			title: stream?.title ?? "",
			categoryId: stream?.category?.id ?? "",
		},
	});

	const [update, { loading: isLoadingUpdate }] = useChangeStreamInfoMutation({
		onCompleted() {
			router.refresh();
			onSaved?.();
			toast.success(t("successMessage"));
		},
		onError() {
			toast.error(t("errorMessage"));
		},
	});

	const { isValid } = form.formState;

	function onSubmit(data: TypeChangeStreamInfoSchema) {
		update({ variables: { data } });
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Separator className="mb-3" />
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem className="pb-3">
							<FormLabel>{t("titleLabel")}</FormLabel>
							<FormControl>
								<Input
									placeholder={t("titlePlaceholder")}
									disabled={isLoadingUpdate}
									{...field}
								/>
							</FormControl>
							<FormDescription>
								{t("titleDescription")}
							</FormDescription>
						</FormItem>
					)}
				/>
				<Separator />
				<FormField
					control={form.control}
					name="categoryId"
					render={({ field }) => (
						<FormItem className="py-3">
							<FormLabel>{t("categoryLabel")}</FormLabel>
							<Select
								onValueChange={field.onChange}
								value={field.value}
							>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue
											placeholder={t(
												"categoryPlaceholder",
											)}
										/>
									</SelectTrigger>
								</FormControl>
								<SelectContent className="p-0">
									{categories.map(category => (
										<SelectItem
											key={category.id}
											value={category.id}
										>
											{category.title}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription>
								{t("categoryDescription")}
							</FormDescription>
						</FormItem>
					)}
				/>
				<Separator />
				<div className="flex justify-end pt-5">
					<Button disabled={!isValid || isLoadingUpdate}>
						{t("submitButton")}
					</Button>
				</div>
			</form>
		</Form>
	);
}
