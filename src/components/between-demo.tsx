"use client";

import { useState } from "react";

const journey = [
  { short: "Listen", label: "Understand the day" },
  { short: "Notice", label: "Detect plan drift" },
  { short: "Adapt", label: "Offer one safe step" },
  { short: "Connect", label: "Escalate with context" },
] as const;

const patientSignals = [
  { label: "Glucose", base: "6.8", drift: "8.2", unit: "mmol/L", trend: "+18% over 3 days" },
  { label: "Sleep", base: "7h 12m", drift: "4h 50m", unit: "", trend: "Below usual range" },
  { label: "Movement", base: "5,840", drift: "2,190", unit: "steps", trend: "42% below plan" },
] as const;

type DemoView = "patient" | "team";

export function BetweenDemo() {
  const [stage, setStage] = useState(0);
  const [view, setView] = useState<DemoView>("patient");
  const [teamNotice, setTeamNotice] = useState("");

  const advance = () => {
    if (stage < journey.length - 1) {
      setStage((current) => current + 1);
      return;
    }
    setView("team");
  };

  const reset = () => {
    setStage(0);
    setView("patient");
    setTeamNotice("");
  };

  const actionLabel = [
    "Simulate a difficult day",
    "Find a plan-approved next step",
    "Complete step + check response",
    "Open care-team handoff",
  ][stage];

  return (
    <div className="demo-frame">
      <div className="demo-toolbar">
        <div className="demo-window-controls" aria-hidden="true"><i /><i /><i /></div>
        <div className="view-switch" aria-label="Choose demo view">
          <button aria-pressed={view === "patient"} onClick={() => setView("patient")} type="button">
            Patient companion
          </button>
          <button aria-pressed={view === "team"} onClick={() => setView("team")} type="button">
            Care team
            {stage === 3 ? <span className="notification-dot">1</span> : null}
          </button>
        </div>
        <button className="reset-button" onClick={reset} type="button">Reset demo</button>
      </div>

      <div className="journey-strip" aria-label="Demo journey">
        {journey.map((item, index) => (
          <button
            aria-current={index === stage ? "step" : undefined}
            className={index <= stage ? "journey-step is-reached" : "journey-step"}
            key={item.short}
            onClick={() => setStage(index)}
            type="button"
          >
            <span>0{index + 1}</span>
            <strong>{item.short}</strong>
            <small>{item.label}</small>
          </button>
        ))}
      </div>

      {view === "patient" ? (
        <div className="patient-workspace">
          <aside className="patient-sidebar">
            <div className="mini-brand"><span className="mini-mark">(•)</span> BETWEEN</div>
            <nav aria-label="Patient app">
              <span className="is-active">Today</span>
              <span>My plan</span>
              <span>Timeline</span>
              <span>Care team</span>
            </nav>
            <div className="patient-profile">
              <span className="avatar">MP</span>
              <span><strong>Maya Patel</strong><small>Week 6 of 24</small></span>
            </div>
          </aside>

          <div className="patient-main">
            <div className="workspace-heading">
              <div>
                <span className="screen-kicker">SATURDAY · 14:52</span>
                <h3>{stage === 0 ? "Good afternoon, Maya." : "One hard day is data, not failure."}</h3>
              </div>
              <span className={stage === 3 ? "status-pill status-review" : "status-pill"}>
                <i /> {stage === 3 ? "Review suggested" : stage > 0 ? "Plan adapting" : "Plan on track"}
              </span>
            </div>

            {stage >= 1 ? (
              <div className="checkin-card reveal-card">
                <div className="message-avatar">M</div>
                <div>
                  <span>30-second check-in · voice transcript</span>
                  <p>“I slept badly, the school run was chaos, and I don’t have the energy for the gym. I’ll restart next week.”</p>
                </div>
                <span className="transcript-tag">12 sec</span>
              </div>
            ) : (
              <button className="empty-checkin" onClick={advance} type="button">
                <span className="voice-orb">+</span>
                <span><strong>How is today going?</strong><small>Speak, type, or add a photo in 30 seconds.</small></span>
                <span aria-hidden="true">→</span>
              </button>
            )}

            <div className="signal-grid">
              {patientSignals.map((signal, index) => (
                <article className={stage >= 1 ? "signal-card has-drift" : "signal-card"} key={signal.label}>
                  <div><span>{signal.label}</span><i className={`signal-icon signal-${index}`} /></div>
                  <strong>{stage >= 1 ? signal.drift : signal.base} <small>{signal.unit}</small></strong>
                  <span className="signal-trend">{stage >= 1 ? signal.trend : "Within personal range"}</span>
                  <svg aria-hidden="true" className="sparkline" viewBox="0 0 180 42">
                    <path d={stage >= 1 ? "M2 33 C24 31 28 34 45 29 S70 28 85 21 S111 25 126 15 S154 16 178 5" : "M2 25 C24 22 28 26 45 23 S70 25 85 20 S111 22 126 19 S154 21 178 17"} />
                  </svg>
                </article>
              ))}
            </div>

            <div className="today-plan">
              <div className="section-row"><h4>Today’s living plan</h4><span>2 of 3 complete</span></div>
              <div className="plan-row is-done"><i>✓</i><span><strong>Morning medication</strong><small>Logged at 08:10</small></span><b>Done</b></div>
              <div className={stage >= 2 ? "plan-row is-adapted" : "plan-row"}>
                <i>{stage >= 2 ? "↳" : "○"}</i>
                <span><strong>{stage >= 2 ? "10-minute walk after lunch" : "30 minutes of movement"}</strong><small>{stage >= 2 ? "Clinician-approved fallback · check-in at 15:00" : "Planned for this afternoon"}</small></span>
                <b>{stage >= 2 ? "Adapted" : "Next"}</b>
              </div>
            </div>
          </div>

          <aside className={`care-loop-panel stage-${stage}`} aria-live="polite">
            <div className="loop-heading">
              <span className="loop-orbit"><i /></span>
              <span><small>AI CARE LOOP</small><strong>{journey[stage].short}</strong></span>
              <span className="live-label"><i /> LIVE</span>
            </div>

            {stage === 0 ? (
              <div className="loop-content">
                <span className="loop-eyebrow">Living context</span>
                <h4>Watching the gaps, not just the goals.</h4>
                <p>BETWEEN combines the care plan with Maya’s own patterns, then waits for a moment where support can actually help.</p>
                <ul className="source-list">
                  <li><i>01</i><span><strong>Clinician plan</strong><small>Goals, fallbacks, safety boundaries</small></span><b>Connected</b></li>
                  <li><i>02</i><span><strong>Home signals</strong><small>Readings, movement, sleep</small></span><b>Listening</b></li>
                  <li><i>03</i><span><strong>Patient context</strong><small>Voice, text, or photo check-ins</small></span><b>Ready</b></li>
                </ul>
              </div>
            ) : null}

            {stage === 1 ? (
              <div className="loop-content">
                <span className="loop-eyebrow loop-eyebrow-warn">Early signal found</span>
                <h4>Plan drift detected.</h4>
                <p>The check-in explains the numbers: fatigue and a disrupted routine are making the original plan unrealistic today.</p>
                <div className="confidence"><span><i style={{ width: "78%" }} /></span><strong>Illustrative pattern strength</strong></div>
                <ul className="evidence-list">
                  <li><span>↗</span>3-day glucose trend</li>
                  <li><span>−</span>Reduced sleep and movement</li>
                  <li><span>“ ”</span>Intent to defer until next week</li>
                </ul>
                <div className="safety-note"><span>✓</span><p><strong>No urgent red flags.</strong> Continue inside the clinician-approved plan.</p></div>
              </div>
            ) : null}

            {stage === 2 ? (
              <div className="loop-content">
                <span className="loop-eyebrow">Smallest useful action</span>
                <h4>Make today achievable.</h4>
                <div className="next-action-card">
                  <span>APPROVED FALLBACK</span>
                  <strong>10-minute walk after lunch</strong>
                  <p>Then check in at 15:00. Today does not need to be perfect to keep the plan moving.</p>
                  <div><span>10 min</span><span>Low intensity</span><span>No medication change</span></div>
                </div>
                <details className="why-details" open>
                  <summary>Why this step?</summary>
                  <p>It fits Maya’s low-energy context, remains inside her clinician’s approved alternatives, and is short enough to recover momentum.</p>
                </details>
              </div>
            ) : null}

            {stage === 3 ? (
              <div className="loop-content">
                <span className="loop-eyebrow loop-eyebrow-warn">Closed-loop check</span>
                <h4>The action happened. The signal persists.</h4>
                <p>Maya completed the fallback, but her readings remain outside the personal threshold. BETWEEN stops adapting and brings in a human.</p>
                <div className="handoff-preview">
                  <div><span>Review priority</span><strong>Within 24 hours</strong></div>
                  <ul>
                    <li>3-day upward trend</li>
                    <li>Fatigue reported</li>
                    <li>Fallback completed</li>
                    <li>No urgent red flags</li>
                  </ul>
                </div>
                <div className="safety-note"><span>↗</span><p><strong>No diagnosis. No dose change.</strong> Human review requested with the evidence attached.</p></div>
              </div>
            ) : null}

            <button className="demo-action" onClick={advance} type="button">
              {actionLabel}<span aria-hidden="true">→</span>
            </button>
            <p className="prototype-note">Interactive prototype · synthetic patient data</p>
          </aside>
        </div>
      ) : (
        <div className="team-workspace">
          <aside className="queue-sidebar">
            <div className="mini-brand"><span className="mini-mark">(•)</span> BETWEEN <small>CARE TEAM</small></div>
            <div className="queue-group">
              <span>Exception queue</span>
              <button className={stage === 3 ? "queue-filter is-active" : "queue-filter"} disabled type="button"><span>Needs review</span><b>{stage === 3 ? 1 : 0}</b></button>
              <button className="queue-filter" disabled type="button"><span>Monitoring</span><b>8</b></button>
              <button className="queue-filter" disabled type="button"><span>Stable</span><b>42</b></button>
            </div>
            <div className="patient-profile">
              <span className="avatar avatar-clinician">EO</span>
              <span><strong>Dr Ellie Okafor</strong><small>Community diabetes team</small></span>
            </div>
          </aside>

          <div className="team-main">
            <div className="team-topline">
              <div><span className="screen-kicker">EXCEPTION QUEUE · {stage === 3 ? "1 NEEDS REVIEW" : "NO NEW REVIEWS"}</span><h3>Signal, not noise.</h3></div>
              <span className="handoff-time">Generated 14:52</span>
            </div>

            {stage < 3 ? (
              <div className="empty-queue">
                <span className="loop-orbit"><i /></span>
                <h4>No new exception for Maya yet.</h4>
                <p>Advance the patient journey to see how BETWEEN closes the loop before creating a clinician handoff.</p>
                <button className="demo-action compact-action" onClick={() => { setStage(3); setView("patient"); }} type="button">Run patient journey <span>→</span></button>
              </div>
            ) : (
              <>
                <div className="patient-handoff-heading">
                  <div className="patient-identity"><span className="avatar avatar-large">MP</span><span><strong>Maya Patel</strong><small>Type 2 diabetes · Week 6 of 24</small></span></div>
                  <span className="review-badge"><i /> Review within 24 hours</span>
                </div>

                <div className="team-grid">
                  <article className="brief-card brief-summary">
                    <span className="card-label">AI-GENERATED HANDOFF</span>
                    <h4>Upward trend persists after approved fallback.</h4>
                    <p>Maya reported fatigue and a disrupted routine. She completed the 10-minute activity fallback, but her glucose remains above her clinician-set personal range.</p>
                    <div className="guardrail-row"><span>✓ No urgent red flags reported</span><span>✓ No medication advice given</span></div>
                  </article>

                  <article className="brief-card timeline-card">
                    <span className="card-label">EVIDENCE TIMELINE</span>
                    <ol>
                      <li><i>12 JUL</i><span><strong>Personal trend changed</strong><small>Glucose moved above Maya’s normal range.</small></span></li>
                      <li><i>14:31</i><span><strong>Context captured</strong><small>Poor sleep, fatigue, disrupted routine.</small></span></li>
                      <li><i>14:34</i><span><strong>Fallback accepted</strong><small>10-minute walk from approved care plan.</small></span></li>
                      <li><i>14:50</i><span><strong>Threshold still exceeded</strong><small>Human review rule triggered.</small></span></li>
                    </ol>
                  </article>

                  <article className="brief-card metrics-card">
                    <span className="card-label">RELEVANT SIGNALS</span>
                    <div><span>Glucose</span><strong>8.2 <small>mmol/L</small></strong><b>↑ 18%</b></div>
                    <div><span>Sleep</span><strong>4h 50m</strong><b>↓ 32%</b></div>
                    <div><span>Movement</span><strong>2,190 <small>steps</small></strong><b>↓ 42%</b></div>
                  </article>
                </div>

                <div className="team-actions">
                  <div><span className="card-label">SUGGESTED HUMAN NEXT STEP</span><p>Review the trend and send a non-urgent check-in. Clinical decisions remain with the care team.</p></div>
                  <button onClick={() => setTeamNotice("Message draft opened — no message has been sent in this prototype.")} type="button">Message Maya</button>
                  <button className="primary-team-action" onClick={() => setTeamNotice("Review added to Dr Okafor’s queue for the next clinic session.")} type="button">Add to review</button>
                </div>
                {teamNotice ? <p className="team-notice" role="status">✓ {teamNotice}</p> : null}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
