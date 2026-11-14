import { notFound } from "next/navigation";
import { a1Level } from "@/lib/data/a1";
import { LessonQuiz } from "@/components/LessonQuiz";

export default function LessonDetailPage({
  params,
}: {
  params: { slug: string; lessonId: string };
}) {
  const level = a1Level.slug === params.slug ? a1Level : null;

  if (!level) {
    notFound();
  }

  const lesson = level.lessons.find((item) => item.id === params.lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8">
        <div className="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase text-blue-700">
          {level.title}
        </div>
        <h1 className="text-4xl font-black text-slate-900">{lesson.title}</h1>
        <p className="mt-2 text-lg text-slate-600">{lesson.objective}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <h2 className="mb-4 text-2xl font-bold text-slate-800">Vocabulary</h2>

          <div className="space-y-3">
            {lesson.vocabulary.map((item) => (
              <div
                key={item.word}
                className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 p-3"
              >
                <div>
                  <div className="font-semibold text-slate-800">{item.word}</div>
                  <div className="text-sm text-slate-500">{item.translation}</div>
                </div>
                <div className="max-w-xs text-sm text-slate-600">{item.example}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-soft">
          <h3 className="mb-4 text-xl font-bold">Grammar focus</h3>
          <ul className="space-y-3">
            {lesson.grammar.map((rule) => (
              <li key={rule} className="rounded-lg bg-slate-800 px-3 py-2">
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <LessonQuiz lesson={lesson} />
    </main>
  );
}
