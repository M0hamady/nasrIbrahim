"use client";
import { createContext,useContext,useEffect,useMemo,useState } from "react";
export type ProgressEntry={subject:string;score:number;attempts:number;minutes:number;updatedAt:string};
export type ChildProfile={id:string;name:string;stage:string;avatar:string};
type ProgressValue={progress:ProgressEntry[];children:ChildProfile[];record:(subject:string,score:number,minutes?:number)=>void;addChild:(name:string,stage:string)=>void;reset:()=>void};
const Context=createContext<ProgressValue|null>(null);
const PROGRESS_KEY="esraa-progress-v2",CHILDREN_KEY="esraa-children-v2";
const defaults:ProgressEntry[]=[
  {subject:"Science",score:84,attempts:5,minutes:48,updatedAt:new Date().toISOString()},
  {subject:"Maths",score:72,attempts:4,minutes:39,updatedAt:new Date().toISOString()},
  {subject:"English",score:91,attempts:6,minutes:54,updatedAt:new Date().toISOString()},
];
export function ProgressProvider({children}:{children:React.ReactNode}){
  const [progress,setProgress]=useState<ProgressEntry[]>(defaults);
  const [childrenProfiles,setChildrenProfiles]=useState<ChildProfile[]>([{id:"demo-child",name:"Young Scientist",stage:"Grade 1",avatar:"🧒"}]);
  useEffect(()=>{const p=localStorage.getItem(PROGRESS_KEY),c=localStorage.getItem(CHILDREN_KEY);if(p)setProgress(JSON.parse(p));if(c)setChildrenProfiles(JSON.parse(c));},[]);
  const record=(subject:string,score:number,minutes=8)=>setProgress(current=>{const existing=current.find(p=>p.subject===subject);const next=existing?current.map(p=>p.subject===subject?{...p,score:Math.round((p.score*p.attempts+score)/(p.attempts+1)),attempts:p.attempts+1,minutes:p.minutes+minutes,updatedAt:new Date().toISOString()}:p):[...current,{subject,score,attempts:1,minutes,updatedAt:new Date().toISOString()}];localStorage.setItem(PROGRESS_KEY,JSON.stringify(next));return next;});
  const addChild=(name:string,stage:string)=>{const child={id:\`child-\${Date.now()}\`,name,stage,avatar:["🧒","👧","👦"][childrenProfiles.length%3]};const next=[...childrenProfiles,child];setChildrenProfiles(next);localStorage.setItem(CHILDREN_KEY,JSON.stringify(next));};
  const reset=()=>{setProgress([]);localStorage.removeItem(PROGRESS_KEY);};
  const value=useMemo(()=>({progress,children:childrenProfiles,record,addChild,reset}),[progress,childrenProfiles]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useProgress(){const value=useContext(Context);if(!value)throw new Error("useProgress must be used inside ProgressProvider");return value;}
