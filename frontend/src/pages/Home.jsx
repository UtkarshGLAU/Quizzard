import React, { useEffect, useState } from 'react';
function Home() {
    const [quizzes, setQuizzes] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/api/quizzes')
            .then(res => res.json())
            .then(data => setQuizzes(data));
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