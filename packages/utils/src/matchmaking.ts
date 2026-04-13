import type { InvestorProfile, Project } from "@repo/contracts";

export interface MatchScore {
  score: number;
  reasons: string[];
}

export function calculateMatch(investor: InvestorProfile, project: Project): MatchScore {
  let score = 0;
  const reasons: string[] = [];

  // Stage match
  if (investor.preferredStages.includes(project.stage)) {
    score += 40;
    reasons.push("Stage match");
  }

  // Sector match
  if ((investor.preferredSectors as string[]).includes(project.sector)) {
    score += 40;
    reasons.push("Sector match");
  }

  // Range match
  if (project.targetAmount && project.targetAmount >= investor.investmentRange.min && project.targetAmount <= investor.investmentRange.max) {
    score += 20;
    reasons.push("Investment range match");
  }

  return { score, reasons };
}
