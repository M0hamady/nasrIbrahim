"use client";
import { useProgress } from "@/context/ProgressContext";
import { buildCoachMessage } from "@/lib/smartCoach";
export default function SmartCoach(){const {progress}=useProgress();const coach=buildCoachMessage(progress.map(p=>({subject:p.subject,score:p.score,attempts:p.attempts})));return <section className="coach-card"><div className="coach-avatar">✨</div><div><span className="eyebrow">Smart learning coach</span><h3>{coach.headline}</h3><p>{coach.message}</p><span className="coach-action">→ {coach.action}</span></div></section>}
