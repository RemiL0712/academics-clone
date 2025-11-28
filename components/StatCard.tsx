"use client";

import { useEffect, useState } from "react";

type StatCardProps = {
  title: string;
  subtitle: string;
  target: number;
  suffix?: string;
  decimals?: number;
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
    const duration = 1200;
    const start = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setValue(target * progress);

      if (progress < 1) frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [target]);

  const formatted = value
    .toFixed(decimals)
    .replace(/\.0+$/, "");

  return (
    <div
      className="
        flex flex-col items-center justify-center text-center
        rounded-3xl bg-[var(--gs-surface-soft)] shadow-sm
        px-6 py-8
        w-full
        sm:px-8 sm:py-10
      "
    >
      <div className="mb-1 text-xs font-semibold tracking-wide text-[var(--gs-primary-mid)] uppercase">
        {title}
      </div>

      <div className="mb-3 text-[12px] text-[var(--gs-text-muted)] leading-tight">
        {subtitle}
      </div>

      <div className="whitespace-nowrap text-3xl font-semibold text-[var(--gs-primary-deep)] sm:text-4xl">
        {formatted}
        {suffix}
      </div>
    </div>
  );
}
