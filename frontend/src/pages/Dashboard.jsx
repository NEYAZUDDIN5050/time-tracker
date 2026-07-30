import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTasks } from '../hooks/useTasks';
import { useStartSession } from '../hooks/useSessions';
import { getMeApi } from '../api/authApi';
import useAuthStore from '../store/authStore';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import FocusTimer from '../components/FocusTimer';
import AddTaskForm from '../components/AddTaskForm';

const filters = ['', 'pending', 'in-progress', 'completed'];

function Dashboard() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');

  const { data, isLoading, error } = useTasks(
    statusFilter ? { status: statusFilter } : {}
  );

  const startSession = useStartSession();
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    getMeApi().then((res) => setUser(res.data)).catch(() => {});
  }, [setUser]);

  const handleStartSession = (taskId) => {
    startSession.mutate({ taskId, type: 'custom' });
  };

  const tasks = data?.data || [];
  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const totalMinutes = tasks.reduce((sum, t) => sum + t.timeSpentMinutes, 0);

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-slate-100 font-[Inter,sans-serif]">
      <div
        className="fixed inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #6366F1 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <Navbar />

      <div className="max-w-4xl mx-auto p-6 space-y-6 relative z-10">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="font-[\'JetBrains_Mono\',monospace] text-xs tracking-widest text-amber-400 mb-1">
            TODAY'S ROUTE
          </p>
          <h1 className="font-[\'Space_Grotesk\',sans-serif] text-2xl font-bold">
            Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
          </h1>
        </motion.div>

        {/* stats strip */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Active tasks', value: tasks.length },
            { label: 'Completed', value: completedCount },
            { label: 'Minutes tracked', value: totalMinutes },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-[#10182B] border border-slate-800 rounded-xl p-4"
            >
              <p className="text-2xl font-bold text-white font-[\'JetBrains_Mono\',monospace]">
                {s.value}
              </p>
              <p className="text-slate-500 text-xs mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <FocusTimer />

        {/* filters + add */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex gap-1.5 bg-[#10182B] border border-slate-800 rounded-lg p-1">
            {filters.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className="relative text-sm px-3 py-1.5 rounded-md transition-colors"
              >
                <span
                  className={
                    statusFilter === status
                      ? 'relative z-10 text-white'
                      : 'relative z-10 text-slate-500 hover:text-slate-300'
                  }
                >
                  {status || 'All'}
                </span>
                {statusFilter === status && (
                  <motion.div
                    layoutId="dashboard-filter-pill"
                    className="absolute inset-0 bg-indigo-600 rounded-md"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            {showAddForm ? 'Cancel' : '+ Add task'}
          </motion.button>
        </div>

        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <AddTaskForm onClose={() => setShowAddForm(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading && (
          <p className="text-slate-500 text-center text-sm py-8">Loading tasks...</p>
        )}
        {error && (
          <p className="text-red-400 text-center text-sm py-8">Failed to load tasks</p>
        )}

        {!isLoading && tasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-slate-500 text-sm">
              No tasks yet — add one to start mapping your day.
            </p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {tasks.map((task) => (
              <motion.div
                key={task._id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <TaskCard task={task} onStartSession={handleStartSession} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;