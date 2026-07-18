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

See [SUBMISSION.md](./SUBMISSION.md) for ready-to-paste hackathon copy and the 90-second demo script.
