"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { site } from "@/lib/site";
export default function Navbar(){
 const [open,setOpen]=useState(false);const {user,logout,isDemo}=useAuth();
 return <header className="nav-shell"><nav className="nav wrap" aria-label="Main navigation">
  <Link href="/" className="brand"><span className="brand-mark">E</span><span>{site.shortName}</span></Link>
  <button className="menu-btn" aria-label="Toggle menu" onClick={()=>setOpen(!open)}>☰</button>
  <div className={\`nav-links \${open?"open":""}\`}><Link href="/learn">Learning paths</Link><Link href="/numbers">Numbers</Link><Link href="/letters">Letters</Link><Link href="/science">Science</Link><Link href="/cv">Teacher CV</Link>{user&&<Link href={user.role==="parent"?"/parent":user.role==="teacher"?"/teacher":"/dashboard"}>Dashboard</Link>}</div>
  <div className="nav-actions">{isDemo&&<span className="demo-pill">Demo mode</span>}{user?<button className="ghost-btn" onClick={()=>logout()}>Sign out</button>:<Link href="/login" className="primary-btn small">Sign in</Link>}</div>
 </nav></header>
}
