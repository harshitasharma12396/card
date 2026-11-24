import { z } from "zod";

export const rsvpSchema = z.object({
  name: z.string().trim().min(2, "name").max(80, "name"),
  attending: z.enum(["yes", "no"]),
  guests: z.number().int().min(1).max(10),
  message: z.string().trim().max(500).default(""),
  /** Honeypot: real guests never fill this in. The API route quietly drops requests where it is set. */
  company: z.string().max(100).default(""),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;
