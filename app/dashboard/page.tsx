"use client";

import { useEffect, useState } from "react";
import { ProgressCard } from "@/components/ProgressCard";
import { getProgressSummary, loadProgress } from "@/lib/repetition";

export default function DashboardPage() {
  const [summary, setSummary] = useState({
    completedLessons: 0,
    knownWords: 0,
    learningWords: 0,
    newWords: 0,
  });

  useEffect(() => {
    const progress = loadProgress();
    setSummary(getProgressSummary(progress));
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-black text-slate-900">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-4">
        <ProgressCard title="Completed lessons" value={`${summary.completedLessons}`} accent="blue" />
        <ProgressCard title="Known words" value={`${summary.knownWords}`} accent="green" />
        <ProgressCard title="Learning" value={`${summary.learningWords}`} accent="amber" />
        <ProgressCard title="New" value={`${summary.newWords}`} accent="blue" />
      </div>

      <div className="mt-10 rounded-2xl bg-white p-6 shadow-soft">
        <h2 className="mb-4 text-2xl font-bold text-slate-800">Study summary</h2>
        <ul className="space-y-3 text-slate-600">
          <li>• Continue learning a new lesson to unlock more vocabulary.</li>
          <li>• Use Review to revisit words that are due.</li>
          <li>• Complete quizzes to update your learning progress.</li>
        </ul>
      </div>
    </main>
  );
}
