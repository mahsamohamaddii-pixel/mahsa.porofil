import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  numeric,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 80 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  nameFa: varchar("name_fa", { length: 120 }).notNull(),
  descriptionFa: text("description_fa"),
  heroImage: text("hero_image"),
  position: integer("position").notNull().default(0),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  name: varchar("name", { length: 200 }).notNull(),
  nameFa: varchar("name_fa", { length: 200 }).notNull(),
  subtitleFa: varchar("subtitle_fa", { length: 240 }),
  descriptionFa: text("description_fa").notNull(),
  detailsFa: jsonb("details_fa").$type<string[]>().default([]),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id),
  price: numeric("price", { precision: 12, scale: 0 }).notNull(),
  compareAtPrice: numeric("compare_at_price", { precision: 12, scale: 0 }),
  colors: jsonb("colors").$type<{ name: string; hex: string }[]>().default([]),
  sizes: jsonb("sizes").$type<string[]>().default([]),
  materialFa: varchar("material_fa", { length: 160 }),
  isFeatured: boolean("is_featured").notNull().default(false),
  isNew: boolean("is_new").notNull().default(false),
  stock: integer("stock").notNull().default(25),
  rating: numeric("rating", { precision: 2, scale: 1 }).notNull().default("0"),
  reviewCount: integer("review_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const productImages = pgTable("product_images", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  alt: varchar("alt", { length: 240 }),
  position: integer("position").notNull().default(0),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  authorName: varchar("author_name", { length: 120 }).notNull(),
  rating: integer("rating").notNull(),
  titleFa: varchar("title_fa", { length: 200 }),
  bodyFa: text("body_fa").notNull(),
  verified: boolean("verified").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: varchar("order_number", { length: 32 }).notNull().unique(),
  fullName: varchar("full_name", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  email: varchar("email", { length: 160 }),
  province: varchar("province", { length: 120 }).notNull(),
  city: varchar("city", { length: 120 }).notNull(),
  address: text("address").notNull(),
  postalCode: varchar("postal_code", { length: 20 }),
  notes: text("notes"),
  paymentMethod: varchar("payment_method", { length: 40 }).notNull().default("cod"),
  subtotal: numeric("subtotal", { precision: 12, scale: 0 }).notNull(),
  shippingCost: numeric("shipping_cost", { precision: 12, scale: 0 }).notNull().default("0"),
  discount: numeric("discount", { precision: 12, scale: 0 }).notNull().default("0"),
  total: numeric("total", { precision: 12, scale: 0 }).notNull(),
  status: varchar("status", { length: 30 }).notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: integer("product_id").references(() => products.id),
  nameFa: varchar("name_fa", { length: 200 }).notNull(),
  image: text("image"),
  price: numeric("price", { precision: 12, scale: 0 }).notNull(),
  quantity: integer("quantity").notNull(),
  size: varchar("size", { length: 20 }),
  color: varchar("color", { length: 40 }),
});
