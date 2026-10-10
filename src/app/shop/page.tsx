import { getCategories, getProducts } from "@/lib/data";
import ProductCard from "@/components/product-card";
import ShopFilters, { SortDropdown } from "@/components/shop-filters";

export const dynamic = "force-dynamic";

type SearchParams = {
  category?: string;
  sort?: string;
  min?: string;
  max?: string;
  color?: string | string[];
  q?: string;
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const colors = params.color ? (Array.isArray(params.color) ? params.color : [params.color]) : [];

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({
      categorySlug: params.category,
      sort: (params.sort as any) ?? "newest",
      minPrice: params.min ? Number(params.min) : undefined,
      maxPrice: params.max ? Number(params.max) : undefined,
      colors,
      search: params.q,
    }),
  ]);

  const activeCategory = categories.find((c) => c.slug === params.category);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
      <div className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold)]">
          {params.q ? "نتایج جستجو" : "فروشگاه ماهرا"}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold">
          {params.q ? `نتایج برای «${params.q}»` : activeCategory ? activeCategory.nameFa : "تمام محصولات"}
        </h1>
        {activeCategory?.descriptionFa && (
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--color-ink)]/60">
            {activeCategory.descriptionFa}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-10 md:flex-row">
        <ShopFilters categories={categories} resultCount={products.length} />

        <div className="flex-1">
          <div className="mb-6 hidden items-center justify-between md:flex">
            <p className="text-sm text-[var(--color-ink)]/55">{products.length} محصول یافت شد</p>
            <SortDropdown />
          </div>

          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[var(--color-line)] py-24 text-center">
              <p className="text-lg font-medium">محصولی با این فیلترها پیدا نشد</p>
              <p className="text-sm text-[var(--color-ink)]/55">لطفاً فیلترهای دیگری را امتحان کنید.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3">
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
