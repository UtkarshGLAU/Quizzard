// frontend/src/config/api.js
import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

export default api;


// Example usage in a component
// import api from '../config/api';

// export const fetchQuizzes = async () => {
//   try {
//     const response = await api.get('/api/quizzes');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching quizzes:', error);
//     throw error;
//   }
// };