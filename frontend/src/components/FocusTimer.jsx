import { useState, useEffect } from 'react';
import { useRunningSession, useStopSession } from '../hooks/useSessions';

function FocusTimer() {
  const { data: sessionData } = useRunningSession();
  const stopSession = useStopSession();
  const [elapsed, setElapsed] = useState(0);

  const session = sessionData?.data;

  useEffect(() => {
    if (!session) return;

    const startTime = new Date(session.startTime).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      setElapsed(Math.floor((now - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [session]);

  if (!session) {
    return (
      <div className="bg-slate-800 rounded-xl p-6 text-center">
        <p className="text-slate-400">No active focus session</p>
      </div>
    );
  }

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  const handleStop = () => {
    stopSession.mutate(session._id);
  };

  return (
    <div className="bg-indigo-600 rounded-xl p-6 text-center">
      <p className="text-indigo-200 text-sm mb-2">Focus session running</p>
      <p className="text-5xl font-bold text-white mb-4 tabular-nums">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </p>
      <button
        onClick={handleStop}
        className="bg-white text-indigo-600 font-semibold px-6 py-2 rounded-lg hover:bg-indigo-50 transition"
      >
        Stop Session
      </button>
    </div>
  );
}

export default FocusTimer;