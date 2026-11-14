import Link from "next/link";
import type { Lesson } from "@/lib/types";

type Props = {
  lesson: Lesson;
  levelSlug: string;
};

export function LessonCard({ lesson, levelSlug }: Props) {
  return (
    <Link
      href={`/levels/${levelSlug}/lesson/${lesson.id}`}
      className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">
        {lesson.topic}
      </div>
      <h3 className="text-2xl font-bold text-slate-900">{lesson.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{lesson.objective}</p>
      <div className="mt-4 text-sm font-medium text-slate-500">{lesson.duration}</div>
    </Link>
  );
}
