# BETWEEN

**AI care for everything that happens between appointments.**

BETWEEN is a new at-home chronic-care product concept built for Reimagine Health with eMed & OpenAI. It notices early care-plan drift, selects one achievable action from clinician-approved options, checks the response, and creates an evidence-backed handoff when human attention is needed.

The interactive demo follows a synthetic patient managing type 2 diabetes. No real patient data is used.

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000), select **Run the 90-second demo**, and advance through Listen → Notice → Adapt → Connect.

### Run the live Codex check-in

The full-page demo at [http://localhost:3000/live](http://localhost:3000/live) sends the patient check-in and synthetic signals to your authenticated local Codex CLI. It runs GPT-5.5 through `codex exec` ephemerally in a read-only sandbox, disables unrelated tools/plugins, and constrains the final response with a JSON Schema plus a server-side action allowlist. The validated result can be switched between a patient-facing action and a care-team handoff.

```bash
codex login
pnpm dev
```

On Vercel, where the local CLI is not available, the same page uses a clearly labelled deterministic fallback. Urgent symptom phrases bypass the model in both modes.

## Verify

```bash
pnpm check
```

## Safety model

- No diagnosis, prescribing, or autonomous medication changes.
- Suggested actions must come from clinician-authored goals and fallbacks.
- Deterministic rules take priority for red flags and escalation thresholds.
- Every suggestion exposes its evidence and the boundary that allowed it.
- The prototype uses synthetic data and is not medical advice.

## Production architecture

1. Multimodal AI turns voice, text, photos, wearables, and home readings into structured context.
2. Longitudinal reasoning identifies plan drift and selects from clinician-approved actions.
3. Schema validation checks every generated output.
4. Deterministic rules route urgent symptoms, uncertainty, and threshold breaches.
5. Patients see one explainable next step; clinicians see a prioritised exception queue.

The live prototype implements this separation directly: deterministic urgent-language routing runs before Codex, and Codex can choose only from the synthetic care plan's approved actions.

See [SUBMISSION.md](./SUBMISSION.md) for ready-to-paste hackathon copy and the 90-second demo script.
