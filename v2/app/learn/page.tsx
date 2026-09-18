"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import StageSelector from "@/components/StageSelector";
import { getStage, StageId } from "@/lib/curriculum";

export default function LearnPage() {
  const search = useSearchParams();
  const requested = (search.get("stage") || "g1") as StageId;
  const [stageId, setStageId] = useState<StageId>(requested);
  useEffect(() => setStageId(requested), [requested]);
  const stage = getStage(stageId);
  return <div className={\`learning-page phase-\${stage.phase}\`}><section className="page-hero compact"><div className="wrap"><span className="eyebrow">Curriculum explorer</span><h1>{stage.label} Learning Path</h1><p>Ages {stage.age} · {stage.focus}</p></div></section><section className="wrap section"><StageSelector value={stageId} onChange={setStageId}/><div className="subject-grid">{stage.subjects.map((subject) => <article key={subject.id} className="subject-card"><div className="subject-title"><span>{subject.icon}</span><div><h2>{subject.title}</h2><p>{subject.description}</p></div></div><div className="unit-list">{subject.units.map((unit, i) => <div className="unit" key={unit.title}><div className="unit-number">{unit.icon}</div><div><strong>{unit.title}</strong><ul>{unit.outcomes.map((o) => <li key={o}>{o}</li>)}</ul></div><span className="lesson-count">Mission {i + 1}</span></div>)}</div></article>)}</div><div className="source-note"><strong>Curriculum note:</strong> This is an original scope-and-sequence designed to align with the enquiry-led, skills-based approach used across international primary programmes. It does not reproduce Oxford University Press textbook content.</div></section></div>;
}