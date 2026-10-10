"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import clsx from "clsx";
import type { CategoryData } from "@/lib/types";

const SORT_OPTIONS = [
  { value: "newest", label: "جدیدترین" },
  { value: "price-asc", label: "ارزان‌ترین" },
  { value: "price-desc", label: "گران‌ترین" },
  { value: "rating", label: "محبوب‌ترین" },
];

const PRICE_BUCKETS = [
  { label: "تا ۵ میلیون تومان", min: undefined, max: 5000000 },
  { label: "۵ تا ۱۵ میلیون تومان", min: 5000000, max: 15000000 },
  { label: "۱۵ تا ۲۵ میلیون تومان", min: 15000000, max: 25000000 },
  { label: "بالای ۲۵ میلیون تومان", min: 25000000, max: undefined },
];

const COLOR_OPTIONS = [
  { name: "مشکی", hex: "#161616" },
  { name: "زرشکی", hex: "#7a1f2b" },
  { name: "کرم", hex: "#e8dcc8" },
  { name: "دودی", hex: "#6b6b6b" },
  { name: "شتری", hex: "#b08968" },
  { name: "سرمه‌ای", hex: "#1b2a4a" },
  { name: "زمردی", hex: "#0f5132" },
  { name: "طلایی", hex: "#c9a227" },
];

export default function ShopFilters({
  categories,
  resultCount,
}: {
  categories: CategoryData[];
  resultCount: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();

  const currentCategory = searchParams.get("category") ?? "";
  const currentSort = searchParams.get("sort") ?? "newest";
  const currentMin = searchParams.get("min");
  const currentMax = searchParams.get("max");
  const currentColors = searchParams.getAll("color");
  const currentQuery = searchParams.get("q") ?? "";

  function updateParams(mutator: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    mutator(params);
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  function setCategory(slug: string) {
    updateParams((params) => {
      if (!slug || slug === currentCategory) params.delete("category");
      else params.set("category", slug);
    });
  }

  function setSort(value: string) {
    updateParams((params) => params.set("sort", value));
  }

  function setPriceBucket(min?: number, max?: number) {
    updateParams((params) => {
      const isActive = String(currentMin ?? "") === String(min ?? "") && String(currentMax ?? "") === String(max ?? "");
      if (isActive) {
        params.delete("min");
        params.delete("max");
      } else {
        if (min != null) params.set("min", String(min));
        else params.delete("min");
        if (max != null) params.set("max", String(max));
        else params.delete("max");
      }
    });
  }

  function toggleColor(name: string) {
    updateParams((params) => {
      const colors = params.getAll("color");
      params.delete("color");
      if (colors.includes(name)) {
        colors.filter((c) => c !== name).forEach((c) => params.append("color", c));
      } else {
        [...colors, name].forEach((c) => params.append("color", c));
      }
    });
  }

  function clearAll() {
    router.push(pathname, { scroll: false });
  }

  const hasActiveFilters = currentCategory || currentMin || currentMax || currentColors.length > 0 || currentQuery;

  const filterBody = (
    <div className="flex flex-col gap-8">
      <div>
        <h4 className="mb-3 text-sm font-semibold">دسته‌بندی</h4>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setCategory(cat.slug)}
              className={clsx(
                "rounded-lg px-3 py-2 text-right text-sm transition",
                currentCategory === cat.slug
                  ? "bg-[var(--color-ink)] text-white"
                  : "text-[var(--color-ink)]/75 hover:bg-[var(--color-sand)]",
              )}
            >
              {cat.nameFa}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold">محدوده قیمت</h4>
        <div className="flex flex-col gap-2">
          {PRICE_BUCKETS.map((bucket) => {
            const isActive =
              String(currentMin ?? "") === String(bucket.min ?? "") && String(currentMax ?? "") === String(bucket.max ?? "");
            return (
              <button
                key={bucket.label}
                onClick={() => setPriceBucket(bucket.min, bucket.max)}
                className={clsx(
                  "rounded-lg px-3 py-2 text-right text-sm transition",
                  isActive ? "bg-[var(--color-ink)] text-white" : "text-[var(--color-ink)]/75 hover:bg-[var(--color-sand)]",
                )}
              >
                {bucket.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold">رنگ</h4>
        <div className="flex flex-wrap gap-2">
          {COLOR_OPTIONS.map((c) => (
            <button
              key={c.name}
              onClick={() => toggleColor(c.name)}
              title={c.name}
              className={clsx(
                "flex h-8 w-8 items-center justify-center rounded-full border-2 transition",
                currentColors.includes(c.name) ? "border-[var(--color-gold)]" : "border-transparent",
              )}
            >
              <span className="h-6 w-6 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button onClick={clearAll} className="text-sm text-[#a1332f] underline underline-offset-4">
          پاک کردن همه فیلترها
        </button>
      )}
    </div>
  );

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4 md:hidden">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full border border-[var(--color-line)] px-4 py-2 text-sm"
        >
          <SlidersHorizontal size={15} /> فیلترها
        </button>
        <select
          value={currentSort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-full border border-[var(--color-line)] bg-white px-3 py-2 text-sm"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              مرتب‌سازی: {opt.label}
            </option>
          ))}
        </select>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative mr-auto h-full w-[85%] max-w-sm overflow-y-auto bg-[var(--color-paper)] p-6" dir="rtl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold">فیلترها</h3>
              <button onClick={() => setOpen(false)} aria-label="بستن">
                <X size={20} />
              </button>
            </div>
            {filterBody}
          </div>
        </div>
      )}

      <aside className="hidden w-64 shrink-0 md:block">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">فیلترها</h3>
          <span className="text-xs text-[var(--color-ink)]/50">{resultCount} محصول</span>
        </div>
        {filterBody}
      </aside>
    </>
  );
}

export function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") ?? "newest";

  function setSort(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <select
      value={currentSort}
      onChange={(e) => setSort(e.target.value)}
      className="hidden rounded-full border border-[var(--color-line)] bg-white px-4 py-2.5 text-sm md:block"
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          مرتب‌سازی: {opt.label}
        </option>
      ))}
    </select>
  );
}
