import { notFound } from "next/navigation";
import { a1Level } from "@/lib/data/a1";
import { LessonCard } from "@/components/LessonCard";

export default function LevelPage({ params }: { params: { slug: string } }) {
  const level = a1Level.slug === params.slug ? a1Level : null;

  if (!level) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8">
        <div className="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase text-blue-700">
          {level.title}
        </div>
        <h1 className="text-4xl font-black text-slate-900">{level.title}</h1>
        <p className="mt-3 text-lg text-slate-600">{level.description}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {level.lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} levelSlug={level.slug} />
        ))}
      </div>
    </main>
  );
}
