import OpenAI from "openai";
import {NextResponse} from "next/server";
import {AI_MODEL,MIN_CREDITS_PER_REQUEST} from "@/lib/ai-pricing";
export async function POST(req:Request){
 if(!process.env.OPENAI_API_KEY)return NextResponse.json({error:"AI is not configured."},{status:503});
 const {prompt,availableCredits}=await req.json();
 if(typeof prompt!=="string"||!prompt.trim())return NextResponse.json({error:"Prompt required."},{status:400});
 if(typeof availableCredits!=="number"||availableCredits<MIN_CREDITS_PER_REQUEST)return NextResponse.json({error:"Insufficient prepaid AI credits."},{status:402});
 const client=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
 const response=await client.responses.create({model:AI_MODEL,input:prompt,max_output_tokens:1200});
 return NextResponse.json({text:response.output_text,usage:response.usage,creditsCharged:MIN_CREDITS_PER_REQUEST});
}
