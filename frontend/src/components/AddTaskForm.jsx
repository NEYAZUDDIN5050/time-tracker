import { useState } from 'react';
import { useCreateTask } from '../hooks/useTasks';

function AddTaskForm({ onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: 'medium',
    timeLimitMinutes: 30,
  });

  const createTask = useCreateTask();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createTask.mutate(
      { ...formData, timeLimitMinutes: Number(formData.timeLimitMinutes) },
      {
        onSuccess: () => onClose(),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 rounded-xl p-4 space-y-3">
      <input
        type="text"
        name="title"
        placeholder="Task title"
        value={formData.title}
        onChange={handleChange}
        required
        className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          name="category"
          placeholder="Category (optional)"
          value={formData.category}
          onChange={handleChange}
          className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <input
        type="number"
        name="timeLimitMinutes"
        placeholder="Time limit (minutes)"
        value={formData.timeLimitMinutes}
        onChange={handleChange}
        min="1"
        required
        className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={createTask.isPending}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
        >
          {createTask.isPending ? 'Adding...' : 'Add Task'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddTaskForm;