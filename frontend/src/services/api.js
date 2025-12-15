import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoAPI = {
  // Get all todos
  getTodos: (view = 'all') => api.get(`/todos?view=${view}`),

  // Create todo
  createTodo: (todoData) => api.post('/todos', todoData),

  // Update todo
  updateTodo: (id, todoData) => api.put(`/todos/${id}`, todoData),

  // Delete todo
  deleteTodo: (id) => api.delete(`/todos/${id}`),

  // Get stats
  getStats: () => api.get('/todos/stats'),
};

export default api;