const API_BASE_URL = import.meta.env.VITE_API_URL + "/ai-quizzes";

export const generateQuizPreview = async (topic, questionCount, difficulty) => {
  try {
    const response = await fetch(`${API_BASE_URL}/preview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ topic, questionCount, difficulty }),
    });

    if (!response.ok) throw new Error("Failed to generate preview");

    const data = await response.json();
    return data.preview;
  } catch (error) {
    console.error("Error generating preview:", error);
    throw error;
  }
};

export const createAIQuiz = async (topic, questionCount, difficulty, title, description, image) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        topic,
        questionCount,
        difficulty,
        title,
        description,
        image,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || "Failed to create quiz");
      error.response = data;
      throw error;
    }

    return data.quiz;
  } catch (error) {
    console.error("Error creating AI quiz:", error);
    throw error;
  }
};
