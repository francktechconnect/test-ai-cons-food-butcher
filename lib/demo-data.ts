export type Language = "en" | "fr";
export type OrderStatus = "new" | "confirmed" | "preparing" | "ready" | "completed" | "cancelled";
export type Channel = "Online" | "Phone" | "Counter" | "Message";
export type ProductCategory = "Beef" | "Poultry" | "Pork" | "Bundles";
export type Unit = "kg" | "piece" | "pack";
export type Product = {
  id: string; name: string; nameFr: string; category: ProductCategory; price: number; unit: Unit;
  stock: number; sku: string; image: string; emoji: string; featured?: boolean; description: string; descriptionFr: string;
};
export type OrderItem = { productId: string; name: string; quantity: number; unit: Unit; unitPrice: number; cut?: string; actualQuantity?: number };
export type Order = {
  id: string; customerId: string; customerName: string; phone: string; email: string; language: Language;
  channel: Channel; status: OrderStatus; pickupDate: string; pickupSlot: string; items: OrderItem[];
  notes: string; createdAt: string; paymentStatus: "unpaid" | "deposit" | "paid"; deposit: number;
};
export type Customer = { id: string; name: string; phone: string; email: string; language: Language; notes: string; createdAt: string };
export type Notification = { id: string; orderId: string; customer: string; channel: "SMS" | "Email"; message: string; createdAt: string; status: "Simulated" | "Draft" };
export type StoreSettings = { storeName: string; location: string; phone: string; email: string; pickupDays: string; enableSms: boolean; enableEmail: boolean; allowDeposits: boolean };
export type DemoData = { orders: Order[]; customers: Customer[]; products: Product[]; notifications: Notification[]; settings: StoreSettings };

