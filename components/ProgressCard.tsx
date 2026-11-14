type Props = {
  title: string;
  value: string;
  accent?: "blue" | "green" | "amber";
};

export function ProgressCard({ title, value, accent = "blue" }: Props) {
  const className =
    accent === "green"
      ? "bg-green-100 text-green-700"
      : accent === "amber"
        ? "bg-amber-100 text-amber-700"
        : "bg-blue-100 text-blue-700";

  return (
    <div className="rounded-2xl bg-white p-5 shadow-soft">
      <div className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${className}`}>
        {title}
      </div>
      <div className="mt-4 text-3xl font-black text-slate-900">{value}</div>
    </div>
  );
}
