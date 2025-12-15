import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  const categoryColors = {
    work: 'bg-blue-100 text-blue-700',
    personal: 'bg-purple-100 text-purple-700',
    fitness: 'bg-green-100 text-green-700',
    learning: 'bg-orange-100 text-orange-700'
  };

  return (
    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <button
        onClick={() => onToggle(todo._id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          todo.completed
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 hover:border-purple-500'
        }`}
      >
        {todo.completed && <Check size={16} className="text-white" />}
      </button>
      
      <div className="flex-1">
        <p className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {todo.text}
        </p>
        <div className="flex gap-2 mt-1">
          <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[todo.category]}`}>
            {todo.category}
          </span>
          <span className="text-xs text-gray-500">
            {formatDate(todo.date)}
          </span>
        </div>
      </div>
      
      <button
        onClick={() => onDelete(todo._id)}
        className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default TodoItem;