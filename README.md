<p align="center">
  <img src="public/brand/lujie-mark.svg" alt="LuJie CareerKit mark" width="72" />
</p>

<h1 align="center">LuJie CareerKit</h1>

<p align="center">
  <strong>An AI-powered career workspace from resume editing to offer acceptance, covering resume editing, JD matching, application tracking, mock interviews, and review.</strong>
</p>
<p align="center">
  English · <a href="README.zh-CN.md">简体中文</a>
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs" />
  <img alt="React" src="https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white" />
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-6-2d3748?logo=prisma" />
  <img alt="SQLite" src="https://img.shields.io/badge/SQLite-local--data-044a64?logo=sqlite" />
  <img alt="Docker Image" src="https://github.com/Chozzc/Lujie-Careerkit/actions/workflows/docker-image.yml/badge.svg" />
  <img alt="License" src="https://img.shields.io/badge/license-Apache--2.0-blue" />
</p>

<p align="center">
  <img src="public/brand/lujie-cover_16x9.png" alt="LuJie CareerKit cover" width="900" />
</p>

## Overview

LuJie CareerKit is built for internships, campus recruiting, and career job searches. It brings resume editing, job-description matching, application tracking, interview preparation, mock practice, and AI review into one AI-powered career workspace. You can maintain different resume versions for different roles, use job descriptions to generate resume wording and role-specific interview prep guides that better match role requirements, track every application, and keep refining knowledge, answers, feedback, and review notes.

## Online Preview

