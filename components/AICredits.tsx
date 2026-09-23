"use client";
import {useEffect,useState} from "react";
type Ledger={purchased:number,used:number};
const KEY="cohq-ai-ledger";
const packs=[{credits:100,price:15},{credits:250,price:30},{credits:500,price:50},{credits:1200,price:100}];
export default function AICredits(){
 const [ledger,setLedger]=useState<Ledger>({purchased:0,used:0});
 useEffect(()=>{try{const x=localStorage.getItem(KEY);if(x)setLedger(JSON.parse(x))}catch{}},[]);
 const remaining=Math.max(0,ledger.purchased-ledger.used);
 return <div className="module"><div className="moduleTop"><div><h2>AI Credits & Profit Controls</h2><p>AI is prepaid. Customer requests stop when their paid credit balance reaches zero.</p></div></div>
 <div className="stats"><article className="card"><strong>{remaining}</strong><span>Credits remaining</span></article><article className="card"><strong>{ledger.used}</strong><span>Credits used</span></article><article className="card"><strong>0</strong><span>Unfunded AI requests allowed</span></article></div>
 <article><div className="head"><h3>Prepaid credit packs</h3></div><div className="creditPacks">{packs.map(p=><div className="creditPack" key={p.credits}><b>{p.credits} credits</b><strong>${p.price}</strong><span>Payment checkout will activate this pack.</span><button disabled>Buy credits</button></div>)}</div></article>
 <article className="profitRule"><h3>Hard cost protection</h3><p>Production rule: verify successful payment → add credits → reserve credits before every AI request → reject the request if balance is insufficient → record actual usage. Never allow a negative credit balance.</p><p><b>Important:</b> these buttons stay disabled until the payment provider and server-side AI gateway are connected. Client-side code must never contain the AI API secret.</p></article></div>
}