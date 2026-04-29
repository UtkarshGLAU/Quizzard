const API_BASE_URL = import.meta.env.VITE_API_URL+"/quizzes";

export const fetchQuizzes = async () => {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error("Failed to fetch quizzes");
        return await response.json();
    } catch (error) {
        console.error("Error fetching quizzes:", error);
        return [];
    }
};

export const fetchQuizById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) throw new Error("Failed to fetch quiz");
        return await response.json();
    } catch (error) {
        console.error("Error fetching quiz:", error);
        return null;
    }
};


export const createQuiz = async (quizData) => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(quizData),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Failed to create quiz",
                dailyLimit: data.dailyLimit,
                quizzesCreatedToday: data.quizzesCreatedToday,
            };
        }

        return {
            success: true,
            ...data,
        };
    } catch (error) {
        console.error("Error creating quiz:", error);
        return {
            success: false,
            message: error.message || "Error creating quiz",
        };
    }
};