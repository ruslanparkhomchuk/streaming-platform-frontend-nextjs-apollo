import { z } from "zod";

export const changeStreamInfoSchema = z.object({
	title: z.string().min(1),
	categoryId: z.string(),
});

export type TypeChangeStreamInfoSchema = z.infer<typeof changeStreamInfoSchema>;
