import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// "Rachel" — calm, professional narration voice from the ElevenLabs prebuilt library.
const VOICE_ID = "21m00Tcm4TlvDq8ikWAM";
const MODEL_ID = "eleven_multilingual_v2";

const projectDir = dirname(fileURLToPath(import.meta.url));
const outputDir = join(projectDir, "public", "voiceover");

// Each clip must fit inside its scene window (maxSeconds) in the fixed
// 60-second composition — trim the text, not the video, if one runs long.
export const SCENES = [
  {
    id: "01-intro",
    maxSeconds: 6.5,
    text: "Care shouldn't go silent between appointments. Between is a clinician-bounded care loop for real life.",
  },
  {
    id: "02-problem",
    maxSeconds: 9,
    text: "The care plan is static, but real life isn't. Poor sleep, a chaotic week — one missed action becomes a missed week, long before the next visit.",
  },
  {
    id: "03-notice",
    maxSeconds: 10,
    text: "Between listens. A twelve-second voice check-in and home signals become one living timeline, so one hard day is data, not failure. It notices early plan drift — not a diagnosis.",
  },
  {
    id: "04-adapt",
    maxSeconds: 9,
    text: "Then it adapts. One achievable action, chosen only from the clinician's pre-approved fallbacks. No diagnosis, no dose changes — just a ten-minute walk that fits today.",
  },
  {
    id: "05-check",
    maxSeconds: 8,
    text: "The loop checks the response. When the signal persists, it stops adapting and routes to a human — deterministically.",
  },
  {
    id: "06-connect",
    maxSeconds: 10,
    text: "The care team gets signal, not noise: the trend, the context, the attempted action, and the safety status. Evidence attached. The decision stays human.",
  },
  {
    id: "07-end",
    maxSeconds: 7,
    text: "One hard day shouldn't become a hard month. This is Between. Try the live prototype today.",
  },
];

function loadApiKey(): string {
  if (process.env.ELEVENLABS_API_KEY) {
    return process.env.ELEVENLABS_API_KEY;
  }
  for (const envFile of [
    join(projectDir, ".env"),
    join(projectDir, "..", ".env.local"),
    join(projectDir, "..", ".env"),
  ]) {
    if (!existsSync(envFile)) {
      continue;
    }
    const match = readFileSync(envFile, "utf8").match(
      /^ELEVENLABS_API_KEY=["']?([^"'\n]+)/m,
    );
    if (match) {
      return match[1];
    }
  }
  throw new Error(
    "ELEVENLABS_API_KEY not found. Export it or add it to pitch-video/.env",
  );
}

async function generateScene(apiKey: string, scene: (typeof SCENES)[number]) {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text: scene.text,
        model_id: MODEL_ID,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.3,
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error(
      `ElevenLabs request failed for ${scene.id}: ${response.status} ${await response.text()}`,
    );
  }

  const audioBuffer = Buffer.from(await response.arrayBuffer());
  const outputPath = join(outputDir, `${scene.id}.mp3`);
  writeFileSync(outputPath, audioBuffer);
  console.log(`✓ ${scene.id}.mp3 (${(audioBuffer.length / 1024).toFixed(0)} KB)`);
}

async function main() {
  const apiKey = loadApiKey();
  mkdirSync(outputDir, { recursive: true });
  for (const scene of SCENES) {
    await generateScene(apiKey, scene);
  }
  console.log(`\nDone. Files written to ${outputDir}`);
}

await main();
