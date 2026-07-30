import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { loginApi } from '../api/authApi';
import useAuthStore from '../store/authStore';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginApi(formData);
      const { user, token } = response.data;

      login(user, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-slate-100 flex font-[Inter,sans-serif]">
      {/* ambient grid */}
      <div
        className="fixed inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #6366F1 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* LEFT — branding / route visual */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 border-r border-slate-800/60">
        <Link to="/" className="flex items-center gap-2 relative z-10">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
          <span className="text-lg font-bold tracking-tight font-[\'Space_Grotesk\',sans-serif]">
            Day<span className="text-indigo-400">Map</span>
          </span>
        </Link>

        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-[\'JetBrains_Mono\',monospace] text-xs tracking-widest text-amber-400 mb-4"
          >
            WELCOME BACK
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-[\'Space_Grotesk\',sans-serif] text-4xl font-bold leading-tight mb-4 max-w-md"
          >
            Your route was right where you left it.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 max-w-sm leading-relaxed"
          >
            Pick up your focus sessions, review yesterday's map, and keep the streak alive.
          </motion.p>
        </div>

        {/* mini animated route */}
        <svg viewBox="0 0 400 120" className="w-full h-auto relative z-10">
          <motion.path
            d="M20,90 C90,20 130,20 170,50 C220,90 250,100 300,60 C330,35 350,35 380,50"
            fill="none"
            stroke="#6366F1"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.5 }}
          />
          {[
            { cx: 20, cy: 90 },
            { cx: 170, cy: 50 },
            { cx: 300, cy: 60 },
            { cx: 380, cy: 50 },
          ].map((wp, i) => (
            <motion.circle
              key={i}
              cx={wp.cx}
              cy={wp.cy}
              r="4"
              fill="#0A0F1E"
              stroke="#F5A623"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 + i * 0.2, type: 'spring', stiffness: 300 }}
            />
          ))}
        </svg>
      </div>

      {/* RIGHT — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm"
        >
          {/* mobile-only logo */}
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-10 justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
            <span className="text-lg font-bold font-[\'Space_Grotesk\',sans-serif]">
              Day<span className="text-indigo-400">Map</span>
            </span>
          </Link>

          <h1 className="font-[\'Space_Grotesk\',sans-serif] text-2xl font-bold mb-1">
            Log in to your account
          </h1>
          <p className="text-slate-500 text-sm mb-8">
            Continue mapping where you left off.
          </p>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="bg-red-500/10 border border-red-500/40 text-red-400 text-sm rounded-lg px-4 py-3 overflow-hidden"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-slate-400 text-xs font-medium tracking-wide mb-2 block">
                EMAIL
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full bg-[#10182B] border border-slate-800 text-white rounded-lg px-4 py-3 text-sm outline-none transition-colors focus:border-indigo-500 placeholder:text-slate-600"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-slate-400 text-xs font-medium tracking-wide">
                  PASSWORD
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-slate-500 hover:text-indigo-400 transition-colors"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full bg-[#10182B] border border-slate-800 text-white rounded-lg px-4 py-3 text-sm outline-none transition-colors focus:border-indigo-500 placeholder:text-slate-600"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg py-3 text-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Logging in...
                </>
              ) : (
                'Log in'
              )}
            </motion.button>
          </form>

          <p className="text-slate-500 text-sm text-center mt-8">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;