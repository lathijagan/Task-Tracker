import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import './App.css';

function App() {
  const [taskText, setTaskText] = useState('');
  const [taskCategory, setTaskCategory] = useState('Work');
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (taskText) {
      setTasks([...tasks, {
        text: taskText,
        category: taskCategory,
        priority: taskPriority,
        dueDate: taskDueDate,
        completed: false
      }]);
      setTaskText('');
      setTaskCategory('Work');
      setTaskPriority('Medium');
      setTaskDueDate('');
    }
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEditTask = (index, newValue, field) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, [field]: newValue } : task
    );
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleSortByDueDate = () => {
    const sortedTasks = [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    setTasks(sortedTasks);
  };

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter a task"
      />
      <select
        value={taskCategory}
        onChange={(e) => setTaskCategory(e.target.value)}
      >
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Other">Other</option>
      </select>
      <select
        value={taskPriority}
        onChange={(e) => setTaskPriority(e.target.value)}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input
        type="date"
        value={taskDueDate}
        onChange={(e) => setTaskDueDate(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
      <TaskList
        tasks={filteredTasks}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
        onToggleComplete={handleToggleComplete}
        onSort={handleSortByDueDate}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
}

export default App;
