import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-slate-800 px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-white">
        Day<span className="text-indigo-400">Map</span>
      </h1>
      <Link to="/analytics" className="text-slate-700 hover:bg-blue-800 text-white text-sm px-4 py-2 rounded-lg transition">Analytics</Link>
     <Link to="/notes" className="text-slate-700 hover:bg-blue-800 text-white text-sm px-4 py-2 rounded-lg transition">Notes</Link>
     <Link to="/settings" className="text-slate-300 hover:text-white text-sm">Settings</Link>
      <div className="flex items-center gap-4">
        <span className="text-slate-300 text-sm">
          Hi, {user?.name}
        </span>
        <button
          onClick={handleLogout}
          className="bg-slate-700 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;