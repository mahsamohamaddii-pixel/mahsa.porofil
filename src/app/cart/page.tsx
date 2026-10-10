"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";
import { useCartStore, useCartTotal } from "@/store/cart-store";
import { formatToman } from "@/lib/format";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const total = useCartTotal();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-6 py-28 text-center">
        <ShoppingBag size={48} className="text-[var(--color-ink)]/25" />
        <h1 className="font-display text-2xl font-bold">سبد خرید شما خالی است</h1>
        <p className="text-sm text-[var(--color-ink)]/55">محصولات مورد علاقه خود را به سبد خرید اضافه کنید.</p>
        <Link
          href="/shop"
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3 text-sm font-medium text-white transition hover:bg-black"
        >
          مشاهده فروشگاه <ArrowLeft size={15} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:px-8">
      <h1 className="mb-10 font-display text-3xl font-bold">سبد خرید</h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <ul className="flex flex-col divide-y divide-[var(--color-line)]">
          {items.map((item) => (
            <li key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 py-6">
              <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-xl bg-[var(--color-sand)]">
                {item.image && <Image src={item.image} alt={item.nameFa} fill className="object-cover" sizes="96px" />}
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link href={`/product/${item.slug}`} className="font-medium hover:text-[var(--color-gold)]">
                      {item.nameFa}
                    </Link>
                    <p className="mt-1 text-sm text-[var(--color-ink)]/55">
                      سایز {item.size} · رنگ {item.color}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId, item.size, item.color)}
                    className="p-1 text-[var(--color-ink)]/35 transition hover:text-[#a1332f]"
                    aria-label="حذف"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-[var(--color-line)]">
                    <button
                      className="p-2 text-[var(--color-ink)]/70 hover:text-[var(--color-ink)]"
                      onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      className="p-2 text-[var(--color-ink)]/70 hover:text-[var(--color-ink)]"
                      onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-semibold">{formatToman(item.price * item.quantity)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="h-fit rounded-2xl border border-[var(--color-line)] p-6">
          <h2 className="mb-4 font-display text-lg font-semibold">خلاصه سفارش</h2>
          <div className="flex items-center justify-between text-sm text-[var(--color-ink)]/70">
            <span>جمع جزء</span>
            <span className="font-medium text-[var(--color-ink)]">{formatToman(total)}</span>
          </div>
          <p className="mt-2 text-xs text-[var(--color-ink)]/50">هزینه ارسال در مرحله بعد محاسبه می‌شود.</p>
          <Link
            href="/checkout"
            className="mt-6 block w-full rounded-full bg-[var(--color-ink)] py-3.5 text-center text-sm font-medium text-white transition hover:bg-black"
          >
            ادامه فرایند خرید
          </Link>
          <Link
            href="/shop"
            className="mt-3 block w-full rounded-full border border-[var(--color-line)] py-3.5 text-center text-sm font-medium transition hover:bg-[var(--color-sand)]"
          >
            ادامه خرید
          </Link>
        </div>
      </div>
    </div>
  );
}
