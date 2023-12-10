import * as z from "zod";

export const contactUsSchema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(5).max(1000),
});

export type ContactUsFormSchema = z.infer<typeof contactUsSchema>;
