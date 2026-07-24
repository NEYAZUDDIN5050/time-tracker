import { useState, useEffect } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useStartSession } from '../hooks/useSessions';
import { getMeApi } from '../api/authApi';
import useAuthStore from '../store/authStore';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import FocusTimer from '../components/FocusTimer';
import AddTaskForm from '../components/AddTaskForm';

function Dashboard() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');

  const { data, isLoading, error } = useTasks(
    statusFilter ? { status: statusFilter } : {}
  );

  const startSession = useStartSession();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    getMeApi().then((res) => setUser(res.data)).catch(() => {});
  }, [setUser]);

  const handleStartSession = (taskId) => {
    startSession.mutate({ taskId, type: 'custom' });
  };

  const tasks = data?.data || [];

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <FocusTimer />

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {['', 'pending', 'in-progress', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`text-sm px-3 py-1.5 rounded-lg transition ${
                  statusFilter === status
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {status || 'All'}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition"
          >
            + Add Task
          </button>
        </div>

        {showAddForm && <AddTaskForm onClose={() => setShowAddForm(false)} />}

        {isLoading && <p className="text-slate-400 text-center">Loading tasks...</p>}
        {error && <p className="text-red-400 text-center">Failed to load tasks</p>}

        {!isLoading && tasks.length === 0 && (
          <p className="text-slate-500 text-center py-8">No tasks yet. Add one to get started!</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} onStartSession={handleStartSession} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;