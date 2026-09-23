export const AI_MODEL=process.env.OPENAI_MODEL||"gpt-6-luna";
export const CREDIT_VALUE_CENTS=10;
export const MIN_CREDITS_PER_REQUEST=2;
export function creditsForEstimatedCost(costUsd:number){return Math.max(MIN_CREDITS_PER_REQUEST,Math.ceil((costUsd*100*3)/CREDIT_VALUE_CENTS));}
export const CREDIT_PACKS=[{credits:100,priceCents:1500},{credits:250,priceCents:3000},{credits:500,priceCents:5000},{credits:1200,priceCents:10000}] as const;
