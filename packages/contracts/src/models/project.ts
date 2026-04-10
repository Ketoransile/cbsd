import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string().optional(),
  entrepreneurId: z.string(),
  title: z.string(),
  summary: z.string().max(3000).default(""),
  sector: z.enum([
    "technology", "healthcare", "fintech", "education", "agriculture",
    "energy", "real_estate", "manufacturing", "retail", "other"
  ]).default("other"),
  stage: z.enum(["mvp", "early-revenue", "scaling"]).default("mvp"),
  targetAmount: z.number().min(0).nullable().optional(),
  currency: z.string().default("USD"),
  problem: z.object({
    statement: z.string().default(""),
    targetMarket: z.string().default(""),
    marketSize: z.string().default(""),
  }),
  solution: z.object({
    description: z.string().default(""),
    uniqueValue: z.string().default(""),
    competitiveAdvantage: z.string().default(""),
  }),
  businessModel: z.object({
    revenueStreams: z.string().default(""),
    pricingStrategy: z.string().default(""),
    customerAcquisition: z.string().default(""),
  }),
  financials: z.object({
    currentRevenue: z.string().default(""),
    projectedRevenue: z.string().default(""),
    burnRate: z.string().default(""),
    runway: z.string().default(""),
  }),
  aiScore: z.number().min(0).max(100).optional(),
  currentStep: z.number().min(1).max(6).default(1),
  status: z.enum([
    "draft", "submitted", "under_review", "approved", "rejected",
    "suspended", "matched", "closed"
  ]).default("draft"),
  reviewNotes: z.string().nullable().optional(),
  submittedAt: z.date().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
