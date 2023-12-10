import { z } from "zod";

export const accountFormSchema = z.object({
  name: z
    .string({
      required_error: "Required.",
    })
    .min(2, "Name must be at least 2 characters.")
    .max(30, "Name must not be longer than 30 characters"),
});

export type AccountFormSchema = typeof accountFormSchema;
