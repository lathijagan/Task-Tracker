import React, { useState, useEffect } from 'react'; // Importing necessary React modules
import TaskList from './TaskList'; // Importing TaskList component
import './App.css'; // Importing the CSS file for styling

function App() {
  // State hooks to manage the input fields and task list
  const [taskText, setTaskText] = useState(''); // State for the task's text
  const [taskCategory, setTaskCategory] = useState('Work'); // State for the task's category
  const [taskPriority, setTaskPriority] = useState('Medium'); // State for the task's priority
  const [taskDueDate, setTaskDueDate] = useState(''); // State for the task's due date
  const [tasks, setTasks] = useState([]); // State for storing the list of tasks
  const [searchQuery, setSearchQuery] = useState(''); // State for storing the search query

  // useEffect hook to load tasks from local storage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || []; // Retrieve tasks from local storage
    setTasks(storedTasks); // Update the state with retrieved tasks
  }, []); // Empty dependency array means this runs once on mount

  // useEffect hook to save tasks to local storage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks to local storage
  }, [tasks]); // Dependency array includes 'tasks', so it runs every time 'tasks' changes

  // Function to add a new task to the list
  const handleAddTask = () => {
    if (taskText) { // Only add if the task text is not empty
      setTasks([...tasks, {
        text: taskText, // Task description
        category: taskCategory, // Task category
        priority: taskPriority, // Task priority
        dueDate: taskDueDate, // Task due date
        completed: false // Task completion status
      }]);
      // Resetting the input fields after adding a task
      setTaskText('');
      setTaskCategory('Work');
      setTaskPriority('Medium');
      setTaskDueDate('');
    }
  };

  // Function to delete a task by its index
  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index)); // Remove the task at the specified index
  };

  // Function to edit a specific task's field (text, category, etc.)
  const handleEditTask = (index, newValue, field) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, [field]: newValue } : task // Update the specified field of the task
    );
    setTasks(updatedTasks); // Update the tasks state with the edited task
  };

  // Function to toggle the completion status of a task
  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task // Toggle the completed status
    );
    setTasks(updatedTasks); // Update the tasks state
  };

  // Function to sort tasks by their due date
  const handleSortByDueDate = () => {
    const sortedTasks = [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)); // Sort tasks by due date
    setTasks(sortedTasks); // Update the tasks state with the sorted list
  };

  // Filter tasks based on the search query
  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase()) // Filter tasks by matching text with search query
  );

  // JSX structure for the component's UI
  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)} // Update the task text state
        placeholder="Enter a task"
      />
      <select
        value={taskCategory}
        onChange={(e) => setTaskCategory(e.target.value)} // Update the task category state
      >
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Other">Other</option>
      </select>
      <select
        value={taskPriority}
        onChange={(e) => setTaskPriority(e.target.value)} // Update the task priority state
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input
        type="date"
        value={taskDueDate}
        onChange={(e) => setTaskDueDate(e.target.value)} // Update the task due date state
      />
      <button onClick={handleAddTask}>Add Task</button> {/* Button to add a new task */}
      <TaskList
        tasks={filteredTasks} // Pass the filtered tasks to the TaskList component
        onDelete={handleDeleteTask} // Pass the delete task function
        onEdit={handleEditTask} // Pass the edit task function
        onToggleComplete={handleToggleComplete} // Pass the toggle complete function
        onSort={handleSortByDueDate} // Pass the sort by due date function
        searchQuery={searchQuery} // Pass the search query
        setSearchQuery={setSearchQuery} // Pass the function to update the search query
      />
    </div>
  );
}

export default App; // Export the App component as the default export
