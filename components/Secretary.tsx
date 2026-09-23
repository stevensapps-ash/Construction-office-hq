"use client";
import {useEffect,useMemo,useState} from "react";
import {Bot,Folder,FolderOpen,FileText,Phone,Mail,MapPin,Search,Sparkles} from "lucide-react";
import {db} from "@/lib/store";
import type {Customer,Project} from "@/lib/types";
type Doc={id:string;projectId:string;folder:string;name:string;size:number;added:string};
const readDocs=():Doc[]=>{try{return JSON.parse(localStorage.getItem("cohq-documents")||"[]")}catch{return[]}};
const folders=["Contracts","Estimates","Invoices","Change Orders","Blueprints","Permits","Receipts","Photos","Approvals","Other"];
export default function Secretary(){
 const [customers,setCustomers]=useState<Customer[]>([]),[projects,setProjects]=useState<Project[]>([]),[docs,setDocs]=useState<Doc[]>([]),[q,setQ]=useState(""),[selected,setSelected]=useState("");
 useEffect(()=>{setCustomers(db.customers());setProjects(db.projects());setDocs(readDocs())},[]);
 const tree=useMemo(()=>customers.map(c=>({...c,projects:projects.filter(p=>p.customerId===c.id)})).filter(c=>(c.name+" "+c.phone+" "+c.email+" "+c.address+" "+c.projects.map(p=>p.name).join(" ")).toLowerCase().includes(q.toLowerCase())),[customers,projects,q]);
 const project=projects.find(p=>p.id===selected),customer=project?customers.find(c=>c.id===project.customerId):undefined;
 return <div className="module secretary"><div className="moduleTop"><div><h2><Bot size={24}/> Office Secretary</h2><p>Your automatic customer filing desk. Customer → project → every important document and contact detail.</p></div></div>
 <div className="secretarySearch"><Search size={18}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Find a customer, project, phone, email or address..."/></div>
 <div className="secretaryLayout"><div className="tree">{tree.length===0?<div className="empty"><Sparkles/><p>Add a customer and the secretary will build their filing structure automatically.</p></div>:tree.map(c=><section className="customerFolder" key={c.id}><h3><FolderOpen size={19}/>{c.name}</h3><div className="contactMini"><span><Phone size={13}/>{c.phone||"No phone"}</span><span><Mail size={13}/>{c.email||"No email"}</span></div>{c.projects.map(p=><button key={p.id} className={selected===p.id?"selected":""} onClick={()=>setSelected(p.id)}><Folder size={17}/><span><b>{p.name}</b><small>{p.status} · ${p.total.toFixed(2)}</small></span></button>)}</section>)}</div>
 <div className="fileDesk">{project&&customer?<><div className="fileHeader"><div><span>CUSTOMER FILE</span><h2>{customer.name} → {project.name}</h2></div><span className="statusPill">{project.status}</span></div><div className="contactCard"><h3>Contact Information</h3><p><Phone/> {customer.phone||"Not entered"}</p><p><Mail/> {customer.email||"Not entered"}</p><p><MapPin/> {customer.address||"Not entered"}</p></div><h3>Project Documents</h3><div className="secretaryFolders">{folders.map(folder=>{const found=docs.filter(d=>d.projectId===project.id&&d.folder===folder);return <article key={folder}><Folder/><b>{folder}</b><span>{found.length} document{found.length===1?"":"s"}</span>{found.slice(0,3).map(d=><small key={d.id}><FileText size={12}/>{d.name}</small>)}</article>})}</div></>:<div className="empty secretaryEmpty"><Bot size={44}/><h3>Select a project file</h3><p>I’ll show the customer contact information and every organized project folder here.</p></div>}</div></div></div>
}