import { db } from "@/db";
import { categories, products, productImages, reviews } from "@/db/schema";
import { and, asc, desc, eq, gte, lte, inArray, sql } from "drizzle-orm";
import type { CategoryData, ProductCardData, ProductDetailData, ReviewData } from "./types";

export async function getCategories(): Promise<CategoryData[]> {
  const rows = await db
    .select({
      id: categories.id,
      slug: categories.slug,
      name: categories.name,
      nameFa: categories.nameFa,
      descriptionFa: categories.descriptionFa,
      heroImage: categories.heroImage,
    })
    .from(categories)
    .orderBy(asc(categories.position));
  return rows;
}

const primaryImageSub = db
  .select({
    productId: productImages.productId,
    url: productImages.url,
  })
  .from(productImages)
  .as("primary_image");

export type ProductFilters = {
  categorySlug?: string;
  sort?: "newest" | "price-asc" | "price-desc" | "rating" | "featured";
  minPrice?: number;
  maxPrice?: number;
  colors?: string[];
  sizes?: string[];
  search?: string;
};

export async function getProducts(filters: ProductFilters = {}): Promise<ProductCardData[]> {
  const conditions = [] as any[];

  // Resolve category id if needed
  let categoryId: number | undefined;
  if (filters.categorySlug) {
    const [cat] = await db.select({ id: categories.id }).from(categories).where(eq(categories.slug, filters.categorySlug));
    categoryId = cat?.id;
    if (!categoryId) return [];
  }

  if (categoryId) conditions.push(eq(products.categoryId, categoryId));
  if (filters.minPrice != null) conditions.push(gte(products.price, String(filters.minPrice)));
  if (filters.maxPrice != null) conditions.push(lte(products.price, String(filters.maxPrice)));
  if (filters.search) {
    conditions.push(sql`(${products.nameFa} ilike ${"%" + filters.search + "%"} or ${products.descriptionFa} ilike ${"%" + filters.search + "%"})`);
  }

  let orderBy;
  switch (filters.sort) {
    case "price-asc":
      orderBy = asc(products.price);
      break;
    case "price-desc":
      orderBy = desc(products.price);
      break;
    case "rating":
      orderBy = desc(products.rating);
      break;
    case "featured":
      orderBy = desc(products.isFeatured);
      break;
    default:
      orderBy = desc(products.createdAt);
  }

  const rows = await db
    .select({
      id: products.id,
      slug: products.slug,
      nameFa: products.nameFa,
      subtitleFa: products.subtitleFa,
      price: products.price,
      compareAtPrice: products.compareAtPrice,
      isNew: products.isNew,
      isFeatured: products.isFeatured,
      rating: products.rating,
      reviewCount: products.reviewCount,
      colors: products.colors,
      sizes: products.sizes,
      categoryNameFa: categories.nameFa,
      categorySlug: categories.slug,
    })
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(orderBy);

  const ids = rows.map((r) => r.id);
  const images = ids.length
    ? await db
        .select({ productId: productImages.productId, url: productImages.url, position: productImages.position })
        .from(productImages)
        .where(inArray(productImages.productId, ids))
        .orderBy(asc(productImages.position))
    : [];

  const imagesByProduct = new Map<number, string[]>();
  for (const img of images) {
    const list = imagesByProduct.get(img.productId) ?? [];
    list.push(img.url);
    imagesByProduct.set(img.productId, list);
  }

  let result: ProductCardData[] = rows.map((r) => {
    const imgs = imagesByProduct.get(r.id) ?? [];
    return {
      id: r.id,
      slug: r.slug,
      nameFa: r.nameFa,
      subtitleFa: r.subtitleFa,
      price: r.price,
      compareAtPrice: r.compareAtPrice,
      isNew: r.isNew,
      isFeatured: r.isFeatured,
      rating: r.rating,
      reviewCount: r.reviewCount,
      categoryNameFa: r.categoryNameFa,
      categorySlug: r.categorySlug,
      image: imgs[0] ?? null,
      hoverImage: imgs[1] ?? imgs[0] ?? null,
      colors: (r.colors as { name: string; hex: string }[]) ?? [],
    };
  });

  if (filters.colors?.length) {
    result = result.filter((p) => p.colors.some((c) => filters.colors!.includes(c.name)));
  }

  return result;
}

export async function getFeaturedProducts(limit = 8): Promise<ProductCardData[]> {
  const all = await getProducts({ sort: "featured" });
  const featured = all.filter((p) => p.isFeatured);
  return (featured.length ? featured : all).slice(0, limit);
}

export async function getNewProducts(limit = 8): Promise<ProductCardData[]> {
  const all = await getProducts({ sort: "newest" });
  return all.slice(0, limit);
}

export async function getProductBySlug(slug: string): Promise<ProductDetailData | null> {
  const [row] = await db
    .select({
      id: products.id,
      slug: products.slug,
      nameFa: products.nameFa,
      subtitleFa: products.subtitleFa,
      descriptionFa: products.descriptionFa,
      detailsFa: products.detailsFa,
      price: products.price,
      compareAtPrice: products.compareAtPrice,
      isNew: products.isNew,
      isFeatured: products.isFeatured,
      rating: products.rating,
      reviewCount: products.reviewCount,
      colors: products.colors,
      sizes: products.sizes,
      materialFa: products.materialFa,
      stock: products.stock,
      categoryNameFa: categories.nameFa,
      categorySlug: categories.slug,
    })
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(products.slug, slug));

  if (!row) return null;

  const imgs = await db
    .select({ url: productImages.url, alt: productImages.alt })
    .from(productImages)
    .where(eq(productImages.productId, row.id))
    .orderBy(asc(productImages.position));

  return {
    id: row.id,
    slug: row.slug,
    nameFa: row.nameFa,
    subtitleFa: row.subtitleFa,
    descriptionFa: row.descriptionFa,
    detailsFa: (row.detailsFa as string[]) ?? [],
    price: row.price,
    compareAtPrice: row.compareAtPrice,
    isNew: row.isNew,
    isFeatured: row.isFeatured,
    rating: row.rating,
    reviewCount: row.reviewCount,
    colors: (row.colors as { name: string; hex: string }[]) ?? [],
    sizes: (row.sizes as string[]) ?? [],
    materialFa: row.materialFa,
    stock: row.stock,
    categoryNameFa: row.categoryNameFa,
    categorySlug: row.categorySlug,
    image: imgs[0]?.url ?? null,
    hoverImage: imgs[1]?.url ?? null,
    images: imgs,
  };
}

export async function getReviewsForProduct(productId: number): Promise<ReviewData[]> {
  const rows = await db
    .select()
    .from(reviews)
    .where(eq(reviews.productId, productId))
    .orderBy(desc(reviews.createdAt));

  return rows.map((r) => ({
    id: r.id,
    authorName: r.authorName,
    rating: r.rating,
    titleFa: r.titleFa,
    bodyFa: r.bodyFa,
    verified: r.verified,
    createdAt: r.createdAt.toISOString(),
  }));
}

export async function getRelatedProducts(categorySlug: string, excludeSlug: string, limit = 4): Promise<ProductCardData[]> {
  const all = await getProducts({ categorySlug });
  return all.filter((p) => p.slug !== excludeSlug).slice(0, limit);
}
