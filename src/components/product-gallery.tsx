"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

export default function ProductGallery({
  images,
  alt,
}: {
  images: { url: string; alt: string | null }[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const list = images.length ? images : [{ url: "", alt }];

  function go(delta: number) {
    setActive((a) => (a + delta + list.length) % list.length);
  }

  return (
    <div>
      <div className="flex flex-col-reverse gap-3 md:flex-row">
        <div className="flex gap-3 overflow-x-auto md:flex-col md:overflow-visible">
          {list.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                active === i ? "border-[var(--color-gold)]" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              {img.url && <Image src={img.url} alt={img.alt ?? alt} fill className="object-cover" sizes="64px" />}
            </button>
          ))}
        </div>

        <div className="relative aspect-[3/4] flex-1 overflow-hidden rounded-2xl bg-[var(--color-sand)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0"
            >
              {list[active]?.url && (
                <Image
                  src={list[active].url}
                  alt={list[active].alt ?? alt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              )}
            </motion.div>
          </AnimatePresence>

          <button
            onClick={() => setLightbox(true)}
            className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-2 text-xs font-medium shadow-md transition hover:bg-white"
          >
            <ZoomIn size={14} /> بزرگ‌نمایی
          </button>

          {list.length > 1 && (
            <>
              <button
                onClick={() => go(-1)}
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition hover:bg-white"
                aria-label="تصویر قبلی"
              >
                <ChevronRight size={18} />
              </button>
              <button
                onClick={() => go(1)}
                className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition hover:bg-white"
                aria-label="تصویر بعدی"
              >
                <ChevronLeft size={18} />
              </button>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-6"
            onClick={() => setLightbox(false)}
          >
            <button className="absolute left-6 top-6 text-white" aria-label="بستن">
              <X size={26} />
            </button>
            <div className="relative h-full w-full max-w-3xl">
              {list[active]?.url && (
                <Image src={list[active].url} alt={list[active].alt ?? alt} fill className="object-contain" sizes="100vw" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