export const catalog: Product[] = [
  { id:"p1",name:"Premium Striploin Steak",nameFr:"Contre-filet de qualité",category:"Beef",price:37.99,unit:"kg",stock:22,sku:"BF-STK-01",emoji:"🥩",featured:true,image:"https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=900&q=85",description:"A tender, well-marbled local favorite.",descriptionFr:"Une coupe tendre et savoureuse." },
  { id:"p2",name:"Fresh Ground Beef",nameFr:"Bœuf haché frais",category:"Beef",price:19.99,unit:"kg",stock:14,sku:"BF-BEF-02",emoji:"🥩",featured:true,image:"https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=900&q=85",description:"Ground fresh for versatile home cooking.",descriptionFr:"Haché frais pour vos plats préférés." },
  { id:"p3",name:"Boneless Chicken Breast",nameFr:"Poitrine de poulet désossée",category:"Poultry",price:21.49,unit:"kg",stock:9,sku:"BF-CHK-03",emoji:"🍗",featured:true,image:"https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=900&q=85",description:"Lean, carefully trimmed chicken breasts.",descriptionFr:"Poitrines maigres et soigneusement parées." },
  { id:"p4",name:"Artisan Pork Sausages",nameFr:"Saucisses artisanales",category:"Pork",price:12.50,unit:"pack",stock:24,sku:"BF-PRK-04",emoji:"🌭",image:"https://images.unsplash.com/photo-1599921841143-819065a55cc6?w=900&q=85",description:"A six-pack of seasoned, ready-to-cook sausages.",descriptionFr:"Six saucisses assaisonnées, prêtes à cuire." },
  { id:"p5",name:"Slow-Cook Beef Roast",nameFr:"Rôti de bœuf à mijoter",category:"Beef",price:28.00,unit:"kg",stock:12,sku:"BF-BEF-05",emoji:"🍖",image:"https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=900&q=85",description:"Rich flavor for Sunday family meals.",descriptionFr:"Plein de saveur pour les repas en famille." },
  { id:"p6",name:"Pork Chops",nameFr:"Côtelettes de porc",category:"Pork",price:18.50,unit:"kg",stock:7,sku:"BF-PRK-06",emoji:"🥓",image:"https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=900&q=85",description:"Juicy chops cut to your preferred thickness.",descriptionFr:"Côtelettes savoureuses, épaisseur au choix." },
  { id:"p7",name:"Family BBQ Box",nameFr:"Boîte BBQ familiale",category:"Bundles",price:89.00,unit:"pack",stock:8,sku:"BF-BDL-07",emoji:"📦",featured:true,image:"https://images.unsplash.com/photo-1558030006-450675393462?w=900&q=85",description:"A curated mix for grilling with the whole family.",descriptionFr:"Un assortiment idéal pour les grillades en famille." },
  { id:"p8",name:"Whole Roasting Chicken",nameFr:"Poulet entier à rôtir",category:"Poultry",price:23.00,unit:"piece",stock:11,sku:"BF-CHK-08",emoji:"🍗",image:"https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=900&q=85",description:"Perfect for oven roasting and Sunday dinners.",descriptionFr:"Idéal pour les repas du dimanche." },
  { id:"p9",name:"Freezer Essentials Box",nameFr:"Boîte essentiels du congélateur",category:"Bundles",price:149.00,unit:"pack",stock:3,sku:"BF-BDL-09",emoji:"📦",image:"https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=900&q=85",description:"Stock up with carefully selected everyday cuts.",descriptionFr:"Faites des réserves de coupes sélectionnées." },
];
export const demoCustomers: Customer[] = [
  {id:"c1",name:"Marie LeBlanc",phone:"506-555-0101",email:"marie@example.com",language:"fr",notes:"Prefers thin steak cuts. Regular Friday pickup.",createdAt:"2026-07-14"},
  {id:"c2",name:"Alex Thompson",phone:"506-555-0102",email:"alex@example.com",language:"en",notes:"Monthly BBQ bundles.",createdAt:"2026-06-19"},
  {id:"c3",name:"Sophie Cormier",phone:"506-555-0103",email:"sophie@example.com",language:"fr",notes:"Prefers email confirmations.",createdAt:"2026-08-12"},
  {id:"c4",name:"Daniel Roy",phone:"506-555-0104",email:"daniel@example.com",language:"en",notes:"Orders for family gatherings.",createdAt:"2026-07-26"},
  {id:"c5",name:"Isabelle Martin",phone:"506-555-0105",email:"isabelle@example.com",language:"fr",notes:"No substitutions without approval.",createdAt:"2026-09-03"},
  {id:"c6",name:"Noah Williams",phone:"506-555-0106",email:"noah@example.com",language:"en",notes:"Likes pickup after 4pm.",createdAt:"2026-09-19"},
];
const item = (id:string, qty:number, cut?:string):OrderItem => {const p=catalog.find(x=>x.id===id)!;return {productId:id,name:p.name,quantity:qty,unit:p.unit,unitPrice:p.price,cut}};
export const demoOrders: Order[] = [
  {id:"BF-1042",customerId:"c1",customerName:"Marie LeBlanc",phone:"506-555-0101",email:"marie@example.com",language:"fr",channel:"Online",status:"preparing",pickupDate:"2026-10-12",pickupSlot:"10:00–12:00",items:[item("p2",3),item("p1",1.5,"2.5 cm thick"),item("p3",2)],notes:"Please package the beef in 500g portions.",createdAt:"2026-10-11T09:14:00",paymentStatus:"unpaid",deposit:0},
  {id:"BF-1041",customerId:"c2",customerName:"Alex Thompson",phone:"506-555-0102",email:"alex@example.com",language:"en",channel:"Phone",status:"new",pickupDate:"2026-10-13",pickupSlot:"12:00–14:00",items:[item("p7",1),item("p4",2)],notes:"Confirm the BBQ box before preparation.",createdAt:"2026-10-11T08:36:00",paymentStatus:"unpaid",deposit:0},
  {id:"BF-1040",customerId:"c3",customerName:"Sophie Cormier",phone:"506-555-0103",email:"sophie@example.com",language:"fr",channel:"Counter",status:"ready",pickupDate:"2026-10-11",pickupSlot:"14:00–16:00",items:[item("p5",2),item("p6",1)],notes:"Call if running late.",createdAt:"2026-10-10T16:20:00",paymentStatus:"deposit",deposit:20},
  {id:"BF-1039",customerId:"c4",customerName:"Daniel Roy",phone:"506-555-0104",email:"daniel@example.com",language:"en",channel:"Online",status:"confirmed",pickupDate:"2026-10-13",pickupSlot:"16:00–18:00",items:[item("p9",1),item("p8",2)],notes:"Family pickup.",createdAt:"2026-10-10T14:08:00",paymentStatus:"unpaid",deposit:0},
  {id:"BF-1038",customerId:"c5",customerName:"Isabelle Martin",phone:"506-555-0105",email:"isabelle@example.com",language:"fr",channel:"Message",status:"completed",pickupDate:"2026-10-10",pickupSlot:"10:00–12:00",items:[item("p1",2),item("p2",2)],notes:"",createdAt:"2026-10-09T12:31:00",paymentStatus:"paid",deposit:0},
  {id:"BF-1037",customerId:"c6",customerName:"Noah Williams",phone:"506-555-0106",email:"noah@example.com",language:"en",channel:"Online",status:"completed",pickupDate:"2026-10-10",pickupSlot:"16:00–18:00",items:[item("p7",1),item("p4",1)],notes:"",createdAt:"2026-10-09T11:22:00",paymentStatus:"paid",deposit:0},
  {id:"BF-1036",customerId:"c1",customerName:"Marie LeBlanc",phone:"506-555-0101",email:"marie@example.com",language:"fr",channel:"Phone",status:"completed",pickupDate:"2026-10-09",pickupSlot:"12:00–14:00",items:[item("p3",1.5),item("p5",1.2)],notes:"",createdAt:"2026-10-08T08:34:00",paymentStatus:"paid",deposit:0},
  {id:"BF-1035",customerId:"c2",customerName:"Alex Thompson",phone:"506-555-0102",email:"alex@example.com",language:"en",channel:"Counter",status:"completed",pickupDate:"2026-10-08",pickupSlot:"10:00–12:00",items:[item("p8",1),item("p6",2)],notes:"",createdAt:"2026-10-07T15:08:00",paymentStatus:"paid",deposit:0},
];
export const demoNotifications: Notification[] = [
  {id:"n1",orderId:"BF-1042",customer:"Marie LeBlanc",channel:"SMS",message:"Bonjour Marie! Votre commande BF-1042 est confirmée. Nous vous informerons lorsqu'elle sera prête.",createdAt:"2026-10-11T09:15:00",status:"Simulated"},
  {id:"n2",orderId:"BF-1040",customer:"Sophie Cormier",channel:"Email",message:"Bonjour Sophie! Votre commande BF-1040 est prête à être récupérée.",createdAt:"2026-10-11T10:02:00",status:"Simulated"},
  {id:"n3",orderId:"BF-1039",customer:"Daniel Roy",channel:"SMS",message:"Hi Daniel! Your order BF-1039 has been confirmed.",createdAt:"2026-10-10T14:14:00",status:"Simulated"},
];
export const defaultSettings:StoreSettings = {storeName:"Boucherie Rivage",location:"Moncton, New Brunswick",phone:"506-555-0140",email:"hello@demo.example",pickupDays:"Tuesday–Saturday, 10 AM–6 PM",enableSms:true,enableEmail:true,allowDeposits:false};
export const initialData:DemoData = { orders:demoOrders,customers:demoCustomers,products:catalog,notifications:demoNotifications,settings:defaultSettings};
export const statuses:OrderStatus[] = ["new","confirmed","preparing","ready","completed","cancelled"];
export const statusNames:Record<OrderStatus,string>={new:"New",confirmed:"Confirmed",preparing:"Preparing",ready:"Ready",completed:"Completed",cancelled:"Cancelled"};
export const formatMoney=(v:number)=>new Intl.NumberFormat("en-CA",{style:"currency",currency:"CAD"}).format(v);
export const sumOrder=(o:Order)=>o.items.reduce((s,i)=>s+(i.actualQuantity??i.quantity)*i.unitPrice,0);
export const shortDate=(date:string)=>{const d=new Date(date); return Number.isNaN(d.getTime())?date:d.toLocaleDateString("en-CA",{month:"short",day:"numeric"})};
export const uid=(prefix:string)=>`${prefix}-${Math.random().toString(36).slice(2,9)}`;
export const dateTime=()=>new Date().toISOString();
