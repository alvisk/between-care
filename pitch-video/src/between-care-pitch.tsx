import type { CSSProperties, ReactNode } from "react";
import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

const FPS = 30;
const TOTAL_FRAMES = 60 * FPS;
const LIVE_URL = "between-care.vercel.app";

const NAVY = "#071521";
const NAVY_RAISED = "#102635";
const NAVY_SOFT = "#173647";
const CORAL = "#ff786a";
const CORAL_SOFT = "#ffc0b7";
const CREAM = "#f7f1e8";
const PAPER = "#fffaf2";
const MINT = "#7de0bd";
const AMBER = "#ffc46b";
const BLUE = "#b9dced";
const MUTED = "#9baeb8";
const INK = "#071521";
const SANS = 'Arial, "Helvetica Neue", sans-serif';
const SERIF = 'Georgia, "Times New Roman", serif';
const MONO = '"Courier New", Courier, monospace';

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const rise = (
  frame: number,
  delay = 0,
  distance = 34,
): CSSProperties => {
  const amount = interpolate(frame, [delay, delay + 20], [0, 1], clamp);
  return {
    opacity: amount,
    transform: `translateY(${interpolate(amount, [0, 1], [distance, 0])}px)`,
  };
};

const slide = (
  frame: number,
  delay = 0,
  distance = 42,
): CSSProperties => {
  const amount = interpolate(frame, [delay, delay + 22], [0, 1], clamp);
  return {
    opacity: amount,
    transform: `translateX(${interpolate(amount, [0, 1], [distance, 0])}px)`,
  };
};

function BrandMark({ size = 42, dark = false }: { size?: number; dark?: boolean }) {
  return (
    <span
      style={{
        alignItems: "center",
        border: `2px solid ${dark ? INK : CORAL}`,
        borderRadius: 999,
        display: "inline-flex",
        height: size,
        justifyContent: "center",
        position: "relative",
        width: size,
      }}
    >
      <span
        style={{
          background: dark ? INK : CORAL,
          borderRadius: 999,
          height: size * 0.2,
          width: size * 0.2,
        }}
      />
      <span
        style={{
          border: `1px solid ${dark ? `${INK}55` : `${CORAL}70`}`,
          borderRadius: 999,
          height: size * 0.58,
          position: "absolute",
          width: size * 0.58,
        }}
      />
    </span>
  );
}

function Brand({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  return (
    <div style={{ alignItems: "center", display: "flex", gap: compact ? 15 : 20 }}>
      <BrandMark dark={dark} size={compact ? 34 : 48} />
      <strong
        style={{
          color: dark ? INK : CREAM,
          fontFamily: SANS,
          fontSize: compact ? 22 : 30,
          letterSpacing: "0.15em",
        }}
      >
        BETWEEN
      </strong>
    </div>
  );
}

function Scene({
  children,
  duration,
  background = NAVY,
}: {
  children: ReactNode;
  duration: number;
  background?: string;
}) {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 20, duration - 20, duration],
    [0, 1, 1, 0],
    clamp,
  );

  return (
    <AbsoluteFill
      style={{
        background,
        color: CREAM,
        fontFamily: SANS,
        opacity,
        overflow: "hidden",
      }}
    >
      {children}
    </AbsoluteFill>
  );
}

function GridBackdrop({ light = false }: { light?: boolean }) {
  return (
    <AbsoluteFill
      style={{
        backgroundImage: light
          ? "linear-gradient(rgba(7,21,33,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(7,21,33,.055) 1px, transparent 1px)"
          : "linear-gradient(rgba(247,241,232,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(247,241,232,.045) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
        opacity: 0.62,
      }}
    />
  );
}

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div
      style={{
        alignItems: "center",
        color: dark ? "#526673" : CORAL_SOFT,
        display: "flex",
        fontFamily: MONO,
        fontSize: 18,
        fontWeight: 700,
        gap: 14,
        letterSpacing: "0.13em",
        textTransform: "uppercase",
      }}
    >
      <span style={{ background: CORAL, borderRadius: 999, height: 8, width: 8 }} />
      {children}
    </div>
  );
}

