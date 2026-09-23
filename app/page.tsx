"use client";
import {useState} from "react";
import {HardHat,LayoutDashboard,FileText,Receipt,FolderKanban,CalendarDays,NotebookPen,Search,Plus,ClipboardSignature,Ruler,Settings,Users} from "lucide-react";
import CustomerManager from "@/components/CustomerManager";
import EstimateBuilder from "@/components/EstimateBuilder";
import ProjectManager from "@/components/ProjectManager";
import ContractManager from "@/components/ContractManager";
import NotesManager from "@/components/NotesManager";
import ScheduleManager from "@/components/ScheduleManager";
import ReceiptManager from "@/components/ReceiptManager";
import BlueprintManager from "@/components/BlueprintManager";
import ChangeOrderManager from "@/components/ChangeOrderManager";
import PermitManager from "@/components/PermitManager";
import FileCabinet from "@/components/FileCabinet";
import ApprovalManager from "@/components/ApprovalManager";
import InvoiceManager from "@/components/InvoiceManager";
import DashboardLive from "@/components/DashboardLive";
import GlobalSearch from "@/components/GlobalSearch";
import Secretary from "@/components/Secretary";
import ProjectProgress from "@/components/ProjectProgress";
import ContactBook from "@/components/ContactBook";
import ActivityLog from "@/components/ActivityLog";
import ProjectDetails from "@/components/ProjectDetails";
import SettingsPanel from "@/components/SettingsPanel";
const items=[["Dashboard",LayoutDashboard],["Secretary",Users],["Contacts",Users],["Customers",Users],["Projects",FolderKanban],["Project Details",FileText],["Progress",LayoutDashboard],["Activity",CalendarDays],["Files",FolderKanban],["Estimates",FileText],["Invoices",Receipt],["Contracts",ClipboardSignature],["Change Orders",FileText],["Approvals",ClipboardSignature],["Blueprints",Ruler],["Permits",FileText],["Receipts",Receipt],["Schedule",CalendarDays],["Notes",NotebookPen],["Settings",Settings]] as const;
export default function Home(){const [active,setActive]=useState("Dashboard");return <main><aside><div className="brand"><div className="mark"><HardHat size={25}/></div><div><b>CONSTRUCTION</b><span>OFFICE HQ</span></div></div><nav>{items.map(([n,I])=><button key={n} className={active===n?"active":""} onClick={()=>setActive(n)}><I size={19}/>{n}</button>)}</nav></aside><section><header><div><p>BUSINESS COMMAND CENTER</p><h1>{active}</h1></div><div className="actions"><GlobalSearch/><button className="primary" onClick={()=>setActive("Customers")}><Plus size={18}/> New Project</button></div></header>{active==="Secretary"?<Secretary/>:active==="Contacts"?<ContactBook/>:active==="Customers"?<CustomerManager/>:active==="Projects"?<ProjectManager/>:active==="Project Details"?<ProjectDetails/>:active==="Progress"?<ProjectProgress/>:active==="Activity"?<ActivityLog/>:active==="Files"?<FileCabinet/>:active==="Estimates"?<EstimateBuilder/>:active==="Invoices"?<InvoiceManager/>:active==="Contracts"?<ContractManager/>:active==="Change Orders"?<ChangeOrderManager/>:active==="Approvals"?<ApprovalManager/>:active==="Blueprints"?<BlueprintManager/>:active==="Permits"?<PermitManager/>:active==="Receipts"?<ReceiptManager/>:active==="Schedule"?<ScheduleManager/>:active==="Notes"?<NotesManager/>:active==="Settings"?<SettingsPanel/>:active==="Dashboard"?<DashboardLive go={setActive}/>:<ComingSoon name={active}/>}</section></main>}
function Dashboard({go}:{go:(s:string)=>void}){return <><div className="welcome"><p>WELCOME BACK</p><h2>Run your construction company from one place.</h2><span>Customer files, estimates, contracts, receipts, schedules and plans — organized around every project.</span></div><div className="stats"><Card n="—" t="Active Jobs"/><Card n="$—" t="Project Value"/><Card n="—" t="Open Estimates"/><Card n="—" t="Upcoming Jobs"/></div><div className="grid"><article><div className="head"><h3>Project Workspace</h3><button onClick={()=>go("Projects")}>View projects</button></div><Empty text="Your customer projects and files stay organized here."/></article><article><div className="head"><h3>Quick Actions</h3></div><div className="quick"><button onClick={()=>go("Estimates")}><Plus/>New Estimate</button><button onClick={()=>go("Contracts")}><ClipboardSignature/>New Contract</button><button onClick={()=>go("Blueprints")}><Ruler/>Create Blueprint</button><button onClick={()=>go("Receipts")}><Receipt/>Upload Receipt</button></div></article></div></>}
function Card({n,t}:{n:string,t:string}){return <article className="card"><strong>{n}</strong><span>{t}</span></article>}
function Empty({text}:{text:string}){return <div className="empty"><FolderKanban size={30}/><p>{text}</p></div>}
function ComingSoon({name}:{name:string}){return <div className="module"><div className="moduleTop"><div><h2>{name}</h2><p>This module is next in the build sequence.</p></div></div><Empty text={name+" workspace is being built into the project system."}/></div>}