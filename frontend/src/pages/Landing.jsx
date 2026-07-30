import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const waypoints = [
  { time: '06:00', label: 'Plan the day', cx: 40, cy: 170 },
  { time: '10:00', label: 'Deep focus', cx: 200, cy: 70 },
  { time: '14:00', label: 'Ship the update', cx: 380, cy: 190 },
  { time: '19:00', label: 'Wind down', cx: 550, cy: 90 },
];

const routePath =
  'M40,170 C120,60 160,60 200,70 C280,85 300,220 380,190 C460,160 480,40 550,90';

const features = [
  {
    title: 'Time-boxed tasks',
    desc: 'Set a limit before you start. DayMap holds you to it, not the other way around.',
    icon: '◱',
  },
  {
    title: 'Live focus sessions',
    desc: 'A running stopwatch tied to the task — pause the guesswork, not the clock.',
    icon: '◉',
  },
  {
    title: 'Telegram alerts',
    desc: 'The moment a limit is crossed, it lands in your chat. No app-checking required.',
    icon: '◈',
  },
  {
    title: 'Daily digest',
    desc: 'Every night at 9, a summary of where the day actually went.',
    icon: '◐',
  },
  {
    title: 'Category breakdown',
    desc: 'See focus time split across work, learning, and everything between.',
    icon: '◧',
  },
  {
    title: 'Notes, linked or free',
    desc: 'Capture a thought against a task, or let it stand on its own.',
    icon: '◫',
  },
];

const stack = [
  'React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS',
  'Framer Motion', 'JWT', 'Telegram API', 'node-cron',
];