function Pill({
  children,
  color = CORAL,
  dark = false,
}: {
  children: ReactNode;
  color?: string;
  dark?: boolean;
}) {
  return (
    <span
      style={{
        background: dark ? `${color}22` : `${color}18`,
        border: `1px solid ${dark ? `${color}55` : `${color}45`}`,
        borderRadius: 999,
        color: dark ? INK : color,
        fontFamily: MONO,
        fontSize: 15,
        fontWeight: 700,
        letterSpacing: "0.08em",
        padding: "12px 17px",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

function IntroScene() {
  const frame = useCurrentFrame();
  const orbit = interpolate(frame, [0, 210], [-18, 18], clamp);
  const line = interpolate(frame, [92, 172], [0, 1], clamp);

  return (
    <Scene duration={210}>
      <GridBackdrop />
      <div
        style={{
          background: `radial-gradient(circle, ${CORAL}25 0%, ${CORAL}00 68%)`,
          height: 980,
          position: "absolute",
          right: -280,
          top: -310,
          transform: `rotate(${orbit}deg)`,
          width: 980,
        }}
      />
      <div
        style={{
          alignItems: "flex-start",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "105px 150px 95px",
          position: "relative",
        }}
      >
        <div style={rise(frame, 6)}>
          <Brand />
        </div>
        <h1
          style={{
            ...rise(frame, 28, 55),
            fontFamily: SANS,
            fontSize: 118,
            fontWeight: 520,
            letterSpacing: "-0.062em",
            lineHeight: 0.95,
            margin: "68px 0 0",
            maxWidth: 1420,
          }}
        >
          Care should not go silent
          <br />
          <span style={{ color: CORAL, fontFamily: SERIF, fontStyle: "italic" }}>
            between appointments.
          </span>
        </h1>
        <div
          style={{
            ...rise(frame, 66),
            alignItems: "center",
            display: "flex",
            marginTop: 62,
            width: "100%",
          }}
        >
          <div style={{ background: `${CREAM}22`, height: 1, width: 180 }}>
            <div style={{ background: CORAL, height: 2, transform: `scaleX(${line})`, transformOrigin: "left", width: "100%" }} />
          </div>
          <p style={{ color: MUTED, fontSize: 27, lineHeight: 1.5, margin: "0 0 0 28px", maxWidth: 790 }}>
            A clinician-bounded care loop for everything that happens in real life.
          </p>
        </div>
        <div style={{ ...rise(frame, 105), display: "flex", gap: 14, marginTop: 48 }}>
          <Pill>Closed loop</Pill>
          <Pill color={MINT}>Clinician approved</Pill>
          <Pill color={BLUE}>Synthetic prototype</Pill>
        </div>
      </div>
    </Scene>
  );
}

function ProblemScene() {
  const frame = useCurrentFrame();
  const gapProgress = interpolate(frame, [48, 150], [0, 1], clamp);
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  return (
    <Scene duration={300}>
      <GridBackdrop />
      <div style={{ display: "grid", gap: 100, gridTemplateColumns: "0.88fr 1.12fr", height: "100%", padding: "150px 150px 120px" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={rise(frame, 4)}><Eyebrow>The care gap</Eyebrow></div>
          <h2 style={{ ...rise(frame, 22, 48), fontSize: 94, fontWeight: 520, letterSpacing: "-0.06em", lineHeight: 0.98, margin: "36px 0 0" }}>
            The plan is static.
            <br />
            <span style={{ color: CORAL, fontFamily: SERIF, fontStyle: "italic" }}>Real life is not.</span>
          </h2>
          <p style={{ ...rise(frame, 58), color: MUTED, fontSize: 28, lineHeight: 1.58, margin: "44px 0 0", maxWidth: 660 }}>
            Poor sleep. A chaotic school run. One missed action becoming a missed week—long before the next appointment.
          </p>
          <div style={{ ...rise(frame, 94), borderLeft: `4px solid ${CORAL}`, marginTop: 50, padding: "7px 0 7px 25px" }}>
            <strong style={{ display: "block", fontSize: 27, fontWeight: 600 }}>The moment support can still help</strong>
            <span style={{ color: MUTED, display: "block", fontSize: 20, marginTop: 10 }}>usually happens between visits.</span>
          </div>
        </div>

        <div style={{ alignItems: "center", display: "flex", justifyContent: "center", position: "relative" }}>
          <div style={{ ...slide(frame, 26, 65), background: CREAM, borderRadius: 30, boxShadow: "0 36px 100px rgba(0,0,0,.24)", color: INK, overflow: "hidden", padding: "48px 44px", width: "100%" }}>
            <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
              <div>
                <span style={{ color: "#657985", fontFamily: MONO, fontSize: 14, letterSpacing: ".1em" }}>CARE PLAN / WEEK 06</span>
                <h3 style={{ fontSize: 31, margin: "10px 0 0" }}>What happened between?</h3>
              </div>
              <Pill color={CORAL} dark>Early drift</Pill>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginTop: 54, position: "relative" }}>
              <div style={{ background: "#d9e1df", height: 2, left: 40, position: "absolute", right: 40, top: 36 }} />
              <div style={{ background: CORAL, height: 4, left: 40, position: "absolute", top: 35, transform: `scaleX(${gapProgress})`, transformOrigin: "left", width: "calc(100% - 80px)" }} />
              {days.map((day, index) => {
                const active = index === 0 || index === 6;
                const opacity = interpolate(frame, [44 + index * 8, 60 + index * 8], [0, 1], clamp);
                return (
                  <div key={day} style={{ alignItems: "center", display: "flex", flexDirection: "column", opacity, position: "relative" }}>
                    <span style={{ alignItems: "center", background: active ? INK : index === 3 ? CORAL : PAPER, border: `2px solid ${active ? INK : index === 3 ? CORAL : "#bcc9c9"}`, borderRadius: 999, color: active ? CREAM : index === 3 ? PAPER : "#6c808a", display: "flex", fontFamily: MONO, fontSize: 13, height: 72, justifyContent: "center", width: 72 }}>
                      {active ? "+" : index === 3 ? "!" : "·"}
                    </span>
                    <strong style={{ fontFamily: MONO, fontSize: 13, marginTop: 17 }}>{day}</strong>
                    <small style={{ color: "#778a93", fontSize: 13, marginTop: 7, textAlign: "center" }}>{active ? "visit" : index === 3 ? "hard day" : "at home"}</small>
                  </div>
                );
              })}
            </div>
            <div style={{ ...rise(frame, 128), alignItems: "flex-start", background: "#fff0ed", border: `1px solid ${CORAL}55`, borderRadius: 19, display: "flex", gap: 20, marginTop: 58, padding: "27px 29px" }}>
              <span style={{ alignItems: "center", background: CORAL, borderRadius: 999, color: PAPER, display: "flex", flex: "0 0 auto", fontFamily: SERIF, fontSize: 24, height: 46, justifyContent: "center", width: 46 }}>“</span>
              <div>
                <span style={{ color: "#7a6361", fontFamily: MONO, fontSize: 13, letterSpacing: ".08em" }}>12-SECOND CHECK-IN · SYNTHETIC</span>
                <p style={{ fontFamily: SERIF, fontSize: 26, fontStyle: "italic", lineHeight: 1.42, margin: "10px 0 0" }}>
                  “I slept badly, the school run was chaos, and I’ll restart next week.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Scene>
  );
}

function Sparkline({
  color,
  frame,
  path,
}: {
  color: string;
  frame: number;
  path: string;
}) {
  const progress = interpolate(frame, [58, 132], [0, 1], clamp);
  return (
    <svg aria-hidden="true" height="90" viewBox="0 0 300 90" width="100%">
      <path d={path} fill="none" opacity={0.12} stroke={color} strokeWidth={12} />
      <path
        d={path}
        fill="none"
        pathLength={1}
        stroke={color}
        strokeDasharray={1}
        strokeDashoffset={1 - progress}
        strokeLinecap="round"
        strokeWidth={5}
      />
    </svg>
  );
}

function DriftScene() {
  const frame = useCurrentFrame();
  const scan = interpolate(frame, [34, 170], [0, 1], clamp);
  const signals = [
    { label: "Glucose", value: "8.2", unit: "mmol/L", trend: "3-day upward trend", color: CORAL, path: "M4 70 C45 65 58 72 90 59 S145 58 174 43 S230 45 296 13" },
    { label: "Sleep", value: "4h 50m", unit: "", trend: "Below usual range", color: BLUE, path: "M4 23 C55 22 62 28 100 30 S160 39 202 48 S255 58 296 68" },
    { label: "Movement", value: "2,190", unit: "steps", trend: "Below today’s plan", color: AMBER, path: "M4 19 C48 24 71 28 111 35 S170 49 215 57 S260 67 296 73" },
  ];

  return (
    <Scene duration={330} background="#091925">
      <GridBackdrop />
      <div style={{ height: "100%", padding: "128px 118px 92px" }}>
        <div style={{ ...rise(frame, 4), alignItems: "flex-end", display: "flex", justifyContent: "space-between" }}>
          <div>
            <Eyebrow>01 · Notice</Eyebrow>
            <h2 style={{ fontSize: 71, fontWeight: 520, letterSpacing: "-0.055em", margin: "22px 0 0" }}>See the whole day, not one datapoint.</h2>
          </div>
          <p style={{ color: MUTED, fontSize: 21, lineHeight: 1.55, margin: 0, maxWidth: 440, textAlign: "right" }}>Voice context and longitudinal home signals become one living timeline.</p>
        </div>

        <div style={{ ...rise(frame, 28, 50), background: CREAM, borderRadius: 27, boxShadow: "0 34px 90px rgba(0,0,0,.25)", color: INK, display: "grid", gridTemplateColumns: "280px 1fr 430px", marginTop: 45, minHeight: 690, overflow: "hidden" }}>
          <aside style={{ background: INK, color: CREAM, display: "flex", flexDirection: "column", padding: "33px 28px" }}>
            <Brand compact />
            <div style={{ marginTop: 72 }}>
              {[
                ["Today", true],
                ["My plan", false],
                ["Timeline", false],
                ["Care team", false],
              ].map(([label, active]) => (
                <div key={String(label)} style={{ background: active ? `${CORAL}22` : "transparent", borderRadius: 11, color: active ? CORAL_SOFT : MUTED, fontSize: 18, marginBottom: 9, padding: "16px 17px" }}>{label}</div>
              ))}
            </div>
            <div style={{ alignItems: "center", display: "flex", gap: 14, marginTop: "auto" }}>
              <span style={{ alignItems: "center", background: BLUE, borderRadius: 999, color: INK, display: "flex", fontWeight: 700, height: 45, justifyContent: "center", width: 45 }}>MP</span>
              <span><strong style={{ display: "block", fontSize: 16 }}>Maya Patel</strong><small style={{ color: MUTED, display: "block", fontSize: 13, marginTop: 4 }}>Synthetic patient</small></span>
            </div>
          </aside>

          <main style={{ padding: "37px 34px" }}>
            <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
              <div><span style={{ color: "#71838c", fontFamily: MONO, fontSize: 13 }}>SATURDAY · 14:52</span><h3 style={{ fontSize: 31, margin: "8px 0 0" }}>One hard day is data, not failure.</h3></div>
              <Pill color={CORAL} dark>Drift noticed</Pill>
            </div>
            <div style={{ ...rise(frame, 48), alignItems: "flex-start", background: PAPER, border: "1px solid #e0ddd5", borderRadius: 17, display: "flex", gap: 16, marginTop: 26, padding: "21px 23px" }}>
              <span style={{ alignItems: "center", background: CORAL, borderRadius: 999, color: PAPER, display: "flex", fontWeight: 700, height: 42, justifyContent: "center", width: 42 }}>M</span>
              <div><span style={{ color: "#71838c", fontFamily: MONO, fontSize: 12 }}>VOICE CHECK-IN · 12 SEC</span><p style={{ fontSize: 18, lineHeight: 1.45, margin: "8px 0 0" }}>“I slept badly… I don’t have the energy for the gym.”</p></div>
            </div>
            <div style={{ display: "grid", gap: 15, gridTemplateColumns: "repeat(3, 1fr)", marginTop: 21 }}>
              {signals.map((signal, index) => (
                <div key={signal.label} style={{ ...rise(frame, 64 + index * 13), background: PAPER, border: "1px solid #e0ddd5", borderRadius: 16, minWidth: 0, padding: "18px" }}>
                  <span style={{ color: "#6e8089", fontSize: 14 }}>{signal.label}</span>
                  <strong style={{ display: "block", fontFamily: MONO, fontSize: 27, marginTop: 9 }}>{signal.value} <small style={{ color: "#72838b", fontSize: 11 }}>{signal.unit}</small></strong>
                  <Sparkline color={signal.color} frame={frame} path={signal.path} />
                  <span style={{ color: signal.color === BLUE ? "#427a94" : signal.color === AMBER ? "#9a6822" : "#ad433b", fontSize: 13 }}>{signal.trend}</span>
                </div>
              ))}
            </div>
            <div style={{ alignItems: "center", background: "#e9efed", borderRadius: 12, display: "flex", gap: 20, marginTop: 21, padding: "18px 21px" }}>
              <span style={{ color: "#677b84", fontFamily: MONO, fontSize: 12 }}>LIVING PLAN</span>
              <span style={{ background: "#cfdad6", height: 1, flex: 1 }} />
              <strong style={{ fontSize: 15 }}>Context captured · plan boundary loaded</strong>
            </div>
          </main>

          <aside style={{ background: NAVY_RAISED, color: CREAM, padding: "38px 31px", position: "relative" }}>
            <div style={{ background: `${CORAL}22`, bottom: 0, left: 0, position: "absolute", top: 0, transform: `scaleY(${scan})`, transformOrigin: "top", width: 4 }} />
            <span style={{ color: CORAL_SOFT, fontFamily: MONO, fontSize: 13, letterSpacing: ".11em" }}>AI CARE LOOP / NOTICE</span>
            <h3 style={{ ...rise(frame, 92), fontSize: 37, letterSpacing: "-0.035em", lineHeight: 1.08, margin: "33px 0 0" }}>Early plan drift—not a diagnosis.</h3>
            <p style={{ ...rise(frame, 116), color: MUTED, fontSize: 18, lineHeight: 1.56, margin: "25px 0 0" }}>Today’s context makes the original activity goal unrealistic. BETWEEN looks only inside Maya’s clinician-authored plan.</p>
            <div style={{ ...rise(frame, 145), marginTop: 36 }}>
              {["3-day trend changed", "Poor sleep reported", "Movement below plan"].map((item, index) => (
                <div key={item} style={{ alignItems: "center", borderTop: `1px solid ${CREAM}17`, display: "flex", fontSize: 16, gap: 14, padding: "18px 0" }}><span style={{ color: index === 0 ? CORAL : index === 1 ? BLUE : AMBER }}>0{index + 1}</span>{item}</div>
              ))}
            </div>
            <div style={{ ...rise(frame, 183), background: `${MINT}13`, border: `1px solid ${MINT}44`, borderRadius: 13, color: MINT, fontSize: 15, lineHeight: 1.45, marginTop: 27, padding: "18px" }}>✓ No urgent red flags reported in this synthetic check-in.</div>
          </aside>
        </div>
      </div>
    </Scene>
  );
}

function ActionScene() {
  const frame = useCurrentFrame();
  const connector = interpolate(frame, [78, 164], [0, 1], clamp);
  const nodes = [
    { key: "01", title: "TODAY’S CONTEXT", body: "Low energy · disrupted routine", color: BLUE },
    { key: "02", title: "PLAN BOUNDARY", body: "Clinician-authored fallbacks only", color: MINT },
    { key: "03", title: "APPROVED STEP", body: "10-minute walk after lunch", color: CORAL },
  ];

  return (
    <Scene duration={300}>
      <GridBackdrop />
      <div style={{ alignItems: "center", display: "grid", gap: 90, gridTemplateColumns: "0.72fr 1.28fr", height: "100%", padding: "145px 145px 115px" }}>
        <div>
          <div style={rise(frame, 4)}><Eyebrow>02 · Adapt</Eyebrow></div>
          <h2 style={{ ...rise(frame, 25, 48), fontSize: 91, fontWeight: 520, letterSpacing: "-0.06em", lineHeight: 0.96, margin: "34px 0 0" }}>
            One action.
            <br />
            <span style={{ color: CORAL, fontFamily: SERIF, fontStyle: "italic" }}>Inside the plan.</span>
          </h2>
          <p style={{ ...rise(frame, 62), color: MUTED, fontSize: 27, lineHeight: 1.58, margin: "42px 0 0", maxWidth: 610 }}>
            The model can explain the context. The clinician-authored boundary decides what it is allowed to suggest.
          </p>
          <div style={{ ...rise(frame, 108), display: "flex", flexWrap: "wrap", gap: 13, marginTop: 48 }}>
            <Pill color={MINT}>No diagnosis</Pill>
            <Pill color={BLUE}>No dose change</Pill>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div style={{ background: `${CREAM}17`, height: 3, left: 108, position: "absolute", right: 108, top: 102 }}>
            <div style={{ background: `linear-gradient(90deg, ${BLUE}, ${MINT}, ${CORAL})`, height: 4, transform: `scaleX(${connector})`, transformOrigin: "left", width: "100%" }} />
          </div>
          <div style={{ display: "grid", gap: 22, gridTemplateColumns: "repeat(3, 1fr)", position: "relative" }}>
            {nodes.map((node, index) => (
              <div key={node.key} style={{ ...rise(frame, 40 + index * 28, 46), background: NAVY_RAISED, border: `1px solid ${node.color}44`, borderRadius: 24, minHeight: 205, padding: "29px 26px", position: "relative" }}>
                <span style={{ alignItems: "center", background: node.color, borderRadius: 999, color: INK, display: "flex", fontFamily: MONO, fontSize: 17, fontWeight: 700, height: 48, justifyContent: "center", width: 48 }}>{node.key}</span>
                <strong style={{ color: node.color, display: "block", fontFamily: MONO, fontSize: 14, letterSpacing: ".1em", marginTop: 25 }}>{node.title}</strong>
                <p style={{ fontSize: 18, lineHeight: 1.4, margin: "12px 0 0" }}>{node.body}</p>
              </div>
            ))}
          </div>

          <div style={{ ...rise(frame, 133, 58), background: CREAM, borderRadius: 29, boxShadow: `0 30px 100px ${CORAL}1f`, color: INK, margin: "38px auto 0", overflow: "hidden", position: "relative" }}>
            <div style={{ background: CORAL, height: 9, left: 0, position: "absolute", right: 0, top: 0 }} />
            <div style={{ display: "grid", gap: 35, gridTemplateColumns: "155px 1fr auto", padding: "42px 44px 38px" }}>
              <div style={{ alignItems: "center", background: "#fff0ed", borderRadius: 22, color: CORAL, display: "flex", flexDirection: "column", height: 145, justifyContent: "center" }}>
                <strong style={{ fontFamily: SERIF, fontSize: 61, lineHeight: 1 }}>10</strong>
                <span style={{ fontFamily: MONO, fontSize: 13, letterSpacing: ".1em" }}>MINUTES</span>
              </div>
              <div style={{ alignSelf: "center" }}>
                <span style={{ color: "#9b4d46", fontFamily: MONO, fontSize: 14, letterSpacing: ".11em" }}>CLINICIAN-APPROVED FALLBACK</span>
                <h3 style={{ fontSize: 38, letterSpacing: "-0.035em", margin: "13px 0 0" }}>Walk after lunch.</h3>
                <p style={{ color: "#60737d", fontSize: 18, margin: "12px 0 0" }}>Then check in at 15:00 to see whether it helped.</p>
              </div>
              <div style={{ alignItems: "flex-end", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Pill color={MINT} dark>Within plan</Pill>
                <span style={{ color: "#71838b", fontFamily: MONO, fontSize: 12, marginTop: 17 }}>LOW INTENSITY</span>
              </div>
            </div>
            <div style={{ background: "#e9efed", color: "#526873", display: "flex", fontSize: 16, gap: 21, padding: "18px 44px" }}>
              <strong style={{ color: INK }}>Why this step?</strong>
              It fits today’s context and is one of Maya’s pre-approved alternatives.
            </div>
          </div>
        </div>
      </div>
    </Scene>
  );
}

function CheckScene() {
  const frame = useCurrentFrame();
  const circle = interpolate(frame, [12, 170], [-30, 90], clamp);
  const route = interpolate(frame, [118, 205], [0, 1], clamp);

  const checkpoints = [
    { label: "Action completed", detail: "10-minute fallback logged", color: MINT, icon: "✓" },
    { label: "Response checked", detail: "Follow-up at 15:00", color: BLUE, icon: "↻" },
    { label: "Threshold persists", detail: "Stop adapting", color: CORAL, icon: "!" },
  ];

  return (
    <Scene duration={270} background="#0a1a26">
      <GridBackdrop />
      <div style={{ height: "100%", padding: "132px 145px 105px" }}>
        <div style={{ ...rise(frame, 3), alignItems: "flex-end", display: "flex", justifyContent: "space-between" }}>
          <div><Eyebrow>03 · Check the response</Eyebrow><h2 style={{ fontSize: 78, fontWeight: 520, letterSpacing: "-0.055em", margin: "24px 0 0" }}>The action happened. The signal persisted.</h2></div>
          <p style={{ color: MUTED, fontSize: 22, lineHeight: 1.5, margin: 0, maxWidth: 400, textAlign: "right" }}>A closed loop knows when to stop adapting and bring in a human.</p>
        </div>

        <div style={{ alignItems: "center", display: "grid", gap: 58, gridTemplateColumns: "1fr 180px 510px", marginTop: 65 }}>
          <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(3, 1fr)" }}>
            {checkpoints.map((checkpoint, index) => (
              <div key={checkpoint.label} style={{ ...rise(frame, 34 + index * 25, 45), background: NAVY_RAISED, border: `1px solid ${checkpoint.color}44`, borderRadius: 22, minHeight: 330, padding: "31px 27px" }}>
                <span style={{ alignItems: "center", border: `2px solid ${checkpoint.color}`, borderRadius: 999, color: checkpoint.color, display: "flex", fontFamily: MONO, fontSize: 27, height: 67, justifyContent: "center", width: 67 }}>{checkpoint.icon}</span>
                <span style={{ color: checkpoint.color, display: "block", fontFamily: MONO, fontSize: 13, letterSpacing: ".1em", marginTop: 45 }}>0{index + 1}</span>
                <h3 style={{ fontSize: 26, lineHeight: 1.2, margin: "13px 0 0" }}>{checkpoint.label}</h3>
                <p style={{ color: MUTED, fontSize: 17, lineHeight: 1.45, margin: "15px 0 0" }}>{checkpoint.detail}</p>
              </div>
            ))}
          </div>

          <div style={{ alignItems: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ border: `1px solid ${CORAL}66`, borderRadius: 999, height: 128, position: "relative", transform: `rotate(${circle}deg)`, width: 128 }}>
              <span style={{ background: CORAL, borderRadius: 999, height: 18, left: 16, position: "absolute", top: 3, width: 18 }} />
              <span style={{ background: BLUE, borderRadius: 999, bottom: 10, height: 12, position: "absolute", right: 9, width: 12 }} />
            </div>
            <span style={{ color: CORAL_SOFT, fontFamily: MONO, fontSize: 12, letterSpacing: ".1em", marginTop: 20, textAlign: "center" }}>DETERMINISTIC<br />ROUTE</span>
          </div>

          <div style={{ ...slide(frame, 112, 70), background: CORAL, borderRadius: 28, color: INK, overflow: "hidden", position: "relative" }}>
            <div style={{ background: INK, height: 7, left: 0, position: "absolute", top: 0, transform: `scaleX(${route})`, transformOrigin: "left", width: "100%" }} />
            <div style={{ padding: "42px 41px 36px" }}>
              <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 700, letterSpacing: ".12em" }}>HUMAN LOOP</span>
              <h3 style={{ fontFamily: SERIF, fontSize: 51, fontStyle: "italic", lineHeight: 1.03, margin: "27px 0 0" }}>Review, with the evidence attached.</h3>
              <p style={{ fontSize: 18, lineHeight: 1.48, margin: "25px 0 0" }}>No diagnosis. No medication change. A concise handoff goes to the care team.</p>
            </div>
            <div style={{ background: `${INK}12`, display: "flex", fontFamily: MONO, fontSize: 13, gap: 22, padding: "19px 41px" }}><span>↗ REVIEW ROUTE</span><span>WITHIN 24 HOURS</span></div>
          </div>
        </div>
      </div>
    </Scene>
  );
}

function HandoffScene() {
  const frame = useCurrentFrame();
  const items = [
    ["14:31", "Context captured", "Poor sleep · fatigue · disrupted routine"],
    ["14:34", "Approved fallback accepted", "10-minute walk after lunch"],
    ["14:50", "Threshold still exceeded", "Human review rule triggered"],
  ];

  return (
    <Scene duration={330} background={CREAM}>
      <GridBackdrop light />
      <div style={{ color: INK, height: "100%", padding: "120px 120px 86px" }}>
        <div style={{ ...rise(frame, 3), alignItems: "center", display: "flex", justifyContent: "space-between" }}>
          <Brand compact dark />
          <div style={{ alignItems: "center", display: "flex", gap: 20 }}><span style={{ color: "#657984", fontFamily: MONO, fontSize: 13 }}>CARE TEAM · EXCEPTION QUEUE</span><Pill color={CORAL} dark>1 needs review</Pill></div>
        </div>

        <div style={{ display: "grid", gap: 45, gridTemplateColumns: "440px 1fr", marginTop: 43 }}>
          <aside style={{ ...rise(frame, 25, 40), background: INK, borderRadius: 26, color: CREAM, minHeight: 800, padding: "43px 36px" }}>
            <Eyebrow>04 · Connect</Eyebrow>
            <h2 style={{ fontSize: 67, fontWeight: 520, letterSpacing: "-0.055em", lineHeight: 0.98, margin: "38px 0 0" }}>Signal,
              <br /><span style={{ color: CORAL, fontFamily: SERIF, fontStyle: "italic" }}>not noise.</span>
            </h2>
            <p style={{ color: MUTED, fontSize: 21, lineHeight: 1.55, margin: "34px 0 0" }}>The care team sees the trend, context, attempted action, response, and safety status—without reconstructing the story.</p>
            <div style={{ borderTop: `1px solid ${CREAM}22`, marginTop: 45, paddingTop: 32 }}>
              {["Evidence linked", "Boundary shown", "Human owns decision"].map((text, index) => (
                <div key={text} style={{ ...slide(frame, 86 + index * 18, 28), alignItems: "center", display: "flex", fontSize: 18, gap: 15, marginBottom: 22 }}><span style={{ alignItems: "center", background: index === 2 ? CORAL : MINT, borderRadius: 999, color: INK, display: "flex", fontSize: 15, height: 30, justifyContent: "center", width: 30 }}>✓</span>{text}</div>
              ))}
            </div>
            <div style={{ background: `${CORAL}20`, border: `1px solid ${CORAL}50`, borderRadius: 16, color: CORAL_SOFT, fontSize: 16, lineHeight: 1.45, marginTop: 38, padding: "22px" }}>Prototype uses synthetic patient data. Clinical decisions remain with the care team.</div>
          </aside>

          <main style={{ ...rise(frame, 43, 52), background: PAPER, border: "1px solid #d7dedc", borderRadius: 26, boxShadow: "0 28px 80px rgba(7,21,33,.12)", minHeight: 800, overflow: "hidden" }}>
            <div style={{ alignItems: "center", borderBottom: "1px solid #dbe1de", display: "flex", justifyContent: "space-between", padding: "31px 35px" }}>
              <div style={{ alignItems: "center", display: "flex", gap: 16 }}><span style={{ alignItems: "center", background: BLUE, borderRadius: 999, display: "flex", fontWeight: 700, height: 52, justifyContent: "center", width: 52 }}>MP</span><span><strong style={{ display: "block", fontSize: 20 }}>Maya Patel</strong><small style={{ color: "#6a7e88", display: "block", fontSize: 14, marginTop: 5 }}>Type 2 diabetes · synthetic demo</small></span></div>
              <Pill color={CORAL} dark>Review within 24h</Pill>
            </div>
            <div style={{ padding: "30px 34px" }}>
              <div style={{ background: "#fff0ed", border: `1px solid ${CORAL}4d`, borderRadius: 18, padding: "25px 28px" }}>
                <span style={{ color: "#9e4f48", fontFamily: MONO, fontSize: 13, letterSpacing: ".1em" }}>AI-GENERATED HANDOFF</span>
                <h3 style={{ fontSize: 33, letterSpacing: "-0.03em", margin: "14px 0 0" }}>Upward trend persists after approved fallback.</h3>
                <p style={{ color: "#5e7079", fontSize: 17, lineHeight: 1.52, margin: "15px 0 0" }}>Maya reported fatigue and a disrupted routine. She completed the 10-minute activity fallback, but her reading remains outside her clinician-set personal range.</p>
                <div style={{ display: "flex", gap: 10, marginTop: 19 }}><Pill color={MINT} dark>No urgent flags reported</Pill><Pill color={BLUE} dark>No medication advice</Pill></div>
              </div>

              <div style={{ display: "grid", gap: 18, gridTemplateColumns: "1.22fr .78fr", marginTop: 19 }}>
                <section style={{ border: "1px solid #dce2df", borderRadius: 18, padding: "23px 25px" }}>
                  <span style={{ color: "#637782", fontFamily: MONO, fontSize: 12, letterSpacing: ".1em" }}>EVIDENCE TIMELINE</span>
                  <div style={{ marginTop: 17 }}>
                    {items.map(([time, title, body], index) => (
                      <div key={time} style={{ ...slide(frame, 92 + index * 18, 30), display: "grid", gap: 15, gridTemplateColumns: "64px 1fr", marginBottom: 14 }}>
                        <span style={{ alignItems: "center", background: index === 2 ? "#fff0ed" : "#eaf0ee", borderRadius: 999, color: index === 2 ? "#aa4d46" : "#637780", display: "flex", fontFamily: MONO, fontSize: 11, height: 48, justifyContent: "center", width: 48 }}>{time}</span>
                        <span style={{ borderBottom: index < items.length - 1 ? "1px solid #e0e5e2" : "none", paddingBottom: 13 }}><strong style={{ display: "block", fontSize: 16 }}>{title}</strong><small style={{ color: "#6f818a", display: "block", fontSize: 13, marginTop: 5 }}>{body}</small></span>
                      </div>
                    ))}
                  </div>
                </section>

                <section style={{ border: "1px solid #dce2df", borderRadius: 18, padding: "23px 25px" }}>
                  <span style={{ color: "#637782", fontFamily: MONO, fontSize: 12, letterSpacing: ".1em" }}>RELEVANT SIGNALS</span>
                  <div style={{ marginTop: 16 }}>
                    {[["Glucose", "8.2", "mmol/L", CORAL], ["Sleep", "4h 50m", "", BLUE], ["Movement", "2,190", "steps", AMBER]].map(([label, value, unit, color], index) => (
                      <div key={String(label)} style={{ ...rise(frame, 106 + index * 17), borderBottom: index < 2 ? "1px solid #dfe5e2" : "none", padding: "15px 0" }}><span style={{ color: "#6b7e87", display: "block", fontSize: 13 }}>{label}</span><strong style={{ color: String(color), display: "block", fontFamily: MONO, fontSize: 24, marginTop: 6 }}>{value} <small style={{ color: "#778992", fontSize: 10 }}>{unit}</small></strong></div>
                    ))}
                  </div>
                </section>
              </div>
              <div style={{ ...rise(frame, 171), alignItems: "center", borderTop: "1px solid #dce2df", display: "flex", justifyContent: "space-between", marginTop: 24, paddingTop: 22 }}><div><span style={{ color: "#667984", fontFamily: MONO, fontSize: 12 }}>SUGGESTED HUMAN NEXT STEP</span><p style={{ fontSize: 16, margin: "7px 0 0" }}>Review the trend and send a non-urgent check-in.</p></div><span style={{ background: INK, borderRadius: 11, color: CREAM, fontSize: 16, fontWeight: 700, padding: "16px 24px" }}>Add to review →</span></div>
            </div>
          </main>
        </div>
      </div>
    </Scene>
  );
}

function EndScene() {
  const frame = useCurrentFrame();
  const glow = interpolate(frame, [0, 150], [0.72, 1.13], clamp);
  const underline = interpolate(frame, [100, 176], [0, 1], clamp);

  return (
    <Scene duration={240}>
      <GridBackdrop />
      <div style={{ background: `radial-gradient(circle, ${CORAL}35 0%, ${CORAL}00 67%)`, height: 1000, left: "50%", position: "absolute", top: "49%", transform: `translate(-50%, -50%) scale(${glow})`, width: 1000 }} />
      <div style={{ alignItems: "center", display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", padding: "100px 150px", position: "relative", textAlign: "center" }}>
        <div style={rise(frame, 5)}><Brand /></div>
        <h2 style={{ ...rise(frame, 24, 50), fontSize: 101, fontWeight: 520, letterSpacing: "-0.06em", lineHeight: 0.98, margin: "54px 0 0", maxWidth: 1450 }}>
          One hard day should not become
          <br />
          <span style={{ color: CORAL, fontFamily: SERIF, fontStyle: "italic" }}>a hard month.</span>
        </h2>
        <p style={{ ...rise(frame, 60), color: MUTED, fontSize: 28, lineHeight: 1.5, margin: "39px 0 0", maxWidth: 900 }}>
          Notice early drift. Offer one clinician-approved next step. Connect the human when a human is needed.
        </p>
        <div style={{ ...rise(frame, 92, 42), background: CREAM, borderRadius: 18, color: INK, marginTop: 50, minWidth: 780, padding: "24px 31px 21px", position: "relative" }}>
          <span style={{ color: "#607581", display: "block", fontFamily: MONO, fontSize: 13, letterSpacing: ".1em" }}>TRY THE LIVE INTERACTIVE PROTOTYPE</span>
          <strong style={{ display: "block", fontFamily: MONO, fontSize: 31, letterSpacing: "-0.025em", marginTop: 10 }}>https://{LIVE_URL} ↗</strong>
          <span style={{ background: CORAL, bottom: 0, height: 5, left: 0, position: "absolute", transform: `scaleX(${underline})`, transformOrigin: "left", width: "100%" }} />
        </div>
        <div style={{ ...rise(frame, 130), color: "#718691", display: "flex", fontFamily: MONO, fontSize: 13, gap: 24, letterSpacing: ".08em", marginTop: 32, textTransform: "uppercase" }}>
          <span>Prototype only</span><span>·</span><span>Synthetic data</span><span>·</span><span>Not medical advice</span>
        </div>
      </div>
    </Scene>
  );
}

function GlobalChrome() {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, TOTAL_FRAMES - 1], [0, 1], clamp);
  const chapter = frame < 180
    ? "INTRO"
    : frame < 450
      ? "THE GAP"
      : frame < 750
        ? "NOTICE"
        : frame < 1020
          ? "ADAPT"
          : frame < 1260
            ? "CHECK"
            : frame < 1560
              ? "CONNECT"
              : "LIVE PROTOTYPE";

  return (
    <>
      <div style={{ alignItems: "center", color: frame >= 1260 && frame < 1560 ? "#657983" : MUTED, display: "flex", fontFamily: MONO, fontSize: 12, justifyContent: "space-between", left: 46, letterSpacing: ".12em", position: "absolute", right: 46, top: 35, zIndex: 50 }}>
        <span>BETWEEN / 60-SECOND PITCH</span>
        <span>{chapter}</span>
      </div>
      <div style={{ background: frame >= 1260 && frame < 1560 ? "#d5ddda" : `${CREAM}1f`, bottom: 0, height: 7, left: 0, position: "absolute", right: 0, zIndex: 50 }}>
        <div style={{ background: CORAL, height: "100%", transform: `scaleX(${progress})`, transformOrigin: "left", width: "100%" }} />
      </div>
    </>
  );
}

// Start of each narration clip, a beat after its scene fades in.
export const VOICEOVER_CLIPS = [
  { file: "voiceover/01-intro.mp3", from: 10 },
  { file: "voiceover/02-problem.mp3", from: 195 },
  { file: "voiceover/03-notice.mp3", from: 465 },
  { file: "voiceover/04-adapt.mp3", from: 765 },
  { file: "voiceover/05-check.mp3", from: 1035 },
  { file: "voiceover/06-connect.mp3", from: 1275 },
  { file: "voiceover/07-end.mp3", from: 1575 },
];

export function BetweenCarePitch({ voiceover = false }: { voiceover?: boolean }) {
  return (
    <AbsoluteFill style={{ background: NAVY }}>
      {voiceover &&
        VOICEOVER_CLIPS.map((clip) => (
          <Sequence key={clip.file} from={clip.from}>
            <Audio src={staticFile(clip.file)} />
          </Sequence>
        ))}
      <Sequence from={0} durationInFrames={210} premountFor={FPS}>
        <IntroScene />
      </Sequence>
      <Sequence from={180} durationInFrames={300} premountFor={FPS}>
        <ProblemScene />
      </Sequence>
      <Sequence from={450} durationInFrames={330} premountFor={FPS}>
        <DriftScene />
      </Sequence>
      <Sequence from={750} durationInFrames={300} premountFor={FPS}>
        <ActionScene />
      </Sequence>
      <Sequence from={1020} durationInFrames={270} premountFor={FPS}>
        <CheckScene />
      </Sequence>
      <Sequence from={1260} durationInFrames={330} premountFor={FPS}>
        <HandoffScene />
      </Sequence>
      <Sequence from={1560} durationInFrames={240} premountFor={FPS}>
        <EndScene />
      </Sequence>
      <GlobalChrome />
    </AbsoluteFill>
  );
}
