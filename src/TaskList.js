import React from 'react';

function TaskList({ tasks, onDelete, onEdit, onToggleComplete, onSort, searchQuery, setSearchQuery }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={onSort}>Sort by Due Date</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="text"
              value={task.text}
              onChange={(e) => onEdit(index, e.target.value, 'text')}
            />
            <span>({task.category})</span>
            <select
              value={task.priority}
              onChange={(e) => onEdit(index, e.target.value, 'priority')}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <input
              type="date"
              value={task.dueDate}
              onChange={(e) => onEdit(index, e.target.value, 'dueDate')}
            />
            <button onClick={() => onToggleComplete(index)}>
              {task.completed ? 'Incomplete' : 'Complete'}
            </button>
            <button onClick={() => onDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
