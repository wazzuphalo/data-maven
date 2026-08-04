import { z } from "zod";

// `company` is a honeypot — real users never see or fill this field. Any
// non-empty value marks the submission as spam without a CAPTCHA.
const honeypot = z.string().max(0).optional().or(z.literal(""));

export const contactFormSchema = z.object({
  type: z.literal("contact"),
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Enter a valid email address").max(320),
  businessName: z.string().trim().max(200).optional().default(""),
  phone: z.string().trim().max(40).optional().default(""),
  message: z.string().trim().max(4000).optional().default(""),
  company: honeypot,
});

export const miniAuditLeadSchema = z.object({
  type: z.literal("mini-audit"),
  email: z.string().trim().email("Enter a valid email address").max(320),
  businessName: z.string().trim().min(1, "Business name is required").max(200),
  city: z.string().trim().min(1, "City is required").max(120),
  industry: z.string().trim().min(1).max(120),
  overallScore: z.number().int().min(0).max(100),
  weakestLenses: z.array(z.string()).max(6),
  company: honeypot,
});

export const formSubmissionSchema = z.discriminatedUnion("type", [
  contactFormSchema,
  miniAuditLeadSchema,
]);

export type ContactFormPayload = z.infer<typeof contactFormSchema>;
export type MiniAuditLeadPayload = z.infer<typeof miniAuditLeadSchema>;
export type FormSubmissionPayload = z.infer<typeof formSubmissionSchema>;
