"use client";
import { useMemo,useState } from "react";
import { useProgress } from "@/context/ProgressContext";
type Question={prompt:string;icon:string;options:string[];answer:string};
const questions:Question[]=[
 {prompt:"Which one is living?",icon:"🌱",options:["Plant","Chair","Book"],answer:"Plant"},
 {prompt:"What does a plant need?",icon:"💧",options:["Water","Toy car","Pencil"],answer:"Water"},
 {prompt:"Which can grow?",icon:"🐶",options:["Dog","Rock","Cup"],answer:"Dog"},
];
export default function InteractiveQuiz(){
 const [index,setIndex]=useState(0),[score,setScore]=useState(0),[done,setDone]=useState(false),[feedback,setFeedback]=useState("");const {record}=useProgress();const q=questions[index];const percent=useMemo(()=>Math.round((score/questions.length)*100),[score]);
 const answer=(option:string)=>{const correct=option===q.answer,nextScore=score+(correct?1:0);setScore(nextScore);setFeedback(correct?"Great thinking! ⭐":\`Good try! The answer is \${q.answer}.\`);setTimeout(()=>{setFeedback("");if(index===questions.length-1){const final=Math.round((nextScore/questions.length)*100);setDone(true);record("Science",final,5)}else setIndex(index+1)},750)};
 if(done)return <div className="quiz-result"><div className="mega-icon">🏆</div><h3>{percent>=67?"Young Scientist!":"Nice first try!"}</h3><p>Your score: <strong>{percent}%</strong></p><button className="primary-btn" onClick={()=>{setIndex(0);setScore(0);setDone(false)}}>Play again</button></div>;
 return <div className="quiz-card"><div className="quiz-top"><span>Question {index+1}/{questions.length}</span><span>{score} ⭐</span></div><div className="mega-icon">{q.icon}</div><h3>{q.prompt}</h3><div className="answer-grid">{q.options.map(o=><button key={o} onClick={()=>answer(o)}>{o}</button>)}</div>{feedback&&<div className="feedback">{feedback}</div>}</div>
}
