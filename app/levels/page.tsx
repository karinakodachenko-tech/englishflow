import Link from "next/link";

export default function LevelsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-8 text-4xl font-black text-slate-900">Choose your level</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <LevelCard
          title="A1 — Beginner"
          description="Basic English for greetings, family, daily routines, food, shopping, travel, and simple communication."
          slug="a1"
          lessons={8}
        />
      </div>
    </main>
  );
}

function LevelCard({
  title,
  description,
  slug,
  lessons,
}: {
  title: string;
  description: string;
  slug: string;
  lessons: number;
}) {
  return (
    <Link
      href={`/levels/${slug}`}
      className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase text-blue-700">
        A1
      </div>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <p className="mt-2 text-slate-600">{description}</p>
      <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
        <span>{lessons} lessons</span>
        <span>Open →</span>
      </div>
    </Link>
  );
}
