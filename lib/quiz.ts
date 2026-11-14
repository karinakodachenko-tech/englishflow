import type { Lesson } from "@/lib/types";

export function normalizeAnswer(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function gradeLessonQuiz(lesson: Lesson, answers: Record<string, string>) {
  const results = lesson.quiz.map((question) => {
    const userAnswer = normalizeAnswer(answers[question.id] ?? "");
    const correctAnswer = normalizeAnswer(question.answer);
    const isCorrect = userAnswer === correctAnswer;

    return {
      questionId: question.id,
      isCorrect,
      correctAnswer: question.answer,
      explanation: question.explanation ?? "",
    };
  });

  const score = results.filter((item) => item.isCorrect).length;
  const total = results.length;

  return {
    score,
    total,
    percent: total === 0 ? 0 : Math.round((score / total) * 100),
    results,
  };
}
