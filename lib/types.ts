export type ExerciseType = "multiple-choice" | "fill-gap" | "translate";

export type VocabularyItem = {
  word: string;
  translation: string;
  example: string;
};

export type QuizQuestion = {
  id: string;
  type: ExerciseType;
  prompt: string;
  options?: string[];
  answer: string;
  explanation?: string;
};

export type Lesson = {
  id: string;
  level: "A1";
  title: string;
  topic: string;
  objective: string;
  duration: string;
  vocabulary: VocabularyItem[];
  grammar: string[];
  quiz: QuizQuestion[];
};

export type Level = {
  slug: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export type ReviewRating = "again" | "hard" | "good" | "easy";

export type LessonProgress = {
  score: number;
  total: number;
  completed: boolean;
};

export type WordProgress = {
  word: string;
  translation: string;
  stage: "new" | "learning" | "known";
  correctCount: number;
  incorrectCount: number;
  nextReviewAt: number;
  ease: number;
  intervalDays: number;
};

export type ProgressState = {
  lessonProgress: Record<string, LessonProgress>;
  wordProgress: Record<string, WordProgress>;
};
