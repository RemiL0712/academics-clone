"use client";

import { useEffect, useState } from "react";

type StatCardProps = {
  title: string;
  subtitle: string;
  value: number;
  suffix: string;
};

export default function StatCard({ title, subtitle, value, suffix }: StatCardProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1200;
    const step = end / (duration / 16);

    const animate = () => {
      start += step;
      if (start >= end) {
        setCount(end);
      } else {
        setCount(Number(start.toFixed(1)));
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <div
      className="
        flex flex-col justify-center items-center 
        rounded-3xl bg-[var(--gs-surface-soft)] shadow-sm 
        min-h-[230px] md:min-h-[250px] 
        px-8 py-6 text-center
      "
    >
      <div className="flex flex-col items-center">
        <div className="mb-1 text-xs font-semibold tracking-wide text-[var(--gs-primary-mid)] uppercase">
          {title}
        </div>

        <div className="mb-3 text-[12px] text-[var(--gs-text-muted)] leading-tight">
          {subtitle}
        </div>

        <div className="text-3xl font-semibold text-[var(--gs-primary-deep)] md:text-4xl">
          {count}
          {suffix}
        </div>
      </div>
    </div>
  );
}
