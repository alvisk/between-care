# BETWEEN — stage pitch

## Before presenting

1. Open the homepage and click **Reset demo**.
2. Keep `/live` open in a second tab with the default synthetic check-in loaded.
3. Never enter real patient data.

## 60-second pitch

**0:00–0:10 — Show the hero**

> Chronic care does not fail at the appointment. It fails between appointments—on the ordinary hard day when one missed action becomes a missed week. BETWEEN catches that drift early.

**Click “Run the 90-second demo.”**

**0:10–0:20 — Show Maya, then click “Simulate a difficult day”**

> This synthetic demo follows Maya, managing type 2 diabetes at home. A twelve-second voice check-in explains what the dashboard cannot: poor sleep, a chaotic school run, and a plan that no longer fits today.

**0:20–0:33 — Point to the three signals, then click “Find a plan-approved next step”**

> BETWEEN combines that context with her glucose, sleep, and movement trend. Instead of another reminder, it selects one achievable fallback already approved by her clinician—and shows exactly why.

**0:33–0:45 — Show the fallback and “Why this step?”, then click “Complete step + check response”**

> Maya completes the step, but the signal persists. Here, the AI stops adapting: no diagnosis, no dose change. Deterministic safety rules bring in a human.

**0:45–0:54 — Click “Open care-team handoff”**

> Her care team receives the trend, Maya’s context, what was tried, and what happened next—without reconstructing the story across five dashboards.

**0:54–1:00 — Point to the handoff summary**

> BETWEEN keeps the care plan alive in the real world: one useful next step for the patient, and signal—not noise—for the clinician.

## 20-second fallback

**Show the hero:**

> Chronic care breaks between appointments, when generic reminders collide with real life.

**Click “Run the 90-second demo,” then journey step “Adapt”:**

> BETWEEN turns patient context and home signals into one clinician-approved next step.

**Click journey step “Connect,” then “Care team”:**

> It checks the response, then hands the evidence to a human. No diagnosis, no dose changes—AI supports the plan; clinicians own care.

## Optional 30-second live-AI add-on

**Open `/live`. Edit the synthetic check-in—for example, add “I can manage something small after lunch”—then click “Analyse this check-in.”**

> This is not a canned branch. I can change Maya’s words or home signals, and BETWEEN reasons over that exact input while staying inside three clinician-approved actions.

**While it runs, point to the care-plan boundary. When the result appears, show “Patient action,” then switch to “Care-team handoff.” Point to the engine badge, evidence, approved action, and handoff.**

> In this local build, the authenticated Codex CLI produces schema-constrained output. On the hosted prototype, the same safety contract uses a deterministic fallback, so the demo remains available without pretending a model ran. Either way, urgent phrases bypass generation, and the system cannot diagnose or change a dose.

> Both views come from the same validated result: one useful step for Maya, and one concise exception for her clinical team.

## Delivery beats

- Pause after **“between appointments”** and **“the AI stops adapting.”**
- Do not click **Message Maya** or **Add to review** during the 60-second version.
- If the live result shows **SAFE FALLBACK**, say: “Codex was unavailable, so the bounded fallback ran visibly instead.”
