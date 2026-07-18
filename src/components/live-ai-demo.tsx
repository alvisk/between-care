"use client";

import { FormEvent, useState } from "react";

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

type ApiResponse = {
  engine: "codex-cli" | "hosted-demo" | "safe-fallback" | "deterministic-safety";
  result: CheckInResult;
  warning?: string;
};

const sampleCheckIns = [
  "I slept badly, the school run was chaos, and I do not have the energy for the gym. I was thinking I would restart next week.",
  "I managed breakfast and my medication, but work ran late and I missed the walk I had planned. I can do something small now.",
  "I have chest pain and cannot breathe properly.",
] as const;

const engineLabels: Record<ApiResponse["engine"], string> = {
  "codex-cli": "LIVE CODEX CLI",
  "hosted-demo": "HOSTED SAFE DEMO",
  "safe-fallback": "SAFE FALLBACK",
  "deterministic-safety": "SAFETY RULE",
};

export function LiveAiDemo() {
  const [message, setMessage] = useState<string>(sampleCheckIns[0]);
  const [glucose, setGlucose] = useState(8.2);
  const [sleep, setSleep] = useState(4.8);
  const [steps, setSteps] = useState(2190);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function analyseCheckIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResponse(null);
    setIsLoading(true);

    try {
      const request = await fetch("/api/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, glucose, sleep, steps }),
      });
      const payload = (await request.json()) as ApiResponse | { error: string };
      if (!request.ok || "error" in payload) {
        throw new Error("error" in payload ? payload.error : "The check-in could not be analysed.");
      }
      setResponse(payload);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The check-in could not be analysed.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="live-demo-shell">
      <aside className="live-context-panel">
        <div className="live-profile">
          <span className="avatar avatar-large">MP</span>
          <span><strong>Maya Patel</strong><small>Synthetic patient · Week 6</small></span>
        </div>
        <div className="live-plan-card">
          <span className="card-label">CLINICIAN-APPROVED BOUNDARY</span>
          <h2>Keep momentum without changing treatment.</h2>
          <ul>
            <li><i>✓</i> Short walk fallback</li>
            <li><i>✓</i> Seated movement fallback</li>
            <li><i>✓</i> Care-team review</li>
            <li><i>×</i> No diagnosis or dose change</li>
          </ul>
        </div>
        <div className="live-signal-stack" aria-label="Synthetic home signals">
          <label>
            <span>Glucose <small>mmol/L</small></span>
            <input max="30" min="2" onChange={(event) => setGlucose(Number(event.target.value))} step="0.1" type="number" value={glucose} />
          </label>
          <label>
            <span>Sleep <small>hours</small></span>
            <input max="16" min="0" onChange={(event) => setSleep(Number(event.target.value))} step="0.1" type="number" value={sleep} />
          </label>
          <label>
            <span>Movement <small>steps</small></span>
            <input max="100000" min="0" onChange={(event) => setSteps(Number(event.target.value))} step="100" type="number" value={steps} />
          </label>
        </div>
      </aside>

      <section className="live-checkin-main" aria-labelledby="live-checkin-title">
        <div className="live-page-heading">
          <span className="eyebrow"><i /> REAL-TIME AI CHECK-IN</span>
          <h1 id="live-checkin-title">Tell BETWEEN what today actually feels like.</h1>
          <p>Change the words or signals. Local development sends the check-in to your authenticated Codex CLI; the hosted site uses the same safety contract with a deterministic fallback.</p>
        </div>

        <form className="live-checkin-form" onSubmit={analyseCheckIn}>
          <label htmlFor="patient-checkin">Patient check-in</label>
          <textarea
            id="patient-checkin"
            maxLength={1000}
            onChange={(event) => setMessage(event.target.value)}
            rows={7}
            value={message}
          />
          <div className="sample-row" aria-label="Example check-ins">
            {sampleCheckIns.map((sample, index) => (
              <button key={sample} onClick={() => setMessage(sample)} type="button">
                {index === 0 ? "Hard day" : index === 1 ? "Missed plan" : "Safety test"}
              </button>
            ))}
          </div>
          <button className="live-analyse-button" disabled={isLoading || message.trim().length < 8} type="submit">
            {isLoading ? <><span className="thinking-orbit" /> Codex is reasoning inside the care plan…</> : <>Analyse this check-in <span>→</span></>}
          </button>
          <p className="live-form-note">Synthetic demo only · Never enter real patient data · Not medical advice</p>
        </form>
      </section>

      <aside className="live-result-panel" aria-live="polite">
        {!response && !isLoading ? (
          <div className="live-empty-result">
            <span className="loop-orbit"><i /></span>
            <small>BOUNDED AI OUTPUT</small>
            <h2>One next step, with the boundary visible.</h2>
            <p>Run a check-in to see the reasoning, evidence, approved action, and care-team route generated from this exact input.</p>
          </div>
        ) : null}

        {isLoading ? (
          <div className="live-reasoning-state">
            <span className="thinking-orbit large-orbit" />
            <small>LIVE REASONING</small>
            <h2>Comparing today with Maya’s plan.</h2>
            <ol>
              <li className="is-active">Structuring patient context</li>
              <li>Checking approved actions</li>
              <li>Applying escalation rules</li>
            </ol>
          </div>
        ) : null}

        {error ? <div className="live-error" role="alert"><strong>Could not run the check-in.</strong><p>{error}</p></div> : null}

        {response ? (
          <div className="live-result">
            <div className="result-topline">
              <span className={`engine-badge engine-${response.engine}`}><i /> {engineLabels[response.engine]}</span>
              <span className={`drift-badge drift-${response.result.planDrift}`}>{response.result.planDrift} drift</span>
            </div>
            <span className="card-label">WHAT CHANGED</span>
            <h2>{response.result.summary}</h2>
            <ul className="live-evidence-list">
              {response.result.evidence.map((item) => <li key={item}><i>↗</i>{item}</li>)}
            </ul>
            <div className="live-action-card">
              <span>ONE APPROVED NEXT STEP</span>
              <h3>{response.result.approvedAction.title}</h3>
              <p>{response.result.approvedAction.rationale}</p>
              <small>Follow up in {response.result.approvedAction.followUpMinutes} minutes</small>
            </div>
            <div className={response.result.escalate ? "live-handoff needs-review" : "live-handoff"}>
              <span>{response.result.escalate ? "↗ CARE-TEAM HANDOFF" : "✓ CONTINUE MONITORING"}</span>
              <p>{response.result.handoff}</p>
            </div>
            <p className="live-safety-copy">{response.result.safety}</p>
            {response.warning ? <p className="engine-warning">Local Codex was unavailable, so the safe fallback ran: {response.warning}</p> : null}
          </div>
        ) : null}
      </aside>
    </div>
  );
}
