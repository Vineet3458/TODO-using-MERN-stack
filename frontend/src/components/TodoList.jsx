import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, view, onToggle, onDelete }) => {
  const viewTitles = {
    today: "Today's Tasks",
    week: "This Week's Tasks",
    all: "All Tasks"
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {viewTitles[view]}
      </h2>
      
      {todos.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No tasks yet. Add one to get started!
        </p>
      ) : (
        <div className="space-y-3">
          {todos.map(todo => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;