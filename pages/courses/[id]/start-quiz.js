import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router.js";

export default function Quiz() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: course, isLoading, error } = useSWR(`/api/courses/${id}`);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleNextCard = () => {
    if (currentCardIndex < course.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    }
  };

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowAnswer(false);
    }
  };

  if (!isReady || isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error! 🔥</h2>;

  const currentCard = course.cards[currentCardIndex];

  return (
    <>
      <h2>{course.name}</h2>
      <p>{course.description}</p>
      <h3>Current Card:</h3>
      <p>{currentCard.question}</p>
      {!showAnswer && (
        <button onClick={() => setShowAnswer(true)}>Show Answer</button>
      )}
      {showAnswer && (
        <>
          <p>{currentCard.answer}</p>
          <button
            onClick={handlePreviousCard}
            disabled={currentCardIndex === 0}
          >
            Zurück
          </button>
          <button
            onClick={handleNextCard}
            disabled={currentCardIndex === course.cards.length - 1}
          >
            Vor
          </button>
        </>
      )}
    </>
  );
}
