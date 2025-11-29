type StatusType = "pending" | "paid" | "in_progress" | "completed" | "cancelled";

const STATUS_CONFIG: Record<
  StatusType,
  { label: string; className: string }
> = {
  pending: {
    label: "Очікує оплату",
    className: "bg-amber-100 text-amber-800 ring-amber-200",
  },
  paid: {
    label: "Оплачено",
    className: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  },
  in_progress: {
    label: "В роботі",
    className: "bg-sky-100 text-sky-800 ring-sky-200",
  },
  completed: {
    label: "Виконано",
    className: "bg-zinc-100 text-zinc-800 ring-zinc-200",
  },
  cancelled: {
    label: "Скасовано",
    className: "bg-rose-100 text-rose-800 ring-rose-200",
  },
};

interface StatusBadgeProps {
  status: string; // беремо з БД як є
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = status.toLowerCase() as StatusType;

  const config =
    STATUS_CONFIG[normalized] ??
    ({
      label: status,
      className: "bg-zinc-100 text-zinc-700 ring-zinc-200",
    } as const);

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        config.className,
      ].join(" ")}
    >
      {config.label}
    </span>
  );
}
