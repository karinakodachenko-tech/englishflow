import type { ProgressState, ReviewRating, VocabularyItem } from "@/lib/types";

const STORAGE_KEY = "english-learning-progress";

export function emptyProgress(): ProgressState {
  return {
    lessonProgress: {},
    wordProgress: {},
  };
}

export function wordKey(word: string): string {
  return word.trim().toLowerCase();
}

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return emptyProgress();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : emptyProgress();
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(progress: ProgressState) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }
}

export function addCourseWords(vocabulary: VocabularyItem[], progress: ProgressState) {
  const next = { ...progress, wordProgress: { ...progress.wordProgress } };

  for (const item of vocabulary) {
    const key = wordKey(item.word);

    if (!next.wordProgress[key]) {
      next.wordProgress[key] = {
        word: item.word,
        translation: item.translation,
        stage: "new",
        correctCount: 0,
        incorrectCount: 0,
        nextReviewAt: Date.now(),
        ease: 2.5,
        intervalDays: 0,
      };
    }
  }

  saveProgress(next);
  return next;
}

export function getDueVocabulary(vocabulary: VocabularyItem[], progress: ProgressState, now = Date.now()) {
  return vocabulary.filter((item) => {
    const itemProgress = progress.wordProgress[wordKey(item.word)];
    return !itemProgress || itemProgress.nextReviewAt <= now;
  });
}

export function updateLessonProgress(
  lessonId: string,
  score: number,
  total: number,
  progress: ProgressState,
): ProgressState {
  const next = {
    ...progress,
    lessonProgress: {
      ...progress.lessonProgress,
      [lessonId]: {
        score,
        total,
        completed: score === total,
      },
    },
  };

  saveProgress(next);
  return next;
}
export function recordWordReview(  word: string,
  translation: string,
  rating: ReviewRating,
  progress: ProgressState,
  now = Date.now(),
): ProgressState {
  const key = wordKey(word);
  const current = progress.wordProgress[key] ?? {
    word,
    translation,
    stage: "new" as const,
    correctCount: 0,
    incorrectCount: 0,
    nextReviewAt: now,
    ease: 2.5,
    intervalDays: 0,
  };

  let nextIntervalDays = current.intervalDays;
  let nextReviewAt = now;
  let ease = current.ease;

  if (rating === "again") {
    nextIntervalDays = 0;
    ease = Math.max(1.3, ease - 0.2);
    nextReviewAt = now + 10 * 60 * 1000;
  } else if (rating === "hard") {
    nextIntervalDays = Math.max(1, current.intervalDays + 1);
    ease = Math.max(1.3, ease - 0.15);
    nextReviewAt = now + nextIntervalDays * 24 * 60 * 60 * 1000;
  } else if (rating === "good") {
    nextIntervalDays = current.intervalDays === 0 ? 1 : Math.max(2, Math.round(current.intervalDays * ease));
    nextReviewAt = now + nextIntervalDays * 24 * 60 * 60 * 1000;
  } else if (rating === "easy") {
    nextIntervalDays = Math.max(4, Math.round((current.intervalDays || 1) * (ease + 0.5)));
    ease = Math.min(3, ease + 0.15);
    nextReviewAt = now + nextIntervalDays * 24 * 60 * 60 * 1000;
  }

  const next: ProgressState = { {
    ...progress,
    wordProgress: {
      ...progress.wordProgress,
      [key]: {
        ...current,
        word,
        translation,
        correctCount: rating === "again" ? current.correctCount : current.correctCount + 1,
        incorrectCount: rating === "again" ? current.incorrectCount + 1 : current.incorrectCount,
        ease,
        intervalDays: nextIntervalDays,
        nextReviewAt,
        stage:
          rating === "again"
            ? "learning"
            : current.correctCount >= 2
              ? "known"
              : "learning",
      },
    },
  };

  saveProgress(next);
  return next;
}

export function getProgressSummary(progress: ProgressState) {
  const lessons = Object.values(progress.lessonProgress);
  const words = Object.values(progress.wordProgress);

  const completedLessons = lessons.filter((item) => item.completed).length;
  const knownWords = words.filter((item) => item.stage === "known").length;
  const learningWords = words.filter((item) => item.stage === "learning").length;
  const newWords = words.filter((item) => item.stage === "new").length;

  return {
    completedLessons,
    knownWords,
    learningWords,
    newWords,
  };
}
