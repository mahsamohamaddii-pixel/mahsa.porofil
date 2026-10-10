import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Vazirmatn, Playfair_Display } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import CartDrawer from "@/components/cart-drawer";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "MAHRA | ماهرا — پوشاک و اکسسوری لوکس زنانه",
  description:
    "ماهرا، فروشگاه آنلاین پوشاک لوکس زنانه؛ پیراهن‌های مجلسی، پالتوهای پریمیوم، استایل مینیمال و اکسسوری‌های خاص با تجربه خرید آنلاین پریمیوم.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-[var(--color-paper)] font-sans text-[var(--color-ink)] antialiased">
        <SiteHeader />
        <main className="min-h-[60vh]">{children}</main>
        <SiteFooter />
        <CartDrawer />
      </body>
    </html>
  );
}
