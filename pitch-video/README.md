# BETWEEN — 60-second pitch video

Silent 1920×1080 Remotion composition for the BETWEEN healthcare prototype.

## Storyboard

1. The care gap between appointments.
2. A synthetic patient check-in reveals early plan drift.
3. BETWEEN selects one clinician-approved fallback, without diagnosis or medication changes.
4. The loop checks whether the action helped and stops adapting when the threshold persists.
5. The care team receives a concise, evidence-backed handoff.
6. End card links to the live interactive prototype.

All animation is deterministic and frame-driven with `useCurrentFrame()`, `interpolate()`, and `Sequence`. The composition contains no CSS transitions or keyframe animations and uses no real patient data.

## Commands

```bash
pnpm install
pnpm studio
pnpm typecheck
pnpm still
pnpm render
```

The submission MP4 renders to `out/between-care-pitch-submission.mp4`. The
render command forces a silent output and single-worker encoding for a stable,
submission-ready file.
