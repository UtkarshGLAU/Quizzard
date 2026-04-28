import fetch from 'node-fetch';

const testAPI = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/ai-quizzes/preview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: 'JavaScript',
        questionCount: 5,
        difficulty: 'intermediate'
      })
    });

    const data = await response.text();
    console.log('Status:', response.status);
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

testAPI();
