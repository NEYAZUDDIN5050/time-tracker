import { useState } from 'react';
import { useNotes, useCreateNote, useDeleteNote } from '../hooks/useNotes';
import Navbar from '../components/Navbar';

function Notes() {
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  const { data, isLoading } = useNotes();
  const createNote = useCreateNote();
  const deleteNote = useDeleteNote();

  const notes = data?.data || [];

  const handleSubmit = (e) => {
    e.preventDefault();

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    createNote.mutate(
      { content, tags },
      {
        onSuccess: () => {
          setContent('');
          setTagsInput('');
        },
      }
    );
  };

  const handleDelete = (id) => {
    deleteNote.mutate(id);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-bold text-white">Notes</h2>

        <form onSubmit={handleSubmit} className="bg-slate-800 rounded-xl p-4 space-y-3">
          <textarea
            placeholder="Write a note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={3}
            className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />

          <input
            type="text"
            placeholder="Tags (comma separated, e.g. urgent, work)"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            disabled={createNote.isPending}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg transition disabled:opacity-50"
          >
            {createNote.isPending ? 'Saving...' : 'Add Note'}
          </button>
        </form>

        {isLoading && <p className="text-slate-400 text-center">Loading notes...</p>}

        {!isLoading && notes.length === 0 && (
          <p className="text-slate-500 text-center py-8">No notes yet.</p>
        )}

        <div className="space-y-3">
          {notes.map((note) => (
            <div key={note._id} className="bg-slate-800 rounded-xl p-4">
              <p className="text-white">{note.content}</p>

              {note.tags.length > 0 && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-slate-700 text-indigo-300 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <button
                onClick={() => handleDelete(note._id)}
                className="text-slate-500 hover:text-red-400 text-xs mt-2 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notes;