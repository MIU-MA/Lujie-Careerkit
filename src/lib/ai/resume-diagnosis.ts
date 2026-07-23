import { z } from "zod";

export const resumeDiagnosisSectionSchema = z.enum([
  "summary",
  "education",
  "experiences",
  "internships",
  "projects",
  "skills",
  "awards",
  "customSections",
  "overall",
]);

export const resumeDiagnosisIssueSchema = z.object({
  id: z.string().trim().min(1).max(80),
  section: resumeDiagnosisSectionSchema,
  location: z.string().trim().min(1).max(120),
  severity: z.enum(["high", "medium", "low"]),
  category: z.enum(["action-result", "evidence", "clarity", "structure", "relevance"]),
  title: z.string().trim().min(1).max(120),
  evidence: z.string().trim().max(500),
  explanation: z.string().trim().min(1).max(600),
  suggestion: z.string().trim().min(1).max(600),
});

export const resumeDiagnosisSchema = z.object({
  summary: z.string().trim().min(1).max(800),
  strengths: z.array(z.string().trim().min(1).max(300)).max(6),
  issues: z.array(resumeDiagnosisIssueSchema).max(12),
}).refine(
  (diagnosis) => new Set(diagnosis.issues.map((issue) => issue.id)).size === diagnosis.issues.length,
  { message: "Diagnosis issue IDs must be unique.", path: ["issues"] },
);

export const resumeOptimizationPreferenceSchema = z.enum([
  "clarity",
  "impact",
  "concise",
  "ats",
]);

export type ResumeDiagnosis = z.infer<typeof resumeDiagnosisSchema>;
export type ResumeDiagnosisIssue = z.infer<typeof resumeDiagnosisIssueSchema>;
export type ResumeOptimizationPreference = z.infer<typeof resumeOptimizationPreferenceSchema>;
