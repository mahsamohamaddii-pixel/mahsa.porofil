"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatToman } from "@/lib/format";
import RatingStars from "./rating-stars";
import type { ProductCardData } from "@/lib/types";

export default function ProductCard({ product, index = 0 }: { product: ProductCardData; index?: number }) {
  const [hovered, setHovered] = useState(false);
  const hasDiscount = product.compareAtPrice && Number(product.compareAtPrice) > Number(product.price);
  const discountPct = hasDiscount
    ? Math.round(100 - (Number(product.price) / Number(product.compareAtPrice)) * 100)
    : 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group fade-up block"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[var(--color-sand)]">
        {product.image ? (
          <Image
            src={hovered && product.hoverImage ? product.hoverImage : product.image}
            alt={product.nameFa}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="skeleton h-full w-full" />
        )}

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <div className="flex flex-col gap-1.5">
            {product.isNew && (
              <span className="rounded-full bg-[var(--color-ink)] px-2.5 py-1 text-[10px] font-medium tracking-wide text-white">
                جدید
              </span>
            )}
            {hasDiscount && (
              <span className="rounded-full bg-[#a1332f] px-2.5 py-1 text-[10px] font-medium tracking-wide text-white">
                {discountPct}٪ تخفیف
              </span>
            )}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/50 to-transparent p-3 text-center text-[11px] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          مشاهده و خرید سریع
        </div>
      </div>

      <div className="mt-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-gold)]">
            {product.categoryNameFa}
          </p>
          <h3 className="mt-0.5 truncate text-sm font-medium text-[var(--color-ink)]">{product.nameFa}</h3>
          <div className="mt-1 flex items-center gap-1.5">
            <RatingStars rating={product.rating} size={12} />
            <span className="text-[11px] text-[var(--color-ink)]/50">({product.reviewCount})</span>
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-sm font-semibold text-[var(--color-ink)]">{formatToman(product.price)}</span>
        {hasDiscount && (
          <span className="text-xs text-[var(--color-ink)]/40 line-through">
            {formatToman(product.compareAtPrice!)}
          </span>
        )}
      </div>

      {product.colors.length > 0 && (
        <div className="mt-2 flex items-center gap-1.5">
          {product.colors.slice(0, 5).map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="h-3.5 w-3.5 rounded-full border border-black/10"
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      )}
    </Link>
  );
}
