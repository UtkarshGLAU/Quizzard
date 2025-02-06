import React, { useEffect, useState } from 'react';
import api from '../config/api';
function Home() {
    const [quizzes, setQuizzes] = useState([]);
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await api.get('/api/quizzes');
                setQuizzes(response.data);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };
        fetchQuizzes();
    }, []);
    return (
        <div>
            <h1>Quiz List</h1>
            <ul>
                {quizzes.map((quiz, index) => (
                    <li key={index}>{quiz.title}</li>
                ))}
            </ul>
        </div>
    );
}
export default Home;