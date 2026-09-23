"use client";
import {useEffect,useMemo,useState} from "react";
import {ChevronLeft,Folder,FolderOpen,FileText,Phone,Mail,MapPin,Search,UserRound} from "lucide-react";
import {db} from "@/lib/store";import type {Customer,Project} from "@/lib/types";
type Doc={id:string;projectId:string;folder:string;name:string;size:number;added:string};
const readDocs=():Doc[]=>{try{return JSON.parse(localStorage.getItem("cohq-documents")||"[]")}catch{return[]}};
const categories=["Contracts","Estimates","Invoices","Change Orders","Blueprints","Permits","Receipts","Photos","Approvals","Other"];
export default function Secretary(){
 const [customers,setCustomers]=useState<Customer[]>([]),[projects,setProjects]=useState<Project[]>([]),[docs,setDocs]=useState<Doc[]>([]),[customerId,setCustomerId]=useState(""),[projectId,setProjectId]=useState(""),[q,setQ]=useState("");
 useEffect(()=>{setCustomers(db.customers());setProjects(db.projects());setDocs(readDocs())},[]);
 const customer=customers.find(x=>x.id===customerId),project=projects.find(x=>x.id===projectId);
 const visibleCustomers=useMemo(()=>customers.filter(c=>(c.name+" "+c.phone+" "+c.email+" "+c.address).toLowerCase().includes(q.toLowerCase())),[customers,q]);
 const customerProjects=projects.filter(p=>p.customerId===customerId&&p.name.toLowerCase().includes(q.toLowerCase()));
 function back(){if(projectId)setProjectId("");else setCustomerId("")}
 return <div className="module secretaryFiles"><div className="fileBrowserTop"><button className="backBtn" disabled={!customerId&&!projectId} onClick={back}><ChevronLeft/></button><div><small>OFFICE SECRETARY</small><h2>{project?.name||customer?.name||"Customer Files"}</h2></div></div><div className="secretarySearch"><Search/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search files..."/></div>
 {!customerId?<><div className="folderBrowser">{visibleCustomers.map(c=>{const count=projects.filter(p=>p.customerId===c.id).length;return <button className="bigFolder" key={c.id} onClick={()=>{setCustomerId(c.id);setQ("")}}><FolderOpen/><b>{c.name}</b><span>{count} project{count===1?"":"s"}</span></button>})}</div>{visibleCustomers.length===0&&<div className="empty"><UserRound/><p>No customer folders yet.</p></div>}</>:
 !projectId?<><div className="customerContact"><h3>{customer?.name} — Contact Information</h3><span><Phone/>{customer?.phone||"No phone"}</span><span><Mail/>{customer?.email||"No email"}</span><span><MapPin/>{customer?.address||"No address"}</span></div><div className="folderBrowser">{customerProjects.map(p=><button className="bigFolder" key={p.id} onClick={()=>{setProjectId(p.id);setQ("")}}><Folder/><b>{p.name}</b><span>{docs.filter(d=>d.projectId===p.id).length} documents · {p.status}</span></button>)}</div>{customerProjects.length===0&&<div className="empty"><Folder/><p>No projects for this customer yet.</p></div>}</>:
 <><div className="projectSummary"><div><small>PROJECT FILE</small><h3>{customer?.name} / {project.name}</h3></div><b>${project.total.toFixed(2)}</b></div><div className="folderBrowser projectCategories">{categories.map(cat=>{const files=docs.filter(d=>d.projectId===project.id&&d.folder===cat);return <div className="bigFolder categoryFolder" key={cat}><Folder/><b>{cat}</b><span>{files.length} item{files.length===1?"":"s"}</span>{files.map(f=><small key={f.id}><FileText/>{f.name}</small>)}</div>})}</div></>}</div>
}