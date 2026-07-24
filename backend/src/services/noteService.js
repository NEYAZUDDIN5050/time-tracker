import Note from '../models/Note.js';

export const createNote = async (userId, noteData) => {
  const note = await Note.create({
    ...noteData,
    userId,
  });

  return note;
};

export const getNotes = async (userId, filters = {}) => {
  const { taskId, tag, page = 1, limit = 10 } = filters;

  const query = { userId };

  if (taskId) query.taskId = taskId;
  if (tag) query.tags = tag;

  const skip = (page - 1) * limit;

  const notes = await Note.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Note.countDocuments(query);

  return {
    notes,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const updateNote = async (userId, noteId, updates) => {
  const note = await Note.findOneAndUpdate(
    { _id: noteId, userId },
    updates,
    { new: true, runValidators: true }
  );

  if (!note) {
    const error = new Error('Note not found');
    error.statusCode = 404;
    throw error;
  }

  return note;
};

export const deleteNote = async (userId, noteId) => {
  const note = await Note.findOneAndDelete({ _id: noteId, userId });

  if (!note) {
    const error = new Error('Note not found');
    error.statusCode = 404;
    throw error;
  }

  return note;
};