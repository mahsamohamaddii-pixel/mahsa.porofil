"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import clsx from "clsx";

export default function AddToCartButton({
  product,
  size,
  color,
  quantity = 1,
  className,
  disabled,
}: {
  product: { id: number; slug: string; nameFa: string; price: number; image: string | null };
  size: string;
  color: string;
  quantity?: number;
  className?: string;
  disabled?: boolean;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    if (disabled) return;
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        nameFa: product.nameFa,
        price: product.price,
        image: product.image,
        size,
        color,
      },
      quantity,
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  }

  return (
    <button
      onClick={handleAdd}
      disabled={disabled}
      className={clsx(
        "flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-ink)] py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-black disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
    >
      {justAdded ? (
        <>
          <Check size={17} /> به سبد اضافه شد
        </>
      ) : (
        <>
          <ShoppingBag size={17} /> افزودن به سبد خرید
        </>
      )}
    </button>
  );
}
