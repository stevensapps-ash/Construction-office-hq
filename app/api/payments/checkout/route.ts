import {NextResponse} from "next/server";import {createPaymentLink} from "@/lib/moov";import {CREDIT_PACKS,MONTHLY_PLAN} from "@/lib/ai-pricing";
export async function POST(req:Request){try{const {kind,credits}=await req.json();let amountCents=0,title="",description="";
 if(kind==="subscription"){amountCents=MONTHLY_PLAN.priceCents;title="Construction Office HQ";description=`${MONTHLY_PLAN.includedCredits} AI credits included with monthly software access`;}
 else if(kind==="credits"){const pack=CREDIT_PACKS.find(p=>p.credits===Number(credits));if(!pack)return NextResponse.json({error:"Invalid credit pack."},{status:400});amountCents=pack.priceCents;title=`${pack.credits} AI Credits`;description="Prepaid Construction Office HQ AI credit pack";}
 else return NextResponse.json({error:"Invalid checkout type."},{status:400});
 const link:any=await createPaymentLink({amountCents,title,description,maxUses:1});return NextResponse.json({url:link.link||link.paymentLink?.link||null});
 }catch(e:any){return NextResponse.json({error:e?.message||"Checkout failed."},{status:500})}}
