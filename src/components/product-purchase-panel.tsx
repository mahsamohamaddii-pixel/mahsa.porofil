"use client";

import { useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import AddToCartButton from "./add-to-cart-button";
import type { ProductDetailData } from "@/lib/types";

export default function ProductPurchasePanel({ product }: { product: ProductDetailData }) {
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [quantity, setQuantity] = useState(1);

  const inStock = product.stock > 0;

  const image = useMemo(() => product.image, [product.image]);

  return (
    <div className="flex flex-col gap-6">
      {product.colors.length > 0 && (
        <div>
          <p className="mb-2.5 text-sm font-medium">
            رنگ: <span className="text-[var(--color-ink)]/60">{color}</span>
          </p>
          <div className="flex flex-wrap gap-2.5">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                title={c.name}
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${
                  color === c.name ? "border-[var(--color-gold)]" : "border-transparent"
                }`}
              >
                <span className="h-7 w-7 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
              </button>
            ))}
          </div>
        </div>
      )}

      {product.sizes.length > 0 && (
        <div>
          <p className="mb-2.5 text-sm font-medium">سایز</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`min-w-[48px] rounded-lg border px-3.5 py-2.5 text-sm transition ${
                  size === s
                    ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white"
                    : "border-[var(--color-line)] text-[var(--color-ink)]/75 hover:border-[var(--color-ink)]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="mb-2.5 text-sm font-medium">تعداد</p>
        <div className="flex w-fit items-center rounded-full border border-[var(--color-line)]">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="p-3 text-[var(--color-ink)]/70 hover:text-[var(--color-ink)]"
            aria-label="کاهش تعداد"
          >
            <Minus size={15} />
          </button>
          <span className="w-8 text-center text-sm">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            className="p-3 text-[var(--color-ink)]/70 hover:text-[var(--color-ink)]"
            aria-label="افزایش تعداد"
          >
            <Plus size={15} />
          </button>
        </div>
      </div>

      <AddToCartButton
        product={{ id: product.id, slug: product.slug, nameFa: product.nameFa, price: Number(product.price), image }}
        size={size}
        color={color}
        quantity={quantity}
        disabled={!inStock}
      />

      <p className={`text-xs ${inStock ? "text-emerald-700" : "text-red-700"}`}>
        {inStock ? `✓ موجود در انبار (${product.stock} عدد)` : "متأسفانه این محصول موجود نیست"}
      </p>
    </div>
  );
}
