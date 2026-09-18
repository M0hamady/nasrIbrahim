"use client";
import { stages,StageId } from "@/lib/curriculum";
export default function StageSelector({value,onChange}:{value:StageId;onChange:(id:StageId)=>void}){return <div className="stage-tabs" role="tablist">{stages.map(stage=><button key={stage.id} className={stage.id===value?"active":""} onClick={()=>onChange(stage.id)}>{stage.label}<small>{stage.age}</small></button>)}</div>}
