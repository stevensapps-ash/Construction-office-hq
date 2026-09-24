"use client";
import {useState} from "react";
import {Search,X} from "lucide-react";
import {db} from "@/lib/store";

export default function GlobalSearch({go}:{go:(screen:string)=>void}){
  const [open,setOpen]=useState(false),[q,setQ]=useState("");
  const customers=db.customers(),projects=db.projects();
  const needle=q.trim().toLowerCase();
  const results=needle?[
    ...customers.filter(x=>(x.name+" "+x.address+" "+x.email+" "+x.phone).toLowerCase().includes(needle)).map(x=>({id:x.id,type:"Customer",name:x.name,detail:x.address||x.email||x.phone})),
    ...projects.filter(x=>(x.name+" "+x.status).toLowerCase().includes(needle)).map(x=>({id:x.id,type:"Project",name:x.name,detail:x.status}))
  ]:[];

  function openResult(type:string){
    setOpen(false); setQ("");
    go(type==="Customer"?"Customers":"Projects");
  }

  return <><button type="button" className="search" onClick={()=>setOpen(true)} aria-haspopup="dialog"><Search size={18}/> Search</button>
  {open&&<div className="searchOverlay" role="dialog" aria-modal="true" aria-label="Global search" onMouseDown={e=>{if(e.target===e.currentTarget)setOpen(false)}}>
    <div className="searchBox">
      <div className="searchInput"><Search/><input autoFocus value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>{if(e.key==="Escape")setOpen(false)}} placeholder="Search customers and projects..."/><button type="button" aria-label="Close search" onClick={()=>setOpen(false)}><X/></button></div>
      <div className="searchResults">{results.map(r=><button type="button" className="searchResult" key={r.type+"-"+r.id} onClick={()=>openResult(r.type)}><b>{r.name}</b><span>{r.type} · {r.detail}</span></button>)}{needle&&results.length===0&&<p>No matches found.</p>}</div>
    </div>
  </div>}</>;
}