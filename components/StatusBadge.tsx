type StatusType = 
  | "pending" 
  | "paid" 
  | "in_progress" 
  | "completed" 
  | "cancelled";

const STATUS_CONFIG: Record<
  StatusType,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending payment",
    className: "bg-amber-100 text-amber-800 ring-amber-200",
  },
  paid: {
    label: "Paid",
    className: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  },
  in_progress: {
    label: "In progress",
    className: "bg-sky-100 text-sky-800 ring-sky-200",
  },
  completed: {
    label: "Completed",
    className: "bg-zinc-100 text-zinc-800 ring-zinc-200",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-rose-100 text-rose-800 ring-rose-200",
  },
};

interface StatusBadgeProps {
  status: string;
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
