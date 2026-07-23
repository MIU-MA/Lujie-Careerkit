import { z } from "zod";

import { parseJsonRequest } from "@/lib/api-request";
import { optimizeResumeWithAI } from "@/lib/ai-service";
import {
  resumeDiagnosisSchema,
  resumeOptimizationPreferenceSchema,
} from "@/lib/ai/resume-diagnosis";
import { resumeContentInputSchema } from "@/lib/resume-content";
import { buildResumeDisplayName } from "@/lib/resume-naming";
import { createResumeVersion, getTailoringBaseResume } from "@/lib/repository";

const schema = z.object({
  resumeVersionId: z.string().trim().min(1).max(200).optional(),
  resumeContent: resumeContentInputSchema.optional(),
  diagnosis: resumeDiagnosisSchema.optional(),
  selectedIssueIds: z.array(z.string().trim().min(1).max(80)).max(12).optional(),
  preferences: z.array(resumeOptimizationPreferenceSchema).max(4).optional(),
  additionalDirection: z.string().trim().max(1_000).optional(),
  locale: z.enum(["zh-CN", "en"]).optional(),
}).superRefine((input, context) => {
  if (!input.diagnosis) return;
  const issueIds = new Set(input.diagnosis.issues.map((issue) => issue.id));
  if (!input.selectedIssueIds?.length) {
    context.addIssue({ code: "custom", message: "Select at least one diagnosis issue.", path: ["selectedIssueIds"] });
    return;
  }
  if (input.selectedIssueIds.some((issueId) => !issueIds.has(issueId))) {
    context.addIssue({ code: "custom", message: "Selected diagnosis issue was not found.", path: ["selectedIssueIds"] });
  }
});

export function GET() {
  return new Response(null, { status: 204 });
}

export async function POST(request: Request) {
  const parsed = await parseJsonRequest(request, schema);
  if (!parsed.success) return parsed.response;
  const input = parsed.data;
  const baseResume = await getTailoringBaseResume({
    resumeVersionId: input.resumeVersionId,
    resumeContent: input.resumeContent,
  });
  const optimized = await optimizeResumeWithAI({
    resume: baseResume,
    diagnosis: input.diagnosis,
    selectedIssueIds: input.selectedIssueIds,
    preferences: input.preferences,
    additionalDirection: input.additionalDirection,
    locale: input.locale,
  });
  if (optimized.source !== "ai") {
    return Response.json({ message: optimized.message }, { status: 503 });
  }
  const meta = optimized.meta ?? {
    company: "",
    title: "",
    keywords: [],
    summary: "",
    changes: [],
    versionName: "",
  };

  const version = await createResumeVersion({
    name: meta.versionName || `AI优化-${buildResumeDisplayName(baseResume, "未命名简历")}`,
    summary: meta.summary || "AI 自动优化生成的简历版本，请在编辑器中复核后使用。",
    content: optimized.data,
    baseResume,
    optimizationMeta: meta,
  });

  return Response.json({
    version,
    optimization: meta,
    source: "ai",
    message: optimized.message,
  });
}