function Landing() {
  return (
    <div className="bg-[#0A0F1E] text-slate-100 min-h-screen overflow-x-hidden font-[Inter,sans-serif]">
      {/* ambient background grid */}
      <div
        className="fixed inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, #6366F1 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* NAV */}
      <nav className="relative z-10 max-w-6xl mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
          <span className="text-lg font-bold tracking-tight font-[\'Space_Grotesk\',sans-serif]">
            Day<span className="text-indigo-400">Map</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-sm text-slate-400 hover:text-white transition-colors">
            Login
          </Link>
          <Link
            to="/signup"
            className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
            className="font-[\'JetBrains_Mono\',monospace] text-xs tracking-widest text-amber-400 mb-4"
          >
            26.7674° N · PERSONAL PRODUCTIVITY OS
          </motion.p>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            className="font-[\'Space_Grotesk\',sans-serif] text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6"
          >
            Every day has a
            <br />
            route.{' '}
            <span className="text-indigo-400">Stop wandering it.</span>
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            className="text-slate-400 text-lg leading-relaxed mb-8 max-w-md"
          >
            DayMap turns your tasks into a timed route — with live focus
            sessions, instant Telegram alerts, and a map of exactly where
            your hours went.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            className="flex items-center gap-4"
          >
            <Link
              to="/signup"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Start mapping your day
            </Link>
            <Link
              to="/login"
              className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
            >
              I already have an account →
            </Link>
          </motion.div>
        </motion.div>

        {/* Signature: self-drawing route with traveling dot */}
        <div className="relative">
          <svg viewBox="0 0 600 260" className="w-full h-auto">
            <motion.path
              d={routePath}
              fill="none"
              stroke="#6366F1"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.3 }}
            />

            {waypoints.map((wp, i) => (
              <g key={wp.time}>
                <motion.circle
                  cx={wp.cx}
                  cy={wp.cy}
                  r="5"
                  fill="#0A0F1E"
                  stroke="#F5A623"
                  strokeWidth="2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.35, type: 'spring', stiffness: 300 }}
                />
                <motion.text
                  x={wp.cx}
                  y={wp.cy - 16}
                  textAnchor="middle"
                  className="fill-slate-500"
                  style={{ font: '10px JetBrains Mono, monospace' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.35 }}
                >
                  {wp.time}
                </motion.text>
                <motion.text
                  x={wp.cx}
                  y={wp.cy + 24}
                  textAnchor="middle"
                  className="fill-slate-300"
                  style={{ font: '11px Inter, sans-serif' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65 + i * 0.35 }}
                >
                  {wp.label}
                </motion.text>
              </g>
            ))}

            {/* traveling live dot */}
            <motion.circle
              r="4"
              fill="#F5A623"
              initial={{ offsetDistance: '0%' }}
              animate={{ offsetDistance: '100%' }}
              transition={{ duration: 4, ease: 'linear', repeat: Infinity, delay: 2 }}
              style={{ offsetPath: `path("${routePath}")` }}
            />
          </svg>
        </div>
      </section>

      {/* HOW IT FLOWS */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20 border-t border-slate-800/60">
        <p className="font-[\'JetBrains_Mono\',monospace] text-xs tracking-widest text-amber-400 mb-3">
          THE FLOW
        </p>
        <h2 className="font-[\'Space_Grotesk\',sans-serif] text-3xl font-bold mb-12">
          From intention to insight
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Set a limit', desc: 'Give any task a title and a time box.' },
            { step: '02', title: 'Start focus', desc: 'A live timer runs against the task.' },
            { step: '03', title: 'Get alerted', desc: 'Cross the limit, get pinged on Telegram.' },
            { step: '04', title: 'Review the map', desc: 'See the whole day, charted and broken down.' },
          ].map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <span className="font-[\'JetBrains_Mono\',monospace] text-indigo-400 text-sm">
                {s.step}
              </span>
              <h3 className="font-semibold text-white mt-2 mb-1">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 border-t border-slate-800/60">
        <p className="font-[\'JetBrains_Mono\',monospace] text-xs tracking-widest text-amber-400 mb-3">
          EVERYTHING INCLUDED
        </p>
        <h2 className="font-[\'Space_Grotesk\',sans-serif] text-3xl font-bold mb-12 max-w-lg">
          Built for people who forget to look at the clock
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.45 }}
              whileHover={{ y: -4, borderColor: '#6366F1' }}
              className="bg-[#10182B] border border-slate-800 rounded-xl p-6 transition-colors"
            >
              <span className="text-2xl text-amber-400">{f.icon}</span>
              <h3 className="text-white font-semibold mt-4 mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TELEGRAM SPOTLIGHT */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20 border-t border-slate-800/60 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="font-[\'JetBrains_Mono\',monospace] text-xs tracking-widest text-amber-400 mb-3">
            REAL-TIME
          </p>
          <h2 className="font-[\'Space_Grotesk\',sans-serif] text-3xl font-bold mb-4">
            It taps you on the shoulder
          </h2>
          <p className="text-slate-400 leading-relaxed mb-6 max-w-md">
            No dashboard-checking. When a task runs over its limit, DayMap
            sends it straight to your phone — the same second it happens.
          </p>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-center gap-2">
              <span className="text-indigo-400">→</span> Instant limit-breach alerts
            </li>
            <li className="flex items-center gap-2">
              <span className="text-indigo-400">→</span> Nightly summary at 9 PM
            </li>
            <li className="flex items-center gap-2">
              <span className="text-indigo-400">→</span> One command to connect your account
            </li>
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#10182B] border border-slate-800 rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-800">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold">
              D
            </div>
            <span className="text-sm font-medium text-slate-300">DayMap Bot</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-[#0A0F1E] rounded-lg p-4 text-sm text-slate-300 font-[\'JetBrains_Mono\',monospace] leading-relaxed"
          >
            ⏰ Time limit crossed!
            <br />
            Task: <span className="text-white">Client proposal</span>
            <br />
            Limit: 45 min
            <br />
            Elapsed: 47 min
          </motion.div>
        </motion.div>
      </section>

      {/* TECH STACK STRIP */}
      <section className="relative z-10 border-t border-slate-800/60 py-10">
        <p className="text-center font-[\'JetBrains_Mono\',monospace] text-xs tracking-widest text-slate-600 mb-6">
          BUILT WITH
        </p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 max-w-3xl mx-auto px-6">
          {stack.map((t) => (
            <span key={t} className="text-slate-500 text-sm">
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 py-24 text-center border-t border-slate-800/60">
        <h2 className="font-[\'Space_Grotesk\',sans-serif] text-4xl font-bold mb-4">
          Chart today. It only takes a minute.
        </h2>
        <p className="text-slate-400 mb-8">
          Free to use. No credit card. Just you and the clock.
        </p>
        <Link
          to="/signup"
          className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors"
        >
          Create your first task
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-slate-800/60 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-slate-600 text-sm font-[\'Space_Grotesk\',sans-serif] font-bold">
            Day<span className="text-indigo-400">Map</span>
          </span>
          <span className="text-slate-600 text-xs">
            Built by MD Neyaz Uddin — MERN Full Stack Developer
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Landing;