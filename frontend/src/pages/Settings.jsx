import { useState } from 'react';
import { useLinkTelegram } from '../hooks/useNotifications';
import useAuthStore from '../store/authStore';
import Navbar from '../components/Navbar';

function Settings() {
  const [chatId, setChatId] = useState('');
  const [success, setSuccess] = useState(false);

  const linkTelegram = useLinkTelegram();
  const user = useAuthStore((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);

    linkTelegram.mutate(chatId, {
      onSuccess: () => {
        setSuccess(true);
        setChatId('');
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-bold text-white">Settings</h2>

        <div className="bg-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-white font-semibold">Connect Telegram</h3>

          {user?.telegramChatId ? (
            <div className="bg-green-500/10 border border-green-500 text-green-400 text-sm rounded-lg p-3">
              Telegram is connected. You will receive alerts here.
            </div>
          ) : (
            <div className="space-y-4">
              <ol className="text-slate-300 text-sm space-y-2 list-decimal list-inside">
                <li>Open Telegram and search for the bot username</li>
                <li>Send /start to the bot</li>
                <li>Open the getUpdates link in your browser to find your Chat ID</li>
                <li>Copy the number under chat id and paste below</li>
              </ol>

              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Your Telegram Chat ID"
                  value={chatId}
                  onChange={(e) => setChatId(e.target.value)}
                  required
                  className="flex-1 bg-slate-700 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={linkTelegram.isPending}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg transition disabled:opacity-50"
                >
                  {linkTelegram.isPending ? 'Linking...' : 'Connect'}
                </button>
              </form>

              {success && (
                <p className="text-green-400 text-sm">Connected. Check your Telegram for confirmation.</p>
              )}

              {linkTelegram.isError && (
                <p className="text-red-400 text-sm">
                  {linkTelegram.error?.response?.data?.message || 'Failed to connect'}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;