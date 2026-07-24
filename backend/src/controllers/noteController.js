import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} from '../services/noteService.js';
import wrapAsync from '../utils/wrapAsync.js';

export const createNoteHandler = wrapAsync(async (req, res) => {
  const note = await createNote(req.user.id, req.body);

  res.status(201).json({
    success: true,
    message: 'Note created successfully',
    data: note,
  });
});

export const getNotesHandler = wrapAsync(async (req, res) => {
  const { taskId, tag, page, limit } = req.query;

  const result = await getNotes(req.user.id, { taskId, tag, page, limit });

  res.status(200).json({
    success: true,
    data: result.notes,
    pagination: result.pagination,
  });
});

export const updateNoteHandler = wrapAsync(async (req, res) => {
  const note = await updateNote(req.user.id, req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: 'Note updated successfully',
    data: note,
  });
});

export const deleteNoteHandler = wrapAsync(async (req, res) => {
  await deleteNote(req.user.id, req.params.id);

  res.status(200).json({
    success: true,
    message: 'Note deleted successfully',
  });
});