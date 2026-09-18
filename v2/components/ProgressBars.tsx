"use client";
import { useProgress } from "@/context/ProgressContext";
export default function ProgressBars(){const {progress}=useProgress();return <div className="progress-list">{progress.map(p=><div key={p.subject} className="progress-row"><div className="progress-label"><span>{p.subject}</span><strong>{p.score}%</strong></div><div className="bar"><span style={{width:\`\${p.score}%\`}}/></div><small>{p.attempts} activities · {p.minutes} min</small></div>)}</div>}
