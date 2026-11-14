"use client";

import { useEffect, useMemo, useState } from "react";
import type { VocabularyItem } from "@/lib/types";
import {
  addCourseWords,
  emptyProgress,
  getDueVocabulary,
  getProgressSummary,
  loadProgress,
  recordWordReview,
  wordKey,
} from "@/lib/repetition";

type Props = {
  vocabulary: VocabularyItem[];
};

const ratingButtons = [
  { rating: "again", label: "Again" },
  { rating: "hard", label: "Hard" },
  { rating: "good", label: "Good" },
  { rating: "easy", label: "Easy" },
] as const;

export function VocabularyReview({ vocabulary }: Props) {
  const [progress, setProgress] = useState(emptyProgress());
  const [dueWords, setDueWords] = useState<VocabularyItem[]>([]);
  const [currentWord, setCurrentWord] = useState<VocabularyItem | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const next = addCourseWords(vocabulary, loadProgress());
    const words = getDueVocabulary(vocabulary, next);
    setProgress(next);
    setDueWords(words);
    setCurrentWord(words[0] ?? null);
    setReady(true);
  }, [vocabulary]);

  const summary = useMemo(() => getProgressSummary(progress), [progress]);

  const handleRating = (rating: (typeof ratingButtons)[number]["rating"]) => {
    if (!currentWord) return;

    const next = recordWordReview(currentWord.word, currentWord.translation, rating, progress);
    setProgress(next);

    const updatedDue = getDueVocabulary(vocabulary, next);
    setDueWords(updatedDue);
    setCurrentWord(updatedDue[0] ?? null);
    setShowAnswer(false);
  };

  if (!ready) {
    return <p className="text-slate-600">Loading vocab review…</p>;
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-slate-900">Vocabulary review</h1>
        <p className="mt-3 text-slate-600">
          Repeat words at the right time to move them from “new” to “known”.
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-white p-4 shadow-soft">
          <div className="text-sm text-slate-500">Known</div>
          <div className="text-3xl font-black text-slate-900">{summary.knownWords}</div>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-soft">
          <div className="text-sm text-slate-500">Learning</div>
          <div className="text-3xl font-black text-slate-900">{summary.learningWords}</div>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-soft">
          <div className="text-sm text-slate-500">New</div>
          <div className="text-3xl font-black text-slate-900">{summary.newWords}</div>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-soft">
          <div className="text-sm text-slate-500">Lessons</div>
          <div className="text-3xl font-black text-slate-900">{summary.completedLessons}</div>
        </div>
      </div>

      {!currentWord ? (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-green-900">You are all caught up!</h2>
          <p className="mt-2 text-green-800">
            Nothing is due for review right now. Come back later or continue learning a new lesson.
          </p>
        </div>
      ) : (
        <>
          <section className="rounded-2xl bg-white p-8 text-center shadow-soft">
            <p className="text-sm font-medium uppercase tracking-[0.12em] text-slate-500">
              Word to recall
            </p>
            <h2 className="mt-4 text-5xl font-black text-slate-900">{currentWord.word}</h2>

            {showAnswer ? (
              <div className="mt-6 rounded-xl bg-blue-50 p-5">
                <div className="text-2xl font-bold text-blue-900">{currentWord.translation}</div>
                {currentWord.example && (
                  <div className="mt-3 text-slate-700">{currentWord.example}</div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowAnswer(true)}
                className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Show answer
              </button>
            )}
          </section>

          {showAnswer && (
            <section className="mt-6">
              <div className="grid gap-3 sm:grid-cols-4">
                {ratingButtons.map(({ rating, label }) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleRating(rating)}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-800 transition hover:border-blue-500 hover:bg-blue-50"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
}
