"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCartCount, useCartStore } from "@/store/cart-store";
import clsx from "clsx";

const NAV_LINKS = [
  { href: "/shop", label: "همه محصولات" },
  { href: "/shop?category=dresses", label: "پیراهن مجلسی" },
  { href: "/shop?category=coats", label: "پالتو" },
  { href: "/shop?category=minimal", label: "مینیمال" },
  { href: "/shop?category=accessories", label: "اکسسوری" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const cartCount = useCartCount();
  const toggleCart = useCartStore((s) => s.toggleCart);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
    }
  }

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 w-full border-b transition-colors duration-300",
        scrolled
          ? "border-[var(--color-line)] bg-[var(--color-paper)]/95 backdrop-blur-md"
          : "border-transparent bg-[var(--color-paper)]",
      )}
    >
      <div className="bg-ink py-2 text-center text-[11px] tracking-wide text-white/90">
        ارسال رایگان برای خریدهای بالای ۵,۰۰۰,۰۰۰ تومان · هفت روز هفته پشتیبانی
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
        <button
          className="rounded-full p-2 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="منو"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link href="/" className="select-none text-center">
          <span className="font-display text-2xl font-bold tracking-[0.18em] text-[var(--color-ink)]">
            MAHRA
          </span>
          <span className="block text-[10px] tracking-[0.3em] text-[var(--color-gold)]">ماهرا</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-[var(--color-ink)]/80 transition hover:text-[var(--color-gold)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="rounded-full p-2.5 transition hover:bg-[var(--color-sand)]"
            aria-label="جستجو"
          >
            <Search size={19} />
          </button>
          <button
            onClick={toggleCart}
            className="relative rounded-full p-2.5 transition hover:bg-[var(--color-sand)]"
            aria-label="سبد خرید"
          >
            <ShoppingBag size={19} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -left-0.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-[var(--color-gold)] px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3 md:px-8">
          <form onSubmit={submitSearch} className="mx-auto flex max-w-xl items-center gap-2">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="جستجوی محصول، مثلاً «پیراهن مجلسی»"
              className="w-full rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm outline-none focus:border-[var(--color-gold)]"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm text-white"
            >
              جستجو
            </button>
          </form>
        </div>
      )}

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-2.5 text-sm text-[var(--color-ink)]/85 transition hover:bg-[var(--color-sand)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
