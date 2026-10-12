"use client";
import React,{createContext,useContext,useEffect,useState,useCallback} from "react";
import {Customer,DemoData,initialData,Notification,Order,OrderStatus,Product,StoreSettings,uid,dateTime,Language} from "@/lib/demo-data";
const STORAGE_KEY="boucherieflow-demo-v1";
interface DemoContextType {
  data:DemoData; hydrated:boolean; language:Language; setLanguage:(l:Language)=>void;
  createOrder:(order:Omit<Order,"id"|"createdAt"|"customerId">)=>Order;
  setStatus:(id:string,status:OrderStatus)=>void;
  updateOrder:(id:string,patch:Partial<Order>)=>void;
  updateActualWeight:(id:string,index:number,quantity:number)=>void;
  adjustStock:(id:string,amount:number)=>void;
  updateProduct:(id:string,patch:Partial<Product>)=>void;
  updateCustomer:(id:string,patch:Partial<Customer>)=>void;
  addNotification:(entry:Omit<Notification,"id"|"createdAt">)=>void;
  updateSettings:(patch:Partial<StoreSettings>)=>void;
  reset:()=>void;
}
const DemoContext=createContext<DemoContextType|null>(null);
export function DemoProvider({children}:{children:React.ReactNode}){
  const [data,setData]=useState<DemoData>(initialData);
  const [language,setLanguageState]=useState<Language>("en");
  const [hydrated,setHydrated]=useState(false);
  useEffect(()=>{
    try{const existing=window.localStorage.getItem(STORAGE_KEY); if(existing){const parsed=JSON.parse(existing);if(parsed?.orders&&parsed?.customers&&parsed?.products){setData({...initialData,...parsed});}}
      const l=window.localStorage.getItem("boucherieflow-lang");if(l==="en"||l==="fr")setLanguageState(l);
    }catch{/* If unavailable/corrupt, use seeded demo data */}setHydrated(true);
  },[]);
  useEffect(()=>{if(hydrated){try{window.localStorage.setItem(STORAGE_KEY,JSON.stringify(data));}catch{}}},[data,hydrated]);
  const setLanguage=(l:Language)=>{setLanguageState(l);try{window.localStorage.setItem("boucherieflow-lang",l);}catch{}};
  const createOrder=useCallback((order:Omit<Order,"id"|"createdAt"|"customerId">):Order=>{
    const id=`BF-${String(Date.now()).slice(-7)}`;
    // Contact details, not name alone, determine whether the customer already exists.
    const found=data.customers.find(c=>(order.email&&c.email.toLowerCase()===order.email.toLowerCase())||(order.phone&&c.phone===order.phone));
    const customerId=found?.id??uid("c");
    const result:Order={...order,id,customerId,createdAt:dateTime()};
    setData(prev=>{
      const exists=prev.customers.some(c=>c.id===customerId);
      const customer:Customer={id:customerId,name:order.customerName,phone:order.phone,email:order.email,language:order.language,notes:"",createdAt:new Date().toISOString().slice(0,10)};
      return {...prev,customers:exists?prev.customers:[customer,...prev.customers],orders:[result,...prev.orders]};
    });
    return result;
  },[data.customers]);
  const setStatus=(id:string,status:OrderStatus)=>setData(p=>({...p,orders:p.orders.map(o=>o.id===id?{...o,status}:o)}));
  const updateOrder=(id:string,patch:Partial<Order>)=>setData(p=>({...p,orders:p.orders.map(o=>o.id===id?{...o,...patch}:o)}));
  const updateActualWeight=(id:string,index:number,quantity:number)=>setData(p=>({...p,orders:p.orders.map(o=>o.id===id?{...o,items:o.items.map((i,j)=>j===index?{...i,actualQuantity:quantity}:i)}:o)}));
  const adjustStock=(id:string,amount:number)=>setData(p=>({...p,products:p.products.map(x=>x.id===id?{...x,stock:Math.max(0,Number((x.stock+amount).toFixed(2)))}:x)}));
  const updateProduct=(id:string,patch:Partial<Product>)=>setData(p=>({...p,products:p.products.map(x=>x.id===id?{...x,...patch}:x)}));
  const updateCustomer=(id:string,patch:Partial<Customer>)=>setData(p=>({...p,customers:p.customers.map(c=>c.id===id?{...c,...patch}:c)}));
  const addNotification=(entry:Omit<Notification,"id"|"createdAt">)=>setData(p=>({...p,notifications:[{...entry,id:uid("n"),createdAt:dateTime()},...p.notifications]}));
  const updateSettings=(patch:Partial<StoreSettings>)=>setData(p=>({...p,settings:{...p.settings,...patch}}));
  const reset=()=>setData(structuredClone(initialData));
  return <DemoContext.Provider value={{data,hydrated,language,setLanguage,createOrder,setStatus,updateOrder,updateActualWeight,adjustStock,updateProduct,updateCustomer,addNotification,updateSettings,reset}}>{children}</DemoContext.Provider>;
}
export function useDemo(){const value=useContext(DemoContext);if(!value)throw Error("useDemo must be inside DemoProvider");return value;}
