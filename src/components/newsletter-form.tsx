"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  }

  if (submitted) {
    return <p className="text-sm text-[var(--color-gold-light)]">با تشکر! به زودی از جدیدترین‌ها باخبر می‌شوید.</p>;
  }

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ایمیل شما"
        className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-[var(--color-gold-light)]"
      />
      <button className="shrink-0 rounded-full bg-[var(--color-gold)] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--color-gold-light)]">
        عضویت
      </button>
    </form>
  );
}
