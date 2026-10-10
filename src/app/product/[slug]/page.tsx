import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, RefreshCcw, ShieldCheck, Truck } from "lucide-react";
import { getProductBySlug, getRelatedProducts, getReviewsForProduct } from "@/lib/data";
import { formatToman } from "@/lib/format";
import ProductGallery from "@/components/product-gallery";
import ProductPurchasePanel from "@/components/product-purchase-panel";
import ProductReviews from "@/components/product-reviews";
import ProductCard from "@/components/product-card";
import RatingStars from "@/components/rating-stars";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [reviews, related] = await Promise.all([
    getReviewsForProduct(product.id),
    getRelatedProducts(product.categorySlug, product.slug, 4),
  ]);

  const hasDiscount = product.compareAtPrice && Number(product.compareAtPrice) > Number(product.price);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:px-8">
      <nav className="mb-8 flex items-center gap-1.5 text-xs text-[var(--color-ink)]/50">
        <Link href="/" className="hover:text-[var(--color-gold)]">خانه</Link>
        <ChevronLeft size={12} />
        <Link href={`/shop?category=${product.categorySlug}`} className="hover:text-[var(--color-gold)]">
          {product.categoryNameFa}
        </Link>
        <ChevronLeft size={12} />
        <span className="text-[var(--color-ink)]/80">{product.nameFa}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <ProductGallery images={product.images} alt={product.nameFa} />

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">{product.categoryNameFa}</p>
          <h1 className="mt-2 font-display text-3xl font-bold leading-snug sm:text-4xl">{product.nameFa}</h1>
          {product.subtitleFa && <p className="mt-2 text-[var(--color-ink)]/60">{product.subtitleFa}</p>}

          <div className="mt-4 flex items-center gap-2">
            <RatingStars rating={product.rating} size={15} />
            <span className="text-sm text-[var(--color-ink)]/55">
              {product.rating} ({product.reviewCount} نظر)
            </span>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <span className="font-display text-2xl font-bold">{formatToman(product.price)}</span>
            {hasDiscount && (
              <span className="text-base text-[var(--color-ink)]/40 line-through">
                {formatToman(product.compareAtPrice!)}
              </span>
            )}
          </div>

          <p className="mt-6 leading-8 text-[var(--color-ink)]/70">{product.descriptionFa}</p>

          <div className="mt-8 border-t border-[var(--color-line)] pt-8">
            <ProductPurchasePanel product={product} />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 border-t border-[var(--color-line)] pt-6 text-sm text-[var(--color-ink)]/65 sm:grid-cols-3">
            <div className="flex items-center gap-2"><Truck size={17} className="text-[var(--color-gold)]" /> ارسال ۲ تا ۴ روزه</div>
            <div className="flex items-center gap-2"><RefreshCcw size={17} className="text-[var(--color-gold)]" /> مرجوعی تا ۷ روز</div>
            <div className="flex items-center gap-2"><ShieldCheck size={17} className="text-[var(--color-gold)]" /> ضمانت اصالت</div>
          </div>

          {product.detailsFa.length > 0 && (
            <div className="mt-10 border-t border-[var(--color-line)] pt-8">
              <h3 className="mb-4 font-display text-lg font-semibold">ویژگی‌های محصول</h3>
              <ul className="flex flex-col gap-2.5">
                {product.detailsFa.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-ink)]/70">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-gold)]" />
                    {d}
                  </li>
                ))}
              </ul>
              {product.materialFa && (
                <p className="mt-4 text-sm text-[var(--color-ink)]/60">
                  <span className="font-medium text-[var(--color-ink)]">جنس: </span>
                  {product.materialFa}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-20 border-t border-[var(--color-line)] pt-12">
        <h2 className="mb-8 font-display text-2xl font-bold">نظرات مشتریان</h2>
        <ProductReviews
          productId={product.id}
          initialReviews={reviews}
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
      </div>

      {related.length > 0 && (
        <div className="mt-20 border-t border-[var(--color-line)] pt-12">
          <h2 className="mb-8 font-display text-2xl font-bold">شما ممکن است این را هم دوست داشته باشید</h2>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
