import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Check } from 'lucide-react';
import { todoAPI } from './services/api';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import StatsCard from './components/StatsCard';
import ProgressChart from './components/ProgressChart';

function App() {
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState({ completed: 0, total: 0, streak: 0, progress: [] });
  const [view, setView] = useState('today');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
    fetchStats();
  }, [view]);

  const fetchTodos = async () => {
    try {
      setError(null);
      const response = await todoAPI.getTodos(view);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Failed to fetch todos. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await todoAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleAddTodo = async (todoData) => {
    try {
      await todoAPI.createTodo(todoData);
      fetchTodos();
      fetchStats();
    } catch (error) {
      console.error('Error adding todo:', error);
      alert('Failed to add todo');
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      const todo = todos.find(t => t._id === id);
      await todoAPI.updateTodo(id, { completed: !todo.completed });
      fetchTodos();
      fetchStats();
    } catch (error) {
      console.error('Error toggling todo:', error);
      alert('Failed to update todo');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoAPI.deleteTodo(id);
      fetchTodos();
      fetchStats();
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert('Failed to delete todo');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-purple-600 text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Connection Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <p className="text-sm text-gray-600">
            Make sure your backend is running on <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:5000</code>
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Daily Todo Tracker</h1>
          <p className="text-gray-600">Stay organized and track your progress every day</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatsCard
            title="Today's Progress"
            value={`${stats.total > 0 ? Math.round(stats.percentage) : 0}%`}
            icon={TrendingUp}
            color="purple"
          />
          <StatsCard
            title="Completed Today"
            value={`${stats.completed}/${stats.total}`}
            icon={Check}
            color="green"
          />
          <StatsCard
            title="Current Streak"
            value={`${stats.streak} days`}
            icon={Calendar}
            color="orange"
          />
        </div>

        {/* Progress Chart */}
        <div className="mb-6">
          <ProgressChart progress={stats.progress} />
        </div>

        {/* Add Todo Form */}
        <div className="mb-6">
          <TodoForm onAdd={handleAddTodo} />
        </div>

        {/* View Tabs */}
        <div className="flex gap-2 mb-4">
          {['today', 'week', 'all'].map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                view === v
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {v === 'today' ? 'Today' : v === 'week' ? 'This Week' : 'All Tasks'}
            </button>
          ))}
        </div>

        {/* Todo List */}
        <TodoList
          todos={todos}
          view={view}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />
      </div>
    </div>
  );
}

export default App;