import { useUpdateTask, useDeleteTask } from '../hooks/useTasks';

const priorityColors = {
  low: 'bg-slate-600',
  medium: 'bg-amber-600',
  high: 'bg-red-600',
};

const statusColors = {
  pending: 'text-slate-400',
  'in-progress': 'text-indigo-400',
  completed: 'text-green-400',
  overdue: 'text-red-400',
};

function TaskCard({ task, onStartSession }) {
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const handleComplete = () => {
    updateTask.mutate({ id: task._id, updates: { status: 'completed' } });
  };

  const handleDelete = () => {
    if (window.confirm('Delete this task?')) {
      deleteTask.mutate(task._id);
    }
  };

  const progressPercent = Math.min(
    (task.timeSpentMinutes / task.timeLimitMinutes) * 100,
    100
  );

  return (
    <div className="bg-slate-800 rounded-xl p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-white font-semibold">{task.title}</h3>
          <p className="text-slate-400 text-sm">{task.category}</p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full text-white ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      <div>
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>{task.timeSpentMinutes} / {task.timeLimitMinutes} min</span>
          <span className={statusColors[task.status]}>{task.status}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div
            className="bg-indigo-500 h-2 rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="flex gap-2">
        {task.status !== 'completed' && (
          <button
            onClick={() => onStartSession(task._id)}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2 rounded-lg transition"
          >
            Start Focus
          </button>
        )}
        {task.status !== 'completed' && (
          <button
            onClick={handleComplete}
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-2 rounded-lg transition"
          >
            ✓
          </button>
        )}
        <button
          onClick={handleDelete}
          className="bg-slate-700 hover:bg-red-600 text-white text-sm px-3 py-2 rounded-lg transition"
        >
          🗑
        </button>
      </div>
    </div>
  );
}

export default TaskCard;