"use client";
import Link from "next/link";
import { Beef, ArrowUpRight } from "lucide-react";
import { useDemo } from "@/components/demo-provider";
export function Brand({invert=false,compact=false}:{invert?:boolean,compact?:boolean}){
  return <Link href="/shop" className="inline-flex items-center gap-2.5 group">
    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold-500 text-navy-950 shadow-glow"><Beef size={21} strokeWidth={2.1}/></span>
    {!compact&&<span className="leading-tight"><span className={`block text-[17px] font-extrabold tracking-[-.06em] ${invert?"text-white":"text-navy-900"}`}>boucherie<span className="text-gold-500">flow.</span></span><span className={`block text-[9px] font-extrabold uppercase tracking-[.21em] ${invert?"text-white/50":"text-slate-400"}`}>meat market OS</span></span>}
  </Link>
}
export function LanguageToggle({dark=false}:{dark?:boolean}){
  const {language,setLanguage}=useDemo();return <button aria-label="Toggle English/French" onClick={()=>setLanguage(language==="en"?"fr":"en")} className={`rounded-xl border px-3 py-2 text-xs font-extrabold transition ${dark?"border-white/20 text-white hover:bg-white/10":"border-slate-200 text-navy-900 hover:bg-gold-50"}`}>{language.toUpperCase()} <span className={dark?"text-white/40":"text-slate-400"}>/ {language==="en"?"FR":"EN"}</span></button>
}
export function DashboardLink({className=""}:{className?:string}) {return <Link href="/app" className={className}>Staff demo <ArrowUpRight size={15}/></Link>}
