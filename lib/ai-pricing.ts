export type AIFlow="summary"|"scope"|"change_order"|"permit"|"invoice"|"receipt"|"estimate"|"contract"|"blueprint"|"project_package";
export const AI_FLOW_PRICING:Record<AIFlow,{label:string;credits:number;tokenBudget:number}>={
 summary:{label:"Project Summary",credits:1,tokenBudget:2500},
 scope:{label:"Scope of Work",credits:2,tokenBudget:3000},
 change_order:{label:"Change Order",credits:2,tokenBudget:3000},
 permit:{label:"Permit Checklist",credits:3,tokenBudget:4000},
 invoice:{label:"Detailed Invoice",credits:3,tokenBudget:5000},
 receipt:{label:"Receipt Analysis",credits:3,tokenBudget:4000},
 estimate:{label:"AI Estimate",credits:4,tokenBudget:6000},
 contract:{label:"Contract Draft",credits:5,tokenBudget:8000},
 blueprint:{label:"Blueprint / Plan Analysis",credits:10,tokenBudget:15000},
 project_package:{label:"Full Project Package",credits:20,tokenBudget:30000}
};
export const MONTHLY_PLAN={name:"Construction Office HQ",priceCents:2999,includedCredits:100};
export const CREDIT_PACKS=[{credits:100,priceCents:1000},{credits:300,priceCents:2500},{credits:750,priceCents:5000}] as const;
export function flowCredits(flow:AIFlow){return AI_FLOW_PRICING[flow].credits}
