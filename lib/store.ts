"use client";
import type {Customer,Project,Estimate} from "./types";
const keys={customers:"cohq-customers",projects:"cohq-projects",estimates:"cohq-estimates"};
function read<T>(key:string):T[]{if(typeof window==="undefined")return[];try{return JSON.parse(localStorage.getItem(key)||"[]")}catch{return[]}}
function write<T>(key:string,data:T[]){localStorage.setItem(key,JSON.stringify(data))}
export const db={customers:()=>read<Customer>(keys.customers),projects:()=>read<Project>(keys.projects),estimates:()=>read<Estimate>(keys.estimates),saveCustomers:(x:Customer[])=>write(keys.customers,x),saveProjects:(x:Project[])=>write(keys.projects,x),saveEstimates:(x:Estimate[])=>write(keys.estimates,x)};