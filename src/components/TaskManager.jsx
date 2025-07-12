import { useState, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { ThemeContext } from '../context/ThemeContext';

function TaskManager() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');
  const { theme } = useContext(ThemeContext);

  const addTask = () => {
    if (text.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
    setText('');
  };

  const toggleComplete = (id) =>
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  const filteredTasks = tasks.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <div className={`p-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : ''}`}>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-grow"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add task..."
        />
        <button className="bg-blue-500 text-white px-4" onClick={addTask}>
          Add
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        {['all', 'active', 'completed'].map((f) => (
          <button
            key={f}
            className={`px-4 py-1 border ${filter === f ? 'bg-blue-200' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="space-y-2">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`p-2 border rounded flex justify-between ${
              task.completed ? 'line-through text-gray-500' : ''
            }`}
          >
            <span onClick={() => toggleComplete(task.id)}>{task.text}</span>
            <button onClick={() => deleteTask(task.id)} className="text-red-500">
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
