import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useDailyAnalytics, useWeeklyAnalytics, useCategoryBreakdown } from '../hooks/useAnalytics';
import Navbar from '../components/Navbar';

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899'];

function Analytics() {
  const { data: dailyData, isLoading: dailyLoading } = useDailyAnalytics();
  const { data: weeklyData, isLoading: weeklyLoading } = useWeeklyAnalytics();
  const { data: categoryData, isLoading: categoryLoading } = useCategoryBreakdown();

  const daily = dailyData?.data;
  const weekly = weeklyData?.data;
  const categories = categoryData?.data || [];

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-bold text-white">Analytics</h2>

        {!dailyLoading && daily && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-800 rounded-xl p-4 text-center">
              <p className="text-slate-400 text-sm">Today's Focus Time</p>
              <p className="text-2xl font-bold text-white mt-1">
                {Math.floor(daily.totalFocusMinutes / 60)}h {daily.totalFocusMinutes % 60}m
              </p>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 text-center">
              <p className="text-slate-400 text-sm">Tasks Completed Today</p>
              <p className="text-2xl font-bold text-white mt-1">{daily.tasksCompleted}</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 text-center">
              <p className="text-slate-400 text-sm">Overdue Tasks</p>
              <p className="text-2xl font-bold text-red-400 mt-1">{daily.tasksOverdue}</p>
            </div>
          </div>
        )}

        <div className="bg-slate-800 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-4">Last 7 Days</h3>

          {weeklyLoading && <p className="text-slate-400 text-center">Loading...</p>}

          {!weeklyLoading && weekly && (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weekly.dailyBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="date"
                  stroke="#94a3b8"
                  tickFormatter={(date) => date.slice(5)}
                  fontSize={12}
                />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="focusMinutes" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-slate-800 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-4">Time by Category</h3>

          {categoryLoading && <p className="text-slate-400 text-center">Loading...</p>}

          {!categoryLoading && categories.length === 0 && (
            <p className="text-slate-500 text-center py-8">No category data yet.</p>
          )}

          {!categoryLoading && categories.length > 0 && (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categories}
                  dataKey="focusMinutes"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={(entry) => entry.category}
                >
                  {categories.map((entry, index) => (
                    <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analytics;