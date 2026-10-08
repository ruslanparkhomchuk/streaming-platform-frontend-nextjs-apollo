"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/common/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
} from "@/components/ui/common/form";
import { Textarea } from "@/components/ui/common/textarea";
import { EmojiPicker } from "@/components/ui/elements/EmojiPicker";

import {
	type FindChannelByUsernameQuery,
	useSendChatMessageMutation,
} from "@/graphql/generated/output";

import {
	sendMessageSchema,
	type TypeSendMessageSchema,
} from "@/schemas/chat/send-message.schema";

interface SendMessageFormProps {
	channel: FindChannelByUsernameQuery["findChannelByUsername"];
	isDisabled: boolean;
}

export function SendMessageForm({ channel, isDisabled }: SendMessageFormProps) {
	const t = useTranslations("stream.chat.sendMessage");

	const form = useForm<TypeSendMessageSchema>({
		resolver: zodResolver(sendMessageSchema),
		defaultValues: {
			text: "",
		},
	});

	const [send, { loading: isLoadingSend }] = useSendChatMessageMutation({
		onError() {
			toast.error(t("errorMessage"));
		},
	});

	const { isValid } = form.formState;

	function onSubmit(data: TypeSendMessageSchema) {
		if (!channel.stream) {
			return;
		}

		send({
			variables: {
				data: {
					text: data.text,
					streamId: channel.stream.id,
				},
			},
		});
		form.reset();
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="mt-3 flex items-center gap-x-4"
			>
				<FormField
					control={form.control}
					name="text"
					render={({ field }) => (
						<FormItem className="min-w-0 flex-1">
							<FormControl>
								<div className="relative">
									<Textarea
										placeholder={t("placeholder")}
										rows={1}
										onKeyDown={e => {
											if (
												e.key === "Enter" &&
												!e.shiftKey
											) {
												e.preventDefault();
												form.handleSubmit(onSubmit)();
											}
										}}
										className="min-h-[40px] resize-none pr-8 wrap-anywhere"
										disabled={isDisabled || isLoadingSend}
										{...field}
									/>
									<div className="absolute top-1/2 right-2 -translate-y-1/2">
										<EmojiPicker
											onChange={(emoji: string) =>
												field.onChange(
													`${field.value} ${emoji}`,
												)
											}
											isDisabled={
												isDisabled || isLoadingSend
											}
										/>
									</div>
								</div>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button
					size="icon-lg"
					type="submit"
					disabled={isDisabled || !isValid || isLoadingSend}
				>
					<SendHorizontal className="size-4" />
				</Button>
			</form>
		</Form>
	);
}
