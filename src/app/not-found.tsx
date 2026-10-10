import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-display text-7xl font-bold text-[var(--color-gold)]">۴۰۴</p>
      <h1 className="font-display text-2xl font-bold">صفحه مورد نظر پیدا نشد</h1>
      <p className="text-sm text-[var(--color-ink)]/55">
        متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا جابه‌جا شده است.
      </p>
      <Link
        href="/"
        className="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3 text-sm font-medium text-white transition hover:bg-black"
      >
        بازگشت به صفحه اصلی <ArrowLeft size={15} />
      </Link>
    </div>
  );
}
