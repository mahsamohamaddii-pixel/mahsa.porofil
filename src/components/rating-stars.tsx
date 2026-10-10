import { Star } from "lucide-react";
import clsx from "clsx";

export default function RatingStars({
  rating,
  size = 14,
  className,
}: {
  rating: number | string;
  size?: number;
  className?: string;
}) {
  const value = Math.round(Number(rating) * 2) / 2;
  return (
    <div className={clsx("flex items-center gap-0.5", className)} dir="ltr">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = value >= i + 1;
        const half = !filled && value > i && value < i + 1;
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star size={size} className="absolute inset-0 text-[var(--color-gold)]/30" />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: filled ? "100%" : half ? "50%" : "0%" }}
            >
              <Star size={size} className="text-[var(--color-gold)] fill-[var(--color-gold)]" />
            </span>
          </span>
        );
      })}
    </div>
  );
}
