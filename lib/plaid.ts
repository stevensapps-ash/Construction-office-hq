import {Configuration,PlaidApi,PlaidEnvironments,Products,CountryCode} from "plaid";
export function plaidClient(){const clientID=process.env.PLAID_CLIENT_ID,secret=process.env.PLAID_SECRET;if(!clientID||!secret)throw new Error("Plaid credentials are not configured.");const env=process.env.PLAID_ENV==="production"?"production":"sandbox";return new PlaidApi(new Configuration({basePath:PlaidEnvironments[env],baseOptions:{headers:{"PLAID-CLIENT-ID":clientID,"PLAID-SECRET":secret}}}))}
export {Products,CountryCode};
