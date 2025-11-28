"use client";

import { useEffect, useState } from "react";

type StatCardProps = {
  title: string;
  subtitle: string;
  target: number;     // кінцеве число
  suffix?: string;    // M+, K+, + ...
  decimals?: number;  // кількість знаків після коми (для 1.3K)
};

export default function StatCard({
  title,
  subtitle,
  target,
  suffix = "",
  decimals = 0,
}: StatCardProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frameId: number;
    const duration = 1200; // ms
    const start = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const current = target * progress;
      setValue(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [target]);

  const formatted = value
    .toFixed(decimals)
    .replace(/\.0+$/, ""); // прибираємо зайві нулі типу "150.0"

  return (
    <div
      className="
        flex h-48 w-72 flex-col items-center justify-center
        rounded-3xl bg-[var(--gs-surface-soft)] px-6 text-center shadow-sm
        md:h-52 md:w-80
      "
    >
      <div className="mb-1 text-xs font-semibold tracking-wide text-[var(--gs-primary-mid)] uppercase">
        {title}
      </div>

      <div className="mb-3 text-[12px] text-[var(--gs-text-muted)] leading-tight">
        {subtitle}
      </div>

      <div className="whitespace-nowrap text-3xl font-semibold text-[var(--gs-primary-deep)] md:text-4xl">
        {formatted}
        {suffix}
      </div>
    </div>
  );
}
