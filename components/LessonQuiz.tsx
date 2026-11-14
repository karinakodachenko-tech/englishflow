"use client";

import { useEffect, useState } from "react";
import { gradeLessonQuiz } from "@/lib/quiz";
import { loadProgress, updateLessonProgress } from "@/lib/repetition";
import type { Lesson } from "@/lib/types";

type Props = {
  lesson: Lesson;
};

export function LessonQuiz({ lesson }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    total: number;
    percent: number;
    results: Array<{
      questionId: string;
      isCorrect: boolean;
      correctAnswer: string;
      explanation: string;
    }>;
  } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(`quiz:${lesson.id}`);
    if (saved) {
      try {
        setResult(JSON.parse(saved));
        setSubmitted(true);
      } catch {
        // ignore invalid data
      }
    }
  }, [lesson.id]);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    const nextResult = gradeLessonQuiz(lesson, answers);
    setResult(nextResult);
    setSubmitted(true);
    localStorage.setItem(`quiz:${lesson.id}`, JSON.stringify(nextResult));

    const progress = loadProgress();
    const updated = updateLessonProgress(lesson.id, nextResult.score, nextResult.total, progress);
    localStorage.setItem("english-learning-progress", JSON.stringify(updated));
  };

  return (
    <section className="mt-10 rounded-2xl bg-white p-6 shadow-soft">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Quick quiz</h2>

        {submitted && result && (
          <div className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
            Result: {result.score}/{result.total} ({result.percent}%)
          </div>
        )}
      </div>

      <div className="space-y-5">
        {lesson.quiz.map((question, index) => {
          const userAnswer = answers[question.id] ?? "";
          const questionResult = submitted ? result?.results.find((r) => r.questionId === question.id) : null;

          return (
            <div key={question.id} className="rounded-xl border border-slate-200 p-4">
              <div className="mb-3 font-semibold text-slate-800">
                {index + 1}. {question.prompt}
              </div>

              {question.type === "multiple-choice" && question.options && (
                <div className="grid gap-2 md:grid-cols-2">
                  {question.options.map((option) => {
                    const isSelected = userAnswer === option;
                    const isCorrect = submitted && option === question.answer;
                    const isWrong = submitted && isSelected && !isCorrect;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleAnswerChange(question.id, option)}
                        className={[
                          "rounded-lg border px-3 py-2 text-left transition",
                          isSelected ? "border-blue-500 bg-blue-50" : "border-slate-300",
                          isCorrect ? "border-green-500 bg-green-50" : "",
                          isWrong ? "border-red-500 bg-red-50" : "",
                        ].join(" ")}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              )}

              {question.type === "fill-gap" && (
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="Type your answer"
                />
              )}

              {question.type === "translate" && (
                <textarea
                  value={userAnswer}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
                  rows={3}
                  placeholder="Write the English translation"
                />
              )}

              {submitted && questionResult && (
                <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm">
                  <div className={questionResult.isCorrect ? "text-green-700" : "text-red-700"}>
                    {questionResult.isCorrect ? "Correct" : "Incorrect"}
                  </div>

                  {!questionResult.isCorrect && (
                    <div className="mt-1 text-slate-600">
                      Correct answer: {questionResult.correctAnswer}
                    </div>
                  )}

                  {questionResult.explanation && (
                    <div className="mt-1 text-slate-600">{questionResult.explanation}</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white shadow-soft transition hover:bg-brand-700"
        >
          Check answers
        </button>

        {submitted && result && (
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setAnswers({});
              setResult(null);
              localStorage.removeItem(`quiz:${lesson.id}`);
            }}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700"
          >
            Try again
          </button>
        )}
      </div>
    </section>
  );
}
