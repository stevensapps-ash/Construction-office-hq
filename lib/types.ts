export type Customer={id:string;name:string;phone:string;email:string;address:string};
export type Project={id:string;customerId:string;name:string;status:"Lead"|"Estimate"|"Active"|"Complete";total:number;createdAt:string};
export type EstimateItem={id:string;description:string;qty:number;unitCost:number;type:"Material"|"Labor"|"Other"};
export type Estimate={id:string;projectId:string;items:EstimateItem[];status:"Draft"|"Sent"|"Approved";createdAt:string};