const BASE="https://api.moov.io";
const VERSION="v2026.07.00";
export async function moovToken(){
 const id=process.env.MOOV_PUBLIC_KEY, secret=process.env.MOOV_SECRET_KEY, origin=process.env.MOOV_ORIGIN;
 if(!id||!secret||!origin) throw new Error("Moov credentials are not configured.");
 const res=await fetch(BASE+"/oauth2/token",{method:"POST",headers:{"Content-Type":"application/json","Origin":origin,"X-Moov-Version":VERSION},body:JSON.stringify({grant_type:"client_credentials",client_id:id,client_secret:secret,scope:"/accounts.read /accounts.write /accounts/*/transfers.read /accounts/*/transfers.write"})});
 if(!res.ok) throw new Error("Moov authentication failed: "+await res.text());
 return (await res.json()).access_token as string;
}
export async function createPaymentLink(input:{amountCents:number;title:string;description:string;maxUses?:number}){
 const accountID=process.env.MOOV_ACCOUNT_ID, partnerAccountID=process.env.MOOV_PARTNER_ACCOUNT_ID, merchantPaymentMethodID=process.env.MOOV_MERCHANT_PAYMENT_METHOD_ID;
 if(!accountID||!partnerAccountID||!merchantPaymentMethodID) throw new Error("Moov account configuration is incomplete.");
 const token=await moovToken();
 const res=await fetch(BASE+`/accounts/${accountID}/payment-links`,{method:"POST",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json","X-Moov-Version":VERSION},body:JSON.stringify({partnerAccountID,merchantPaymentMethodID,amount:{currency:"USD",value:input.amountCents},display:{title:input.title,description:input.description,callToAction:"pay"},customer:{requirePhone:false,tippingEnabled:false},payment:{allowedMethods:["card-payment","ach-debit-fund"]},maxUses:input.maxUses??1})});
 if(!res.ok) throw new Error("Moov payment link failed: "+await res.text());
 return res.json();
}
