import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { formatDate, formatToman } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;
  const [order] = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber));
  if (!order) notFound();

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:px-8">
      <div className="flex flex-col items-center text-center">
        <CheckCircle2 size={54} className="text-emerald-600" />
        <h1 className="mt-5 font-display text-3xl font-bold">سفارش شما با موفقیت ثبت شد</h1>
        <p className="mt-3 text-[var(--color-ink)]/60">
          از خرید شما از ماهرا سپاسگزاریم. جزئیات سفارش به شماره موبایل شما اطلاع‌رسانی خواهد شد.
        </p>
        <div className="mt-6 rounded-full bg-[var(--color-sand)] px-6 py-2 text-sm font-medium">
          شماره سفارش: <span dir="ltr" className="font-mono">{order.orderNumber}</span>
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-[var(--color-line)] p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-line)] pb-4 text-sm">
          <span className="text-[var(--color-ink)]/55">تاریخ ثبت سفارش</span>
          <span>{formatDate(order.createdAt)}</span>
        </div>

        <ul className="flex flex-col divide-y divide-[var(--color-line)]">
          {items.map((item) => (
            <li key={item.id} className="flex gap-4 py-4">
              <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-[var(--color-sand)]">
                {item.image && <Image src={item.image} alt={item.nameFa} fill className="object-cover" sizes="64px" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.nameFa}</p>
                <p className="mt-1 text-xs text-[var(--color-ink)]/55">
                  سایز {item.size} · رنگ {item.color} · تعداد {item.quantity}
                </p>
              </div>
              <span className="text-sm font-medium">{formatToman(Number(item.price) * item.quantity)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-col gap-2 border-t border-[var(--color-line)] pt-4 text-sm">
          <div className="flex items-center justify-between text-[var(--color-ink)]/70">
            <span>جمع جزء</span>
            <span>{formatToman(order.subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-[var(--color-ink)]/70">
            <span>هزینه ارسال</span>
            <span>{Number(order.shippingCost) === 0 ? "رایگان" : formatToman(order.shippingCost)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-[var(--color-line)] pt-3 text-base font-semibold">
            <span>مبلغ نهایی</span>
            <span>{formatToman(order.total)}</span>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-[var(--color-sand)]/60 p-4 text-sm text-[var(--color-ink)]/70">
          <p className="font-medium text-[var(--color-ink)]">آدرس ارسال</p>
          <p className="mt-1">
            {order.province}، {order.city} — {order.address}
          </p>
          <p className="mt-1">گیرنده: {order.fullName} · {order.phone}</p>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/shop"
          className="rounded-full bg-[var(--color-ink)] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-black"
        >
          ادامه خرید
        </Link>
      </div>
    </div>
  );
}
