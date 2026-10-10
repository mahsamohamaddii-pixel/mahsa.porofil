"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCartStore, useCartTotal } from "@/store/cart-store";
import { formatToman } from "@/lib/format";
import { Landmark, Truck, Wallet } from "lucide-react";

const FREE_SHIPPING_THRESHOLD = 5000000;
const SHIPPING_COST = 450000;

const PROVINCES = [
  "تهران",
  "اصفهان",
  "فارس",
  "خراسان رضوی",
  "آذربایجان شرقی",
  "خوزستان",
  "البرز",
  "مازندران",
  "گیلان",
  "کرمان",
];

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const subtotal = useCartTotal();
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    province: PROVINCES[0],
    city: "",
    address: "",
    postalCode: "",
    notes: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST;
  const total = subtotal + shippingCost;

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.fullName.trim() || !form.phone.trim() || !form.city.trim() || !form.address.trim()) {
      setError("لطفاً فیلدهای الزامی را تکمیل کنید.");
      return;
    }
    if (items.length === 0) {
      setError("سبد خرید شما خالی است.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          paymentMethod,
          items: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            size: i.size,
            color: i.color,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "خطا در ثبت سفارش");
      clearCart();
      router.push(`/order/${data.orderNumber}`);
    } catch (err: any) {
      setError(err.message || "خطا در ثبت سفارش. دوباره تلاش کنید.");
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-6 py-28 text-center">
        <h1 className="font-display text-2xl font-bold">سبد خرید شما خالی است</h1>
        <p className="text-sm text-[var(--color-ink)]/55">برای تکمیل خرید، ابتدا محصولی به سبد اضافه کنید.</p>
        <Link
          href="/shop"
          className="mt-3 rounded-full bg-[var(--color-ink)] px-6 py-3 text-sm font-medium text-white transition hover:bg-black"
        >
          مشاهده فروشگاه
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:px-8">
      <h1 className="mb-10 font-display text-3xl font-bold">تکمیل خرید</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-8">
          <section>
            <h2 className="mb-4 font-display text-lg font-semibold">اطلاعات گیرنده</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                required
                placeholder="نام و نام خانوادگی *"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                className="rounded-lg border border-[var(--color-line)] px-4 py-3 text-sm outline-none focus:border-[var(--color-gold)]"
              />
              <input
                required
                placeholder="شماره موبایل *"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="rounded-lg border border-[var(--color-line)] px-4 py-3 text-sm outline-none focus:border-[var(--color-gold)]"
                dir="ltr"
              />
              <input
                type="email"
                placeholder="ایمیل (اختیاری)"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="rounded-lg border border-[var(--color-line)] px-4 py-3 text-sm outline-none focus:border-[var(--color-gold)] sm:col-span-2"
                dir="ltr"
              />
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-display text-lg font-semibold">آدرس ارسال</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <select
                value={form.province}
                onChange={(e) => update("province", e.target.value)}
                className="rounded-lg border border-[var(--color-line)] px-4 py-3 text-sm outline-none focus:border-[var(--color-gold)]"
              >
                {PROVINCES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <input
                required
                placeholder="شهر *"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                className="rounded-lg border border-[var(--color-line)] px-4 py-3 text-sm outline-none focus:border-[var(--color-gold)]"
              />
              <textarea
                required
                placeholder="آدرس کامل *"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                rows={3}
                className="rounded-lg border border-[var(--color-line)] px-4 py-3 text-sm outline-none focus:border-[var(--color-gold)] sm:col-span-2"
              />
              <input
                placeholder="کد پستی"
                value={form.postalCode}
                onChange={(e) => update("postalCode", e.target.value)}
                className="rounded-lg border border-[var(--color-line)] px-4 py-3 text-sm outline-none focus:border-[var(--color-gold)]"
                dir="ltr"
              />
              <input
                placeholder="توضیحات سفارش (اختیاری)"
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                className="rounded-lg border border-[var(--color-line)] px-4 py-3 text-sm outline-none focus:border-[var(--color-gold)]"
              />
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-display text-lg font-semibold">روش پرداخت</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`flex items-center gap-3 rounded-xl border px-4 py-4 text-right transition ${
                  paymentMethod === "cod" ? "border-[var(--color-gold)] bg-[var(--color-sand)]/50" : "border-[var(--color-line)]"
                }`}
              >
                <Wallet size={20} className="text-[var(--color-gold)]" />
                <span>
                  <span className="block text-sm font-medium">پرداخت در محل</span>
                  <span className="block text-xs text-[var(--color-ink)]/55">پرداخت هنگام تحویل سفارش</span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`flex items-center gap-3 rounded-xl border px-4 py-4 text-right transition ${
                  paymentMethod === "card" ? "border-[var(--color-gold)] bg-[var(--color-sand)]/50" : "border-[var(--color-line)]"
                }`}
              >
                <Landmark size={20} className="text-[var(--color-gold)]" />
                <span>
                  <span className="block text-sm font-medium">پرداخت آنلاین</span>
                  <span className="block text-xs text-[var(--color-ink)]/55">انتقال به درگاه بانکی</span>
                </span>
              </button>
            </div>
          </section>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-[var(--color-ink)] py-4 text-sm font-medium text-white transition hover:bg-black disabled:opacity-50 lg:hidden"
          >
            {submitting ? "در حال ثبت سفارش..." : `ثبت نهایی سفارش · ${formatToman(total)}`}
          </button>
        </div>

        <aside className="h-fit rounded-2xl border border-[var(--color-line)] p-6">
          <h2 className="mb-4 font-display text-lg font-semibold">خلاصه سفارش</h2>
          <ul className="flex max-h-72 flex-col gap-4 overflow-y-auto">
            {items.map((item) => (
              <li key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3">
                <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-[var(--color-sand)]">
                  {item.image && <Image src={item.image} alt={item.nameFa} fill className="object-cover" sizes="56px" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-snug">{item.nameFa}</p>
                  <p className="text-xs text-[var(--color-ink)]/50">
                    {item.size} / {item.color} × {item.quantity}
                  </p>
                </div>
                <span className="text-sm font-medium">{formatToman(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-col gap-2 border-t border-[var(--color-line)] pt-4 text-sm">
            <div className="flex items-center justify-between text-[var(--color-ink)]/70">
              <span>جمع جزء</span>
              <span>{formatToman(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-[var(--color-ink)]/70">
              <span className="flex items-center gap-1.5"><Truck size={14} /> هزینه ارسال</span>
              <span>{shippingCost === 0 ? "رایگان" : formatToman(shippingCost)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-[var(--color-line)] pt-3 text-base font-semibold">
              <span>مبلغ قابل پرداخت</span>
              <span>{formatToman(total)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 hidden w-full rounded-full bg-[var(--color-ink)] py-3.5 text-sm font-medium text-white transition hover:bg-black disabled:opacity-50 lg:block"
          >
            {submitting ? "در حال ثبت سفارش..." : "ثبت نهایی سفارش"}
          </button>
        </aside>
      </form>
    </div>
  );
}
