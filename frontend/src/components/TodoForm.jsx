import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const TodoForm = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('personal');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    onAdd({ text, category, date: new Date() });
    setText('');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="fitness">Fitness</option>
          <option value="learning">Learning</option>
        </select>
        <button
          type="submit"
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 justify-center"
        >
          <Plus size={20} />
          Add
        </button>
      </form>
    </div>
  );
};

export default TodoForm;