"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, db, firebaseReady } from "@/lib/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export type Role="parent"|"teacher"|"student";
export type AppUser={uid:string;email:string;name:string;role:Role};
type AuthValue={user:AppUser|null;loading:boolean;isDemo:boolean;login:(email:string,password:string)=>Promise<void>;register:(name:string,email:string,password:string,role:Role)=>Promise<void>;logout:()=>Promise<void>};
const AuthContext=createContext<AuthValue|null>(null);
const DEMO_KEY="esraa-demo-user-v2";

export function AuthProvider({children}:{children:React.ReactNode}){
  const [user,setUser]=useState<AppUser|null>(null);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    if(!firebaseReady||!auth){const saved=localStorage.getItem(DEMO_KEY);if(saved)setUser(JSON.parse(saved));setLoading(false);return;}
    return onAuthStateChanged(auth,async(firebaseUser)=>{
      if(!firebaseUser){setUser(null);setLoading(false);return;}
      const fallback:AppUser={uid:firebaseUser.uid,email:firebaseUser.email??"",name:firebaseUser.displayName??"Learner",role:"student"};
      if(!db){setUser(fallback);setLoading(false);return;}
      const snap=await getDoc(doc(db,"users",firebaseUser.uid));
      setUser(snap.exists()?(snap.data() as AppUser):fallback);setLoading(false);
    });
  },[]);
  const login=async(email:string,password:string)=>{
    if(firebaseReady&&auth){await signInWithEmailAndPassword(auth,email,password);return;}
    const demo:AppUser={uid:"demo-user",email,name:email.split("@")[0]||"Demo Learner",role:email.toLowerCase().includes("parent")?"parent":email.toLowerCase().includes("teacher")?"teacher":"student"};
    localStorage.setItem(DEMO_KEY,JSON.stringify(demo));setUser(demo);
  };
  const register=async(name:string,email:string,password:string,role:Role)=>{
    if(firebaseReady&&auth){const cred=await createUserWithEmailAndPassword(auth,email,password);await updateProfile(cred.user,{displayName:name});const profile:AppUser={uid:cred.user.uid,email,name,role};if(db)await setDoc(doc(db,"users",cred.user.uid),profile,{merge:true});setUser(profile);return;}
    const demo:AppUser={uid:\`demo-\${Date.now()}\`,email,name,role};localStorage.setItem(DEMO_KEY,JSON.stringify(demo));setUser(demo);
  };
  const logout=async()=>{if(firebaseReady&&auth)await firebaseSignOut(auth);localStorage.removeItem(DEMO_KEY);setUser(null);};
  const value=useMemo(()=>({user,loading,isDemo:!firebaseReady,login,register,logout}),[user,loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth(){const value=useContext(AuthContext);if(!value)throw new Error("useAuth must be used inside AuthProvider");return value;}
