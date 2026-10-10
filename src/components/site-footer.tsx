import Link from "next/link";
import { Camera, MessageCircle, Send, Truck, ShieldCheck, Gem } from "lucide-react";
import NewsletterForm from "./newsletter-form";

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[var(--color-line)] bg-[#141009] text-white/80">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 md:grid-cols-4 md:px-8">
        <div>
          <span className="font-display text-xl font-bold tracking-[0.18em] text-white">MAHRA</span>
          <p className="mt-3 text-sm leading-7 text-white/55">
            ماهرا، مقصدی برای زنانی که ظرافت، اصالت و مدرنیته را همزمان می‌خواهند. پوشاک و اکسسوری لوکس با
            کیفیتی که در هر دوخت احساس می‌شود.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <a href="#" className="rounded-full border border-white/15 p-2 transition hover:bg-white/10" aria-label="اینستاگرام">
              <Camera size={16} />
            </a>
            <a href="#" className="rounded-full border border-white/15 p-2 transition hover:bg-white/10" aria-label="تلگرام">
              <Send size={16} />
            </a>
            <a href="#" className="rounded-full border border-white/15 p-2 transition hover:bg-white/10" aria-label="واتساپ">
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">فروشگاه</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-white/55">
            <li><Link className="transition hover:text-[var(--color-gold-light)]" href="/shop?category=dresses">پیراهن مجلسی</Link></li>
            <li><Link className="transition hover:text-[var(--color-gold-light)]" href="/shop?category=coats">پالتو و بارانی</Link></li>
            <li><Link className="transition hover:text-[var(--color-gold-light)]" href="/shop?category=minimal">استایل مینیمال</Link></li>
            <li><Link className="transition hover:text-[var(--color-gold-light)]" href="/shop?category=accessories">اکسسوری</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">راهنما</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-white/55">
            <li><Link className="transition hover:text-[var(--color-gold-light)]" href="/checkout">نحوه ثبت سفارش</Link></li>
            <li><Link className="transition hover:text-[var(--color-gold-light)]" href="/cart">سبد خرید</Link></li>
            <li><a className="transition hover:text-[var(--color-gold-light)]" href="#">راهنمای سایزبندی</a></li>
            <li><a className="transition hover:text-[var(--color-gold-light)]" href="#">شرایط مرجوعی</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">عضویت در خبرنامه</h4>
          <p className="mb-3 text-sm text-white/55">از جدیدترین کالکشن‌ها و تخفیف‌های ویژه باخبر شوید.</p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 text-sm text-white/60 sm:grid-cols-3 md:px-8">
          <div className="flex items-center gap-3">
            <Truck size={20} className="text-[var(--color-gold-light)]" />
            ارسال سریع به سراسر کشور
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="text-[var(--color-gold-light)]" />
            ضمانت اصالت کالا
          </div>
          <div className="flex items-center gap-3">
            <Gem size={20} className="text-[var(--color-gold-light)]" />
            طراحی و دوخت پریمیوم
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-white/40 md:px-8">
        © {new Date().getFullYear()} MAHRA — تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
}
