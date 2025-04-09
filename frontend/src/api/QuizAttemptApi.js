export const saveQuizAttempt = async ({ quizId, score, totalQuestions }) => {
  await fetch(`${import.meta.env.VITE_API_URL}/quiz-attempt/attempt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ quizId, score, totalQuestions }),
  });
};

// api/QuizAttemptApi.js
export const getMyQuizAttempts = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/quiz-attempt/my-attempts`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch quiz attempts");
  }

  return res.json(); // should be an array
};
