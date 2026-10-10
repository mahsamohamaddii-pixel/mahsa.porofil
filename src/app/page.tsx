import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Gem, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { getCategories, getFeaturedProducts, getNewProducts } from "@/lib/data";
import { BANNER_IMAGES } from "@/lib/banner-images";
import ProductCard from "@/components/product-card";
import RatingStars from "@/components/rating-stars";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [categories, featured, fresh] = await Promise.all([
    getCategories(),
    getFeaturedProducts(8),
    getNewProducts(4),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative grid min-h-[86vh] grid-cols-1 md:grid-cols-2">
          <div className="relative order-2 flex flex-col justify-center gap-6 bg-[var(--color-paper)] px-6 py-16 md:order-1 md:px-14 lg:px-20">
            <span className="fade-up inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-gold)]/40 px-4 py-1.5 text-xs tracking-wide text-[var(--color-gold)]">
              <Sparkles size={14} /> کالکشن پاییز و زمستان
            </span>
            <h1
              className="fade-up font-display text-[2.6rem] font-bold leading-[1.15] text-[var(--color-ink)] sm:text-6xl"
              style={{ animationDelay: "90ms" }}
            >
              ظرافتی که
              <br />
              <span className="italic text-[var(--color-gold)]">از آنِ شماست</span>
            </h1>
            <p
              className="fade-up max-w-md text-base leading-8 text-[var(--color-ink)]/65"
              style={{ animationDelay: "160ms" }}
            >
              ماهرا مقصدی برای زنانی است که ظرافت، اصالت و مد روز را در کنار هم می‌خواهند؛ از پیراهن‌های
              مجلسی گرفته تا پالتوهای پریمیوم و اکسسوری‌های خاص.
            </p>
            <div className="fade-up flex flex-wrap items-center gap-4" style={{ animationDelay: "230ms" }}>
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-black"
              >
                مشاهده فروشگاه
                <ArrowLeft size={16} className="transition group-hover:-translate-x-1" />
              </Link>
              <Link
                href="/shop?category=dresses"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-ink)]/20 px-7 py-3.5 text-sm font-medium text-[var(--color-ink)] transition hover:bg-[var(--color-sand)]"
              >
                کالکشن پیراهن مجلسی
              </Link>
            </div>

            <div
              className="fade-up mt-6 flex flex-wrap items-center gap-6 border-t border-[var(--color-line)] pt-6 text-xs text-[var(--color-ink)]/55"
              style={{ animationDelay: "300ms" }}
            >
              <span className="flex items-center gap-2"><Truck size={16} className="text-[var(--color-gold)]" /> ارسال سریع سراسری</span>
              <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-[var(--color-gold)]" /> ضمانت اصالت</span>
              <span className="flex items-center gap-2"><Gem size={16} className="text-[var(--color-gold)]" /> دوخت پریمیوم</span>
            </div>
          </div>

          <div className="relative order-1 min-h-[50vh] md:order-2">
            <Image
              src={BANNER_IMAGES.hero}
              alt="مدل با پیراهن مجلسی ماهرا"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent md:bg-gradient-to-l" />
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-[var(--color-line)] bg-[var(--color-sand)] py-3">
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap text-sm tracking-wide text-[var(--color-ink)]/60">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12">
              <span>پیراهن‌های مجلسی دست‌دوز</span>
              <span>•</span>
              <span>پالتوهای پریمیوم زمستانی</span>
              <span>•</span>
              <span>استایل مینیمال لوکس</span>
              <span>•</span>
              <span>اکسسوری‌های اختصاصی</span>
              <span>•</span>
              <span>ارسال به سراسر ایران</span>
              <span>•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Collections */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-8">
        <div className="mb-10 flex flex-col items-center text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold)]">کالکشن‌ها</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">دنیای ماهرا را کشف کنید</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Link
              href={`/shop?category=${cat.slug}`}
              key={cat.id}
              className="fade-up group relative block aspect-[3/4] overflow-hidden rounded-2xl"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              {cat.heroImage && (
                <Image
                  src={cat.heroImage}
                  alt={cat.nameFa}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <h3 className="font-display text-xl font-semibold">{cat.nameFa}</h3>
                <span className="mt-2 inline-flex items-center gap-1 text-xs text-white/80">
                  مشاهده کالکشن <ArrowLeft size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-[var(--color-sand)]/50 py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold)]">پرفروش‌ترین‌ها</p>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">منتخب ماهرا</h2>
            </div>
            <Link href="/shop" className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-gold)]">
              مشاهده همه <ArrowLeft size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle / Brand story */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-24 md:grid-cols-2 md:px-8">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
          <Image
            src={BANNER_IMAGES.lifestyle1}
            alt="داستان برند ماهرا"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold)]">داستان ماهرا</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-snug sm:text-4xl">
            طراحی‌شده برای زنانی که
            <span className="italic text-[var(--color-gold)]"> متفاوت</span> می‌درخشند
          </h2>
          <p className="mt-5 max-w-lg leading-8 text-[var(--color-ink)]/65">
            هر قطعه از مجموعه ماهرا با دقت در انتخاب پارچه، دوخت ظریف و جزئیات حساب‌شده طراحی می‌شود. ما
            باور داریم لوکس بودن یعنی کیفیتی که احساس می‌شود، نه فقط دیده می‌شود. از آتلیه طراحی تا جعبه‌ی
            بسته‌بندی، هر مرحله با عشق و دقت برای شما آماده می‌شود.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-6 border-t border-[var(--color-line)] pt-8">
            <div>
              <p className="font-display text-3xl font-bold text-[var(--color-gold)]">+20</p>
              <p className="mt-1 text-xs text-[var(--color-ink)]/55">طراحی انحصاری</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-[var(--color-gold)]">۴.۸</p>
              <p className="mt-1 text-xs text-[var(--color-ink)]/55">میانگین رضایت مشتریان</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-[var(--color-gold)]">+۵</p>
              <p className="mt-1 text-xs text-[var(--color-ink)]/55">سال تجربه دوخت لوکس</p>
            </div>
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold)]">تازه از راه رسیده</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">جدیدترین‌های ماهرا</h2>
          </div>
          <Link href="/shop" className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-gold)]">
            مشاهده همه <ArrowLeft size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {fresh.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Testimonial strip */}
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-8">
          <RatingStars rating={5} size={20} className="justify-center" />
          <p className="mt-6 font-display text-2xl italic leading-relaxed sm:text-3xl">
            «کیفیت پارچه و دوخت ماهرا واقعاً در سطح برندهای لوکس بین‌المللیه. از بسته‌بندی گرفته تا تجربه
            خرید، همه‌چیز پریمیوم بود.»
          </p>
          <p className="mt-6 text-sm text-white/60">پریسا کریمی، مشتری ماهرا</p>
        </div>
      </section>
    </div>
  );
}
