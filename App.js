import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].text = editText;
      setTasks(updatedTasks);
      setEditIndex(null);
      setEditText('');
    }
  };

  return (
    <div className="app-container">
      <div className="todo-wrapper">
        <h1 className="title">Todo List</h1>
        <div className="task-input-container">
          <input
            type="text"
            className="task-input"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            className="add-task-button"
            onClick={addTask}
          >
            Add
          </button>
        </div>

        <ul className="task-list">
          {tasks.map((task, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className={`task-item ${task.completed ? 'completed' : ''}`}
            >
              {editIndex === index ? (
                <div className="edit-task-container">
                  <input
                    type="text"
                    className="edit-task-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                </div>
              ) : (
                <span
                  className="task-text"
                  onClick={() => toggleComplete(index)}
                >
                  {task.text}
                </span>
              )}

              {editIndex === index ? (
                <button
                  className="save-edit-button"
                  onClick={saveEdit}
                >
                  Save
                </button>
              ) : (
                <button
                  className="edit-task-button"
                  onClick={() => startEdit(index)}
                >
                  Edit
                </button>
              )}

              <button
                className="delete-task-button"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
