import { BetweenDemo } from "@/components/between-demo";
import { BetweenMark } from "@/components/between-mark";

const principles = [
  {
    number: "01",
    eyebrow: "Notice",
    title: "Catch drift before it becomes a lost week.",
    body: "BETWEEN reads the gap between the care plan and real life—combining short check-ins with longitudinal home signals to spot when support can still change the outcome.",
  },
  {
    number: "02",
    eyebrow: "Adapt",
    title: "One achievable action, inside the plan.",
    body: "The model selects from clinician-approved fallbacks and explains why. It does not diagnose, prescribe, or improvise beyond the patient’s agreed safety boundaries.",
  },
  {
    number: "03",
    eyebrow: "Connect",
    title: "Bring in humans with the evidence attached.",
    body: "When a threshold persists, the care team gets a concise handoff: the trend, patient context, attempted action, response, and red-flag status—signal instead of another dashboard.",
  },
] as const;

export default function HomePage() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="BETWEEN home"><BetweenMark /><strong>BETWEEN</strong></a>
        <nav aria-label="Main navigation">
          <a href="#care-loop">Care loop</a>
          <a href="#safety">Safety</a>
          <a href="#architecture">How it works</a>
        </nav>
        <a className="header-cta" href="/live"><span className="live-dot" /> Real-time AI</a>
      </header>

      <section className="hero" id="top">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <div className="hero-copy">
          <span className="eyebrow"><i /> AT-HOME CHRONIC CARE, REIMAGINED</span>
          <h1>AI care for everything that happens <em>between.</em></h1>
          <p>BETWEEN keeps a clinician-approved care plan alive in the real world: notice early drift, offer one achievable next step, and connect the care team only when a human is needed.</p>
          <div className="hero-actions">
            <a className="primary-button" href="#demo">Run the 90-second demo <span>↘</span></a>
            <a className="quiet-link" href="/live">Try a live AI check-in <span>→</span></a>
          </div>
          <div className="hero-proof">
            <span><i>✓</i> Clinician-bounded actions</span>
            <span><i>✓</i> Deterministic red flags</span>
            <span><i>✓</i> Synthetic demo data</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="BETWEEN care loop overview">
          <div className="orbit orbit-outer"><span>HOME SIGNALS</span><span>CARE PLAN</span><span>HUMAN TEAM</span></div>
          <div className="orbit orbit-middle" />
          <div className="orbit-core"><BetweenMark /><strong>One approved<br />next step</strong><small>RIGHT NOW</small></div>
          <div className="floating-signal signal-a"><span>↗</span><div><small>EARLY DRIFT</small><strong>Pattern noticed</strong></div></div>
          <div className="floating-signal signal-b"><span>✓</span><div><small>PLAN BOUNDARY</small><strong>Action approved</strong></div></div>
          <div className="floating-signal signal-c"><span>↗</span><div><small>HUMAN LOOP</small><strong>Review when needed</strong></div></div>
        </div>
      </section>

      <div className="context-ribbon" aria-label="Product summary">
        <span>NOTICE THE DRIFT</span><i>→</i><span>ADAPT ONE STEP</span><i>→</i><span>CHECK THE RESPONSE</span><i>→</i><span>CONNECT THE HUMAN</span>
      </div>

      <section className="demo-section" id="demo">
        <div className="section-heading">
          <div><span className="eyebrow"><i /> LIVE PRODUCT PROTOTYPE</span><h2>See a difficult day become an approved next step.</h2></div>
          <p>Follow Maya’s type 2 diabetes care journey from a 12-second voice check-in to a contextual care-team handoff. Every datum is synthetic.</p>
        </div>
        <BetweenDemo />
      </section>

      <section className="principles-section" id="care-loop">
        <div className="section-heading centered-heading">
          <div><span className="eyebrow"><i /> THE CLOSED CARE LOOP</span><h2>Not another reminder.<br />A plan that responds.</h2></div>
          <p>Chronic care fails in the gap between intention and real life. BETWEEN turns that gap into a moment for safe, timely support.</p>
        </div>
        <div className="principles-grid">
          {principles.map((principle) => (
            <article key={principle.number}>
              <div className="principle-top"><span>{principle.number}</span><i /></div>
              <small>{principle.eyebrow}</small>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="architecture-section" id="architecture">
        <div className="architecture-copy">
          <span className="eyebrow"><i /> PROPOSED OPENAI ARCHITECTURE</span>
          <h2>Reason over context.<br />Route with rules.</h2>
          <p>The proposed production architecture uses multimodal AI to structure everyday patient context. Care-plan boundaries and deterministic thresholds decide what the system is allowed to do next.</p>
          <ul>
            <li><span>01</span><div><strong>Understand naturally</strong><small>Voice, text, photos, wearables, and at-home biomarkers become a living timeline.</small></div></li>
            <li><span>02</span><div><strong>Generate inside guardrails</strong><small>Structured outputs select only clinician-authored goals, fallbacks, and follow-ups.</small></div></li>
            <li><span>03</span><div><strong>Escalate deterministically</strong><small>Hard thresholds, uncertainty, and red flags bypass generative judgement.</small></div></li>
          </ul>
        </div>
        <div className="architecture-map" aria-label="BETWEEN system architecture">
          <div className="map-column map-inputs">
            <span className="map-label">CONTEXT IN</span>
            <div><i>“ ”</i><span><strong>Patient check-in</strong><small>Voice · text · photo</small></span></div>
            <div><i>⌁</i><span><strong>Home signals</strong><small>Biomarkers · wearable</small></span></div>
            <div><i>⌘</i><span><strong>Clinical plan</strong><small>Goals · boundaries</small></span></div>
          </div>
          <div className="map-flow"><span>→</span><small>STRUCTURED<br />CONTEXT</small></div>
          <div className="map-engine">
            <span className="map-label">BOUNDED AI</span>
            <div className="engine-core"><BetweenMark /><strong>BETWEEN<br />CARE LOOP</strong><small>REASON · SELECT · EXPLAIN</small></div>
            <div className="rule-rail"><span>Deterministic safety rail</span><i /></div>
          </div>
          <div className="map-flow"><span>→</span><small>VALIDATED<br />DECISION</small></div>
          <div className="map-column map-outputs">
            <span className="map-label">RIGHT ROUTE</span>
            <div><i>✓</i><span><strong>Patient action</strong><small>One approved next step</small></span></div>
            <div><i>↗</i><span><strong>Human handoff</strong><small>Evidence, not noise</small></span></div>
          </div>
        </div>
      </section>

      <section className="safety-section" id="safety">
        <div className="safety-statement">
          <span className="safety-icon">+</span>
          <div><span className="eyebrow"><i /> DESIGNED TO SUPPORT CARE, NOT PRACTISE MEDICINE</span><h2>The model can explain.<br />The boundary decides.</h2></div>
        </div>
        <div className="safety-grid">
          <article><span>01</span><h3>No diagnosis or prescribing</h3><p>BETWEEN never changes medication or dosage. Material plan changes always return to a qualified clinician.</p></article>
          <article><span>02</span><h3>Clinician-authored options</h3><p>Patient actions come from an explicit set of goals, fallbacks, monitoring rules, and escalation paths.</p></article>
          <article><span>03</span><h3>Red flags bypass the model</h3><p>Deterministic rules take priority for urgent symptoms, thresholds, uncertainty, and required human review.</p></article>
          <article><span>04</span><h3>Explainable by default</h3><p>Every suggestion shows the evidence used, the approved boundary, and why that step fits the patient’s context.</p></article>
        </div>
      </section>

      <section className="closing-section">
        <div><BetweenMark /><span>THE SPACE BETWEEN APPOINTMENTS</span></div>
        <h2>One hard day should not become a hard month.</h2>
        <p>BETWEEN helps patients recover momentum early—and helps care teams show up exactly when they are needed.</p>
        <a className="primary-button" href="#demo">Replay the prototype <span>↑</span></a>
      </section>

      <footer>
        <a className="brand" href="#top"><BetweenMark /><strong>BETWEEN</strong></a>
        <p>Built for Reimagine Health with eMed &amp; OpenAI · 2026</p>
        <p>Prototype only · Synthetic data · Not medical advice</p>
      </footer>
    </main>
  );
}
