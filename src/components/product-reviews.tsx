"use client";

import { useState, useTransition } from "react";
import RatingStars from "./rating-stars";
import { formatDate } from "@/lib/format";
import type { ReviewData } from "@/lib/types";
import { Star } from "lucide-react";

export default function ProductReviews({
  productId,
  initialReviews,
  rating,
  reviewCount,
}: {
  productId: number;
  initialReviews: ReviewData[];
  rating: string;
  reviewCount: number;
}) {
  const [reviewsList, setReviewsList] = useState(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [stars, setStars] = useState(5);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const breakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = reviewsList.filter((r) => r.rating === star).length;
    const pct = reviewsList.length ? Math.round((count / reviewsList.length) * 100) : 0;
    return { star, count, pct };
  });

  function submitReview(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !body.trim()) {
      setError("لطفاً نام و متن نظر را وارد کنید.");
      return;
    }
    startTransition(async () => {
      try {
        const res = await fetch(`/api/products/${productId}/reviews`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ authorName: name, titleFa: title, bodyFa: body, rating: stars }),
        });
        if (!res.ok) throw new Error("failed");
        const created = await res.json();
        setReviewsList((prev) => [created, ...prev]);
        setName("");
        setTitle("");
        setBody("");
        setStars(5);
        setShowForm(false);
      } catch {
        setError("ثبت نظر با خطا مواجه شد. لطفاً دوباره تلاش کنید.");
      }
    });
  }

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-[280px_1fr]">
      <div>
        <div className="rounded-2xl border border-[var(--color-line)] p-6 text-center">
          <p className="font-display text-5xl font-bold">{rating}</p>
          <RatingStars rating={rating} size={18} className="mt-2 justify-center" />
          <p className="mt-1 text-sm text-[var(--color-ink)]/55">از {reviewCount} نظر</p>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {breakdown.map((b) => (
            <div key={b.star} className="flex items-center gap-2 text-xs text-[var(--color-ink)]/60">
              <span className="w-10 shrink-0">{b.star} ستاره</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--color-sand)]">
                <div className="h-full bg-[var(--color-gold)]" style={{ width: `${b.pct}%` }} />
              </div>
              <span className="w-6 shrink-0 text-left">{b.count}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="mt-5 w-full rounded-full border border-[var(--color-ink)] py-2.5 text-sm font-medium transition hover:bg-[var(--color-ink)] hover:text-white"
        >
          {showForm ? "بستن فرم" : "ثبت نظر شما"}
        </button>

        {showForm && (
          <form onSubmit={submitReview} className="mt-4 flex flex-col gap-3 rounded-2xl border border-[var(--color-line)] p-4">
            <div className="flex items-center gap-1" dir="ltr">
              {Array.from({ length: 5 }).map((_, i) => (
                <button type="button" key={i} onClick={() => setStars(i + 1)}>
                  <Star
                    size={20}
                    className={i < stars ? "text-[var(--color-gold)] fill-[var(--color-gold)]" : "text-[var(--color-ink)]/20"}
                  />
                </button>
              ))}
            </div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="نام شما"
              className="rounded-lg border border-[var(--color-line)] px-3 py-2 text-sm outline-none focus:border-[var(--color-gold)]"
            />
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="عنوان نظر (اختیاری)"
              className="rounded-lg border border-[var(--color-line)] px-3 py-2 text-sm outline-none focus:border-[var(--color-gold)]"
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="تجربه خود را بنویسید..."
              rows={3}
              className="rounded-lg border border-[var(--color-line)] px-3 py-2 text-sm outline-none focus:border-[var(--color-gold)]"
            />
            {error && <p className="text-xs text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={isPending}
              className="rounded-full bg-[var(--color-ink)] py-2.5 text-sm font-medium text-white transition hover:bg-black disabled:opacity-50"
            >
              {isPending ? "در حال ارسال..." : "ارسال نظر"}
            </button>
          </form>
        )}
      </div>

      <div className="flex flex-col divide-y divide-[var(--color-line)]">
        {reviewsList.length === 0 && (
          <p className="py-6 text-sm text-[var(--color-ink)]/55">هنوز نظری ثبت نشده است. اولین نفر باشید!</p>
        )}
        {reviewsList.map((review) => (
          <div key={review.id} className="py-5 first:pt-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RatingStars rating={review.rating} size={13} />
                {review.verified && (
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                    خرید تأیید شده
                  </span>
                )}
              </div>
              <span className="text-xs text-[var(--color-ink)]/45">{formatDate(review.createdAt)}</span>
            </div>
            {review.titleFa && <p className="mt-2 text-sm font-semibold">{review.titleFa}</p>}
            <p className="mt-1 text-sm leading-7 text-[var(--color-ink)]/70">{review.bodyFa}</p>
            <p className="mt-2 text-xs text-[var(--color-ink)]/45">{review.authorName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
