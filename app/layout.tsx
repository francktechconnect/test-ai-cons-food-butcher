import type { Metadata } from "next";
import "./globals.css";
import { DemoProvider } from "@/components/demo-provider";
export const metadata: Metadata = {
  title: "BoucherieFlow | Boutique & Operations Demo",
  description: "A bilingual gold-and-navy prototype for butcher shop ordering, fulfillment, CRM, inventory and customer communications.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><DemoProvider>{children}</DemoProvider></body></html>;
}
