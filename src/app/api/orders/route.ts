import { db } from "@/db";
import { orders, orderItems, products, productImages } from "@/db/schema";
import { eq, inArray, asc } from "drizzle-orm";
import { NextRequest } from "next/server";

const FREE_SHIPPING_THRESHOLD = 5000000;
const SHIPPING_COST = 450000;

function generateOrderNumber() {
  const date = new Date();
  const stamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `MH-${stamp}-${rand}`;
}

type IncomingItem = {
  productId: number;
  quantity: number;
  size: string;
  color: string;
};

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return Response.json({ error: "درخواست نامعتبر است" }, { status: 400 });

  const { fullName, phone, email, province, city, address, postalCode, notes, paymentMethod, items } = body as {
    fullName?: string;
    phone?: string;
    email?: string;
    province?: string;
    city?: string;
    address?: string;
    postalCode?: string;
    notes?: string;
    paymentMethod?: string;
    items?: IncomingItem[];
  };

  if (!fullName?.trim() || !phone?.trim() || !province?.trim() || !city?.trim() || !address?.trim()) {
    return Response.json({ error: "لطفاً تمام فیلدهای الزامی را تکمیل کنید." }, { status: 400 });
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    return Response.json({ error: "سبد خرید شما خالی است." }, { status: 400 });
  }

  const productIds = items.map((i) => i.productId);
  const dbProducts = await db.select().from(products).where(inArray(products.id, productIds));
  const dbImages = await db
    .select()
    .from(productImages)
    .where(inArray(productImages.productId, productIds))
    .orderBy(asc(productImages.position));

  const imageByProduct = new Map<number, string>();
  for (const img of dbImages) {
    if (!imageByProduct.has(img.productId)) imageByProduct.set(img.productId, img.url);
  }

  const productById = new Map(dbProducts.map((p) => [p.id, p]));

  let subtotal = 0;
  const resolvedItems: {
    productId: number;
    nameFa: string;
    image: string | null;
    price: number;
    quantity: number;
    size: string;
    color: string;
  }[] = [];

  for (const item of items) {
    const product = productById.get(item.productId);
    if (!product) continue;
    const quantity = Math.max(1, Math.min(10, Number(item.quantity) || 1));
    const price = Number(product.price);
    subtotal += price * quantity;
    resolvedItems.push({
      productId: product.id,
      nameFa: product.nameFa,
      image: imageByProduct.get(product.id) ?? null,
      price,
      quantity,
      size: item.size || "",
      color: item.color || "",
    });
  }

  if (resolvedItems.length === 0) {
    return Response.json({ error: "محصولات سبد خرید معتبر نیستند." }, { status: 400 });
  }

  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shippingCost;
  const orderNumber = generateOrderNumber();

  const [order] = await db
    .insert(orders)
    .values({
      orderNumber,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email?.trim() || null,
      province: province.trim(),
      city: city.trim(),
      address: address.trim(),
      postalCode: postalCode?.trim() || null,
      notes: notes?.trim() || null,
      paymentMethod: paymentMethod === "card" ? "card" : "cod",
      subtotal: String(subtotal),
      shippingCost: String(shippingCost),
      discount: "0",
      total: String(total),
      status: "pending",
    })
    .returning();

  await db.insert(orderItems).values(
    resolvedItems.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      nameFa: item.nameFa,
      image: item.image,
      price: String(item.price),
      quantity: item.quantity,
      size: item.size,
      color: item.color,
    })),
  );

  return Response.json({ orderNumber: order.orderNumber });
}
