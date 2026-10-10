import { db } from "@/db";
import { products, reviews } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productId = Number(id);
  if (!productId || Number.isNaN(productId)) {
    return Response.json({ error: "شناسه محصول نامعتبر است" }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body.authorName !== "string" || typeof body.bodyFa !== "string") {
    return Response.json({ error: "اطلاعات ناقص است" }, { status: 400 });
  }

  const rating = Math.min(5, Math.max(1, Number(body.rating) || 5));
  const authorName = body.authorName.trim().slice(0, 120) || "کاربر ماهرا";
  const bodyFa = body.bodyFa.trim().slice(0, 2000);
  const titleFa = typeof body.titleFa === "string" ? body.titleFa.trim().slice(0, 200) : null;

  if (!bodyFa) {
    return Response.json({ error: "متن نظر الزامی است" }, { status: 400 });
  }

  const [product] = await db.select().from(products).where(eq(products.id, productId));
  if (!product) {
    return Response.json({ error: "محصول یافت نشد" }, { status: 404 });
  }

  const [created] = await db
    .insert(reviews)
    .values({
      productId,
      authorName,
      rating,
      titleFa: titleFa || null,
      bodyFa,
      verified: false,
    })
    .returning();

  const newCount = product.reviewCount + 1;
  const newRating = (Number(product.rating) * product.reviewCount + rating) / newCount;

  await db
    .update(products)
    .set({ reviewCount: newCount, rating: newRating.toFixed(1) })
    .where(eq(products.id, productId));

  return Response.json({
    id: created.id,
    authorName: created.authorName,
    rating: created.rating,
    titleFa: created.titleFa,
    bodyFa: created.bodyFa,
    verified: created.verified,
    createdAt: created.createdAt.toISOString(),
  });
}
