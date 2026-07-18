# Hackathon submission — BETWEEN

## Project name

BETWEEN

## One-liner

AI care for everything that happens between appointments.

## Short description

BETWEEN is an adaptive AI care loop for people managing chronic conditions at home. It combines natural check-ins with longitudinal home signals, notices when a care plan is beginning to drift, and recommends one achievable next action from clinician-approved options. It then checks whether the action helped. If a threshold persists, the clinical team receives a concise, evidence-backed handoff instead of another noisy alert. BETWEEN does not diagnose, prescribe, or change medication; it makes approved care plans responsive to real life and connects patients with humans when humans are truly needed.

## The problem

Chronic care rarely breaks down in the clinic. It breaks down on a busy Tuesday: poor sleep, an unexpected side effect, no time to exercise, confusing readings, or one missed action becoming a missed week. Static plans and generic reminders cannot respond to the reality of a patient’s day. Clinicians often see the result only after it becomes serious.

## The solution

BETWEEN turns a clinician-approved care plan into a living, bounded loop:

**Notice drift → choose one achievable action → check the response → adapt or escalate.**

Patients check in naturally by voice, text, or photo. Optional wearable and biomarker data enrich a living health timeline. The system detects early plan drift, selects an allowed fallback action that fits today’s context, and explains why. If the response is insufficient or a clinician-set rule is crossed, BETWEEN creates an evidence-linked human handoff.

## What makes it innovative

BETWEEN is not another chatbot, reminder app, or passive dashboard. It is a bounded decision layer for the moment adherence is most likely to fail. It reasons over longitudinal context, but can act only inside a clinician-authored plan. It closes the loop by checking the outcome and knows when to stop adapting and bring in a human.

## Proposed AI architecture

The interactive hackathon prototype demonstrates the full user journey with synthetic scenarios. A production implementation would use:

- Multimodal understanding for short voice, text, and photo check-ins.
- Structured outputs that convert clinician-authored plans into goals, constraints, approved actions, and escalation criteria.
- Longitudinal reasoning across readings, symptoms, adherence, sleep, activity, and personal context.
- Tool calling for device data, scheduled follow-ups, and clinician alerts.
- Patient-friendly explanations and concise clinical handoffs.
- Deterministic thresholds and output validation outside the model for safety-critical routing.

## Safety and privacy

The demo uses synthetic data. BETWEEN does not diagnose, prescribe, or autonomously change medication or dosage. Patient actions stay inside clinician-authored boundaries. Deterministic red-flag rules take priority over model output, uncertainty is surfaced, urgent symptoms follow appropriate escalation guidance, and material plan changes require a clinician.

A production system would minimise collection, require explicit consent for connected sources, encrypt data in transit and at rest, apply role-based access, and maintain an audit trail. Health data would not be used for advertising or model training.

## 90-second demo script

**0:00 — Set up the patient**

“This is Maya, who manages type 2 diabetes at home. Her clinician has defined targets, approved fallback activities, and escalation thresholds in BETWEEN.”

Show the living plan and select **Simulate a difficult day**.

**0:15 — Real life happens**

Maya’s 12-second check-in says: “I slept badly, the school run was chaos, and I don’t have the energy for the gym. I’ll restart next week.”

Show BETWEEN combining the context with an upward glucose trend, poor sleep, and lower movement. Select **Find the safest next step**.

**0:35 — Adapt inside the plan**

BETWEEN selects Maya’s clinician-approved fallback: a 10-minute walk after lunch and a 3pm follow-up. Open “Why this step?” to show the evidence and boundary. Select **Complete step + check response**.

**0:55 — Close the loop**

Maya completed the fallback, but her readings remain beyond her personal threshold. BETWEEN does not provide medication advice. Select **Open care-team handoff**.

**1:05 — Bring in the human**

Show the care-team exception queue: three-day upward trend; fatigue reported; fallback completed; threshold remains exceeded; no urgent red flags. The clinician can message Maya or add her to review without reconstructing the story from several dashboards.

**1:25 — Close**

“BETWEEN does not replace the clinician. It keeps the care plan alive between appointments, helps patients recover before one difficult day becomes a difficult month, and gives clinicians signal instead of noise.”

## Judging criteria

- **User impact:** supports the exact moment a patient is at risk of disengaging from a long programme.
- **Innovation:** moves beyond reminders and chatbots to a closed, clinician-bounded adaptation loop.
- **Feasibility:** uses available multimodal models, structured outputs, tool calls, patient-generated data, and deterministic routing.
- **Demo quality:** a complete patient-to-clinician journey is built into one interactive prototype.
