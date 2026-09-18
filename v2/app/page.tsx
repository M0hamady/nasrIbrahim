import Link from "next/link";
import { site } from "@/lib/site";
import { stages } from "@/lib/curriculum";

export default function Home() {
  return <>
    <section className="hero-home">
      <div className="wrap hero-grid">
        <div className="hero-copy"><span className="eyebrow">Early Years · Primary · Family Progress</span><h1>Learn with wonder.<br/><span>Grow with confidence.</span></h1><p>{site.description}</p><div className="button-row"><Link href="/learn" className="primary-btn">Explore learning paths</Link><Link href="/cv" className="ghost-btn">Meet Teacher Esraa</Link></div><div className="trust-row"><span>✓ Child-first design</span><span>✓ Parent reports</span><span>✓ Smart practice</span></div></div>
        <div className="hero-visual"><div className="orbit big">🔬</div><div className="orbit one">🔤</div><div className="orbit two">🔢</div><div className="orbit three">🌍</div><div className="hero-child">🧒<span>“I can do it!”</span></div></div>
      </div>
    </section>
    <section className="wrap section"><div className="section-head"><span className="eyebrow">One journey, designed by age</span><h2>From FS1 to Grade 6</h2><p>Visual and playful for little learners, gradually more independent and project-led as children grow.</p></div><div className="stage-grid">{stages.map((s) => <Link href={\`/learn?stage=\${s.id}\`} key={s.id} className={\`stage-card \${s.phase}\`}><span className="stage-icon">{s.phase === "early" ? "🌈" : s.phase === "lower" ? "🌱" : s.phase === "middle" ? "🧭" : "🚀"}</span><h3>{s.label}</h3><small>Ages {s.age}</small><p>{s.focus}</p><b>{s.subjects.length} learning areas →</b></Link>)}</div></section>
    <section className="feature-band"><div className="wrap feature-grid"><div><span className="eyebrow">For children</span><h2>Learning feels like an adventure.</h2><p>Short missions, audio-friendly prompts, large touch targets, visual feedback and age-aware themes.</p><Link href="/science" className="text-link">Try a science mission →</Link></div><div className="feature-card"><span>🎯</span><h3>Adaptive next step</h3><p>Practice suggestions react to recent subject performance.</p></div><div className="feature-card"><span>👨‍👩‍👧</span><h3>Parent clarity</h3><p>See time, attempts, accuracy, strengths and recommended focus in one view.</p></div></div></section>
    <section className="wrap section"><div className="section-head"><span className="eyebrow">Start fast</span><h2>Three popular learning doors</h2></div><div className="door-grid"><Link className="door numbers" href="/numbers"><span>🔢</span><h3>Numbers</h3><p>Counting, number sense and quick games.</p></Link><Link className="door letters" href="/letters"><span>🔤</span><h3>Letters</h3><p>Sounds, phonics and early reading confidence.</p></Link><Link className="door science" href="/science"><span>🔬</span><h3>Science</h3><p>Observe, ask, test and explain.</p></Link></div></section>
  </>;
}