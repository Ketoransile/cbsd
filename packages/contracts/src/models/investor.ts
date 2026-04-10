import { z } from "zod";

export const InvestorProfileSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  fullName: z.string(),
  profilePicture: z.string().optional(),
  investmentFirm: z.string().optional(),
  position: z.string().optional(),
  preferredSectors: z.array(z.enum([
    "technology", "healthcare", "agriculture", "finance", "education", 
    "retail", "manufacturing", "energy", "transportation", "other"
  ])),
  preferredStages: z.array(z.enum(["idea", "mvp", "early-revenue", "scaling"])),
  investmentRange: z.object({
    min: z.number().default(0),
    max: z.number().default(1000000),
  }),
  investmentType: z.array(z.enum(["equity", "debt", "grant", "convertible-note"])),
  yearsExperience: z.number().optional(),
  industriesExpertise: z.array(z.string()),
  previousInvestments: z.number().default(0),
  accreditationStatus: z.enum(["pending", "verified", "rejected"]).default("pending"),
  portfolioCount: z.number().default(0),
  totalInvested: z.number().default(0),
  meetingsAttended: z.number().default(0),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type InvestorProfile = z.infer<typeof InvestorProfileSchema>;
