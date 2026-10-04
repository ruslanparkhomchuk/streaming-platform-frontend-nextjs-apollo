import { z } from "zod";

export const deactivateAccountSchema = z.object({
	email: z.email(),
	password: z.string().min(8),
	pin: z.string().optional(),
});

export type TypeDeactivateAccountSchema = z.infer<
	typeof deactivateAccountSchema
>;
