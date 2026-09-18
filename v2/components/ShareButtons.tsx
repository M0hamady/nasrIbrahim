"use client";
import { useState } from "react";
export default function ShareButtons({title="Esraa Learning Hub"}:{title?:string}){const [copied,setCopied]=useState(false);const share=async()=>{const url=window.location.href;if(navigator.share)await navigator.share({title,url});else{await navigator.clipboard.writeText(url);setCopied(true);setTimeout(()=>setCopied(false),1500)}};return <button className="ghost-btn" onClick={share}>{copied?"✓ Link copied":"↗ Share"}</button>}
