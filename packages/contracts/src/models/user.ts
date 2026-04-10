import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().optional(),
  firebaseUid: z.string(),
  email: z.string().email(),
  fullName: z.string(),
  photoURL: z.string().nullable().optional(),
  role: z.enum(["entrepreneur", "investor", "admin"]),
  adminLevel: z.enum(["super_admin", "admin"]).nullable().optional(),
  status: z.enum(["unverified", "pending", "verified", "suspended"]).default("unverified"),
  kycRejectionReason: z.string().nullable().optional(),
  isActive: z.boolean().default(true),
  emailVerified: z.boolean().default(false),
  lastLoginAt: z.date().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;