Try the live preview at [https://lujie.chozzc.dev](https://lujie.chozzc.dev).

## Preview

| **Control Center** | **Resume Library** |
| --- | --- |
| ![Control Center](public/images/01-dashboard.png) | ![Resume Library](public/images/02-resume-library.png) |
| **Resume Editor** | **JD Matching** |
| ![Resume Editor](public/images/03-resume-editor.png) | ![JD Matching](public/images/04-jd-match.png) |
| **JD-Optimized Resume** | **Interview Assistant** |
| ![JD-Optimized Resume](public/images/05-jd-optimized-resume.png) | ![Interview Assistant](public/images/06-interview-assistant.png) |
| **Mock Interview** | **AI Review** |
| ![Mock Interview](public/images/07-mock-interview.png) | ![AI Review](public/images/08-ai-review.png) |
| **Application Tracking** | **Pipeline Status** |
| ![Application Tracking](public/images/09-application-pipeline.png) | ![Pipeline Status](public/images/10-pipeline-status.png) |

## Highlights

- **Structured resume editing**: maintain multiple resume versions, create an independent copy of any resume for experimental edits, edit education, internship, project, skill, and custom sections, switch templates and themes, and export PDF, PNG, or editable DOCX files.
- **AI resume analysis**: diagnose action-result structure, evidence, clarity, and organization first; let the user choose which issues and directions to address; then create an independent optimized version while preserving the original.
- **Cover letters and recruiter greetings**: combine the current resume, a complete JD, and user-provided availability details to generate a formal cover letter or a concise recruiter-chat opener, then edit, copy, or regenerate the result.
- **JD matching**: paste a complete JD with the company, full role title, requirements, and responsibilities, then let AI diagnose evidence, reorder emphasis, improve wording, and save a role-specific version without inventing experience.
- **Role-specific interview prep**: combine a selected resume with a complete JD to generate and save a guide with an overview, capability profile, evidence gaps, core knowledge, experience deep dives, targeted questions, and a preparation plan.
- **Application tracking**: record companies, roles, sources, stages, deadlines, follow-up dates, notes, JD text, and linked resume versions.
- **Mock interviews and review**: generate interview questions from a resume and JD, save answer drafts, and create an AI review report you can revisit.
- **Data and privacy controls**: resumes, jobs, applications, interview prep guides, mock sessions, and settings are stored in a local SQLite database for long-term personal use.

## Data and Privacy

- Resume content, resume versions, jobs, applications, interview prep guides, mock sessions, and settings are stored in `prisma/dev.db`.
- API keys are configured from the in-app Settings page. They are encrypted before being saved to SQLite.
- `LUJIE_SETTINGS_SECRET` is the local encryption secret for saved AI keys. Use a long random value in `.env.local`.

## Quick Start

### Requirements

- Node.js 20.9 or later
- npm
- Chrome or Edge for the best browser speech experience

### Docker Deployment (Recommended)

```bash
docker run -d --name lujie-careerkit \
  -p 3000:3000 \
  -v lujie-data:/data \
  -e LUJIE_SETTINGS_SECRET="replace-with-a-long-random-string" \
  ghcr.io/chozzc/lujie-careerkit:latest
```

Open [http://localhost:3000](http://localhost:3000). SQLite data is stored in the Docker volume `lujie-data`. API keys are configured from the in-app Settings page.

`LUJIE_SETTINGS_SECRET` encrypts locally saved settings secrets. Replace the example value with a long random string.

Use `latest` to follow the newest `main` build. After v0.2.3 is published, use `v0.2.3` to pin that release.

### Local Development

```bash
git clone https://github.com/Chozzc/Lujie-Careerkit.git
cd Lujie-Careerkit
npm ci
```

Create a local environment file and generate an encryption secret:

```bash
cp .env.example .env.local
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Put the generated value into `.env.local` as `LUJIE_SETTINGS_SECRET`, then start the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app creates the local schema and demo workflow data on first use.

## Environment Variables

```env
DATABASE_URL="file:./dev.db"
LUJIE_SETTINGS_SECRET="change-me-to-a-long-random-string"
OPENAI_BASE_URL="https://dashscope.aliyuncs.com/compatible-mode/v1"
OPENAI_MODEL="qwen3.6-flash"
```

`OPENAI_BASE_URL` and `OPENAI_MODEL` only set first-run defaults. Configure the actual API key from the in-app Settings page.

## AI Provider Setup

1. Open the Settings page in the app.
2. Choose an OpenAI-compatible provider.
3. Enter the Base URL, model name, and API key.
4. Save and run the connection test.

AI features stay disabled until the settings are saved and the connection test succeeds.

## Release Notes

### v0.2.3

#### AI resume analysis

- Renamed the resume-editor action from “AI Optimize Resume” to “Analyze resume.” AI first reads the sanitized current editor content and returns a diagnosis overview, existing strengths, and concrete issues without modifying or replacing the original resume.
- STAR is used only as a diagnostic aid to check whether actions, methods, and results are clear. The analysis does not produce a mechanical overall score or fake STAR completion rate, and returns at most 12 issues tied to a resume section and source evidence.
- Issues are grouped into collapsible “Address first,” “Recommended,” and “Optional improvement” sections. Important issues are selected by default, while users can inspect the reason and suggestion before changing the selection.

#### User-controlled optimization

- Users can choose clarity, impact, concision, or ATS readability and add optional instructions to correct the diagnosis, limit the scope, or specify the desired tone.
- AI changes only the selected issues and cannot expand the scope on its own, invent experience, skills, metrics, or results, or treat missing resume evidence as proof that the candidate lacks a capability.
- Confirmation creates an independent optimized version while preserving the original. Diagnosis controls are locked during generation, and both analysis and optimization validate request input, sanitized snapshots, and structured model output.

### v0.2.2

#### Cover letters and recruiter greetings

- Added a Cover Letter action between “Create copy” and “Export” in the resume editor. It uses the current unsaved editor content and a complete JD, so users do not need to save first.
- Cover letters target recruiting-post messages, email, and formal applications with a courteous, complete, role-specific structure. Recruiter greetings target direct-chat platforms such as Boss Zhipin and lead with availability, internship duration, weekly attendance, and the strongest matching evidence.
- Users can add factual availability, graduation, and motivation details, then edit, copy, or regenerate the output. Each writing mode keeps its own generated result.

#### Truthfulness and privacy

- Start date, internship duration, and weekly attendance are used only when the user explicitly provides them. Requirements found only in the JD are never presented as candidate capabilities.
- AI requests continue to remove email addresses, phone numbers, personal links, logos, editor settings, and internal optimization metadata, with bounded input and schema-validated output.

### v0.2.1

#### Resume copies and version maintenance

- Create an independent copy from the resume library or editor and continue editing it immediately. The original stays unchanged, and the new copy does not inherit application, job, or interview links.
- Copies preserve all resume content, sections, templates, and themes. Repeated copies are named “Copy”, “Copy 2”, and so on to avoid ambiguity.
- Copies created from resumes optimized after AI analysis retain all optimized content while removing internal optimization snapshots and job links, making them ordinary, independently maintained resume versions.

#### Resume stability

- Fixed skill categories being merged or duplicated after saving, reopening, or reordering the flattened skill list.

## FAQ

### 1. Do I need an API key to use it?

No. Resume editing and application tracking work locally. AI features such as JD matching, interview prep guides, mock interviews, and AI review require an API key from an OpenAI-compatible provider.

### 2. Where is my data stored?

By default, data is stored on your machine in `prisma/dev.db`. This is local runtime data and should not be committed to GitHub.

### 3. How are Dashboard metrics calculated?

- **Applications**: roles that have entered the application tracking board, excluding JD matching drafts that have not been submitted.
- **Active flows**: roles still in progress, including applied, assessment, and interview stages.
- **Due follow-ups**: active flows only. LuJie first uses the manually set next follow-up date; applied roles without one use seven days after applying as the suggested follow-up date; assessment and interview roles use the current stage date.
- **Offers**: roles marked as Offer.

### 4. What is `LUJIE_SETTINGS_SECRET`?

It is the local encryption secret used to encrypt API keys saved in SQLite. If you change it, API keys already saved in the old database may no longer decrypt, so you may need to save the key again in Settings.

### 5. Can I use another model provider?

Yes. Any OpenAI-compatible provider can be configured by entering its Base URL, model name, and API key in Settings.

## Project Structure

```text
.github/workflows/      GitHub Actions workflows, including GHCR image publishing
Dockerfile              Production container image definition
docker-compose.yml      Local Docker startup with persistent SQLite volume
prisma/                 Prisma schema and local SQLite runtime data
src/app/                Next.js pages and API routes
src/components/         Workspace, resume, interview, and shared UI
src/hooks/              Browser hooks such as speech recognition
src/lib/                Repository, AI, export, parsing, and domain logic
src/stores/             Resume editor state
src/types/              Shared TypeScript declarations
public/brand/           Brand mark and cover assets
public/images/          README screenshots
third-party/            Third-party license notices
```

## Credits

The resume editor reuses and adapts design ideas and implementation concepts from [JadeAI](https://github.com/LingyiChen-AI/JadeAI). JadeAI is licensed under Apache License 2.0; a copy is kept in `third-party/JadeAI-LICENSE.txt`.

## License

LuJie CareerKit is released under the [Apache License 2.0](LICENSE). Third-party notices are listed in [NOTICE](NOTICE).
