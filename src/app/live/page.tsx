import Link from "next/link";

import { BetweenMark } from "@/components/between-mark";
import { LiveAiDemo } from "@/components/live-ai-demo";

export default function LivePage() {
  return (
    <main className="live-page">
      <header className="site-header live-header">
        <Link className="brand" href="/" aria-label="BETWEEN home"><BetweenMark /><strong>BETWEEN</strong></Link>
        <span className="live-header-title">REAL-TIME CARE LOOP</span>
        <Link className="header-cta" href="/"><span>←</span> Story + guided demo</Link>
      </header>
      <LiveAiDemo />
    </main>
  );
}
