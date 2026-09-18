"use client";
import { useMemo, useState } from "react";
import { useProgress } from "@/context/ProgressContext";

const speak = (text: string) => { if (typeof window !== "undefined" && "speechSynthesis" in window) { speechSynthesis.cancel(); speechSynthesis.speak(new SpeechSynthesisUtterance(text)); } };
export default function NumbersPage() {
  const { record } = useProgress(); const [max, setMax] = useState(10); const [target, setTarget] = useState(3); const [message, setMessage] = useState("Tap the number you hear.");
  const options = useMemo(() => Array.from({ length: max }, (_, i) => i + 1), [max]);
  const newRound = () => { const n = Math.floor(Math.random() * max) + 1; setTarget(n); setMessage("Listen carefully…"); setTimeout(() => speak(String(n)), 120); };
  const choose = (n: number) => { if (n === target) { setMessage("Yes! Brilliant counting ⭐"); record("Maths", 100, 3); setTimeout(newRound, 700); } else { setMessage("Almost! Count the dots and try again."); record("Maths", 55, 2); } };
  return <><section className="page-hero numbers-hero"><div className="wrap"><span className="eyebrow">Early Maths Lab</span><h1>Numbers can talk, move and play!</h1><p>Large touch targets and audio make this friendly for FS and early primary learners.</p></div></section><section className="wrap section"><div className="control-row"><button className={max === 10 ? "primary-btn small" : "ghost-btn"} onClick={() => setMax(10)}>1–10</button><button className={max === 20 ? "primary-btn small" : "ghost-btn"} onClick={() => setMax(20)}>1–20</button><button className="ghost-btn" onClick={newRound}>🔊 Hear a number</button></div><div className="number-grid">{options.map((n) => <button key={n} onClick={() => { choose(n); speak(String(n)); }} className="number-tile"><strong>{n}</strong><span>{"●".repeat(Math.min(n, 10))}</span></button>)}</div><div className="game-message">{message}</div></section></>;
}