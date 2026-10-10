export type ProductColor = { name: string; hex: string };

export type ProductCardData = {
  id: number;
  slug: string;
  nameFa: string;
  subtitleFa: string | null;
  price: string;
  compareAtPrice: string | null;
  isNew: boolean;
  isFeatured: boolean;
  rating: string;
  reviewCount: number;
  categoryNameFa: string;
  categorySlug: string;
  image: string | null;
  hoverImage: string | null;
  colors: ProductColor[];
};

export type ProductDetailData = ProductCardData & {
  descriptionFa: string;
  detailsFa: string[];
  materialFa: string | null;
  sizes: string[];
  stock: number;
  images: { url: string; alt: string | null }[];
};

export type ReviewData = {
  id: number;
  authorName: string;
  rating: number;
  titleFa: string | null;
  bodyFa: string;
  verified: boolean;
  createdAt: string;
};

export type CategoryData = {
  id: number;
  slug: string;
  name: string;
  nameFa: string;
  descriptionFa: string | null;
  heroImage: string | null;
};
