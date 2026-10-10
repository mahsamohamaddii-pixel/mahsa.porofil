"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCartStore, useCartTotal } from "@/store/cart-store";
import { formatToman } from "@/lib/format";

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const total = useCartTotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
          />
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-[var(--color-paper)] shadow-2xl"
            dir="rtl"
          >
            <div className="flex items-center justify-between border-b border-[var(--color-line)] px-5 py-4">
              <h2 className="font-display text-lg font-semibold">سبد خرید شما</h2>
              <button
                onClick={closeCart}
                className="rounded-full p-2 text-[var(--color-ink)]/60 transition hover:bg-[var(--color-sand)] hover:text-[var(--color-ink)]"
                aria-label="بستن"
              >
                <X size={20} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <ShoppingBag size={42} className="text-[var(--color-ink)]/25" />
                <p className="text-sm text-[var(--color-ink)]/60">سبد خرید شما خالی است.</p>
                <button
                  onClick={closeCart}
                  className="mt-2 rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-sm text-white transition hover:bg-black"
                >
                  ادامه خرید
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <ul className="flex flex-col gap-4">
                    {items.map((item) => (
                      <li
                        key={`${item.productId}-${item.size}-${item.color}`}
                        className="flex gap-3 border-b border-[var(--color-line)] pb-4"
                      >
                        <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-[var(--color-sand)]">
                          {item.image && (
                            <Image src={item.image} alt={item.nameFa} fill className="object-cover" sizes="80px" />
                          )}
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <Link
                              href={`/product/${item.slug}`}
                              onClick={closeCart}
                              className="text-sm font-medium leading-snug hover:text-[var(--color-gold)]"
                            >
                              {item.nameFa}
                            </Link>
                            <p className="mt-1 text-xs text-[var(--color-ink)]/55">
                              سایز {item.size} · رنگ {item.color}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center rounded-full border border-[var(--color-line)]">
                              <button
                                className="p-1.5 text-[var(--color-ink)]/70 hover:text-[var(--color-ink)]"
                                onClick={() =>
                                  updateQuantity(item.productId, item.size, item.color, item.quantity - 1)
                                }
                                aria-label="کاهش تعداد"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="w-6 text-center text-xs">{item.quantity}</span>
                              <button
                                className="p-1.5 text-[var(--color-ink)]/70 hover:text-[var(--color-ink)]"
                                onClick={() =>
                                  updateQuantity(item.productId, item.size, item.color, item.quantity + 1)
                                }
                                aria-label="افزایش تعداد"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                            <span className="text-sm font-semibold">{formatToman(item.price * item.quantity)}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId, item.size, item.color)}
                          className="self-start p-1 text-[var(--color-ink)]/35 transition hover:text-[#a1332f]"
                          aria-label="حذف محصول"
                        >
                          <Trash2 size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[var(--color-line)] px-5 py-5">
                  <div className="mb-3 flex items-center justify-between text-sm text-[var(--color-ink)]/70">
                    <span>جمع جزء</span>
                    <span className="font-semibold text-[var(--color-ink)]">{formatToman(total)}</span>
                  </div>
                  <p className="mb-4 text-[11px] text-[var(--color-ink)]/50">
                    هزینه ارسال و مالیات در مرحله تسویه‌حساب محاسبه می‌شود.
                  </p>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="block w-full rounded-full bg-[var(--color-ink)] py-3 text-center text-sm font-medium text-white transition hover:bg-black"
                  >
                    ادامه فرایند خرید
                  </Link>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="mt-2 block w-full rounded-full border border-[var(--color-line)] py-3 text-center text-sm font-medium text-[var(--color-ink)] transition hover:bg-[var(--color-sand)]"
                  >
                    مشاهده سبد خرید
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
