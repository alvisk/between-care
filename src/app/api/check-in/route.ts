import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CheckInRequest = {
  message?: unknown;
  glucose?: unknown;
  sleep?: unknown;
  steps?: unknown;
};

type CheckInResult = {
  summary: string;
  planDrift: "low" | "moderate" | "high";
  evidence: string[];
  approvedAction: {
    title: string;
    rationale: string;
    followUpMinutes: number;
  };
  escalate: boolean;
  handoff: string;
  safety: string;
};

const urgentPhrases = [
  "chest pain",
  "cannot breathe",
  "can't breathe",
  "severe breathlessness",
  "passed out",
  "fainted",
  "unconscious",
  "new confusion",
];

const allowedActions = [
  "Take the clinician-approved 10-minute walk after lunch, if you feel able.",
  "Use the clinician-approved five-minute seated movement fallback, then check in again.",
  "Pause adaptation and ask the care team to review the trend.",
] as const;

function numberInRange(value: unknown, fallback: number, min: number, max: number) {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) && parsed >= min && parsed <= max ? parsed : fallback;
}

function hostedFallback(message: string, glucose: number, sleep: number, steps: number): CheckInResult {
  const fatigue = /tired|fatigue|exhausted|sleep|energy/i.test(message) || sleep < 6;
  const disrupted = /busy|chaos|school|work|missed|restart|later|next week/i.test(message);
  const trendPersists = glucose > 8 || steps < 3000;
  const planDrift = trendPersists && (fatigue || disrupted) ? "high" : trendPersists ? "moderate" : "low";
  const action = planDrift === "high" ? allowedActions[1] : allowedActions[0];

  return {
    summary: fatigue || disrupted
      ? "Today’s context makes the original activity plan less achievable, while the home signals have moved away from Maya’s personal range."
      : "The check-in and home signals remain close to the current care plan.",
    planDrift,
    evidence: [
      `Check-in: ${message.slice(0, 110)}`,
      `Glucose ${glucose.toFixed(1)} mmol/L in this synthetic scenario`,
      `${sleep.toFixed(1)} hours sleep and ${Math.round(steps).toLocaleString("en-GB")} steps`,
    ],
    approvedAction: {
      title: action,
      rationale: "This is a pre-approved fallback from the synthetic care plan; it does not change medication or create a new treatment.",
      followUpMinutes: 60,
    },
    escalate: planDrift === "high",
    handoff: planDrift === "high"
      ? "Review suggested: upward reading, low sleep and movement, and reported friction. No urgent red flags were reported."
      : "Continue monitoring; no care-team exception has been created.",
    safety: "Prototype only. No diagnosis, prescribing, or medication change. Clinical decisions stay with the care team.",
  };
}

function urgentResult(): CheckInResult {
  return {
    summary: "The check-in contains a possible urgent symptom. The adaptive care loop has stopped.",
    planDrift: "high",
    evidence: ["Possible urgent symptom reported", "Generative action selection bypassed"],
    approvedAction: {
      title: "Contact local emergency services now if this is happening now.",
      rationale: "Urgent symptom language bypasses the AI care-plan loop and routes directly to human help.",
      followUpMinutes: 5,
    },
    escalate: true,
    handoff: "Urgent human review requested. No diagnosis or medication advice generated.",
    safety: "This prototype cannot assess emergencies. Seek immediate professional help for current urgent symptoms.",
  };
}

async function runCodex(prompt: string): Promise<CheckInResult> {
  const scratch = await mkdtemp(path.join(tmpdir(), "between-codex-"));
  const outputPath = path.join(scratch, "result.json");
  const schemaPath = path.join(process.cwd(), "src", "lib", "check-in-schema.json");

  try {
    await new Promise<void>((resolve, reject) => {
      const child = spawn(
        "codex",
        [
          "exec",
          "--ephemeral",
          "--ignore-user-config",
          "--ignore-rules",
          "--sandbox",
          "read-only",
          "--skip-git-repo-check",
          "--output-schema",
          schemaPath,
          "--output-last-message",
          outputPath,
          "--color",
          "never",
          "-",
        ],
        {
          cwd: process.cwd(),
          env: { ...process.env, NO_COLOR: "1" },
          stdio: ["pipe", "ignore", "pipe"],
        },
      );

      let stderr = "";
      const timeout = setTimeout(() => {
        child.kill("SIGTERM");
        reject(new Error("Codex CLI timed out"));
      }, 45_000);

      child.stderr.on("data", (chunk: Buffer) => {
        stderr += chunk.toString();
      });
      child.on("error", (error) => {
        clearTimeout(timeout);
        reject(error);
      });
      child.on("close", (code) => {
        clearTimeout(timeout);
        if (code === 0) resolve();
        else reject(new Error(stderr.slice(-500) || `Codex CLI exited with ${code}`));
      });

      child.stdin.end(prompt);
    });

    return JSON.parse(await readFile(outputPath, "utf8")) as CheckInResult;
  } finally {
    await rm(scratch, { recursive: true, force: true });
  }
}

export async function POST(request: Request) {
  let body: CheckInRequest;
  try {
    body = (await request.json()) as CheckInRequest;
  } catch {
    return Response.json({ error: "Send a valid JSON check-in." }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim().slice(0, 1000) : "";
  if (message.length < 8) {
    return Response.json({ error: "Add at least a short sentence about today." }, { status: 400 });
  }

  const glucose = numberInRange(body.glucose, 8.2, 2, 30);
  const sleep = numberInRange(body.sleep, 4.8, 0, 16);
  const steps = numberInRange(body.steps, 2190, 0, 100000);

  if (urgentPhrases.some((phrase) => message.toLowerCase().includes(phrase))) {
    return Response.json({ engine: "deterministic-safety", result: urgentResult() });
  }

  const fallback = hostedFallback(message, glucose, sleep, steps);
  const useCodex = process.env.BETWEEN_AI_MODE === "codex" || !process.env.VERCEL;
  if (!useCodex) {
    return Response.json({ engine: "hosted-demo", result: fallback });
  }

  const prompt = `You are the bounded reasoning layer in BETWEEN, a synthetic hackathon prototype for at-home chronic care.\n\nDo not diagnose, prescribe, recommend a medication or dose change, or invent clinical facts. Use only one of these clinician-approved actions verbatim:\n- ${allowedActions[0]}\n- ${allowedActions[1]}\n- ${allowedActions[2]}\n\nPatient check-in: ${JSON.stringify(message)}\nSynthetic signals: glucose ${glucose.toFixed(1)} mmol/L, sleep ${sleep.toFixed(1)} hours, steps ${Math.round(steps)}.\n\nReturn the schema-constrained JSON only. Explain the contextual plan drift, cite 2-4 supplied signals, select one approved action, and request a non-urgent care-team review only when the pattern persists. The safety field must state that this is a prototype and that clinical decisions stay with the care team.`;

  try {
    const result = await runCodex(prompt);
    return Response.json({ engine: "codex-cli", result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Codex CLI unavailable";
    return Response.json({ engine: "safe-fallback", warning: message, result: fallback });
  }
}
