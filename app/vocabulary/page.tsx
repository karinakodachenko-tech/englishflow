import { VocabularyReview } from "@/components/VocabularyReview";
import { a1Level } from "@/lib/data/a1";

export default function VocabularyPage() {
  const vocabulary = a1Level.lessons.flatMap((lesson) => lesson.vocabulary);

  return <VocabularyReview vocabulary={vocabulary} />;
}
