import {
  startSession,
  stopSession,
  cancelSession,
  getSessions,
  getRunningSession,
} from '../services/focusSessionService.js';
import wrapAsync from '../utils/wrapAsync.js';

export const startSessionHandler = wrapAsync(async (req, res) => {
  const session = await startSession(req.user.id, req.body);

  res.status(201).json({
    success: true,
    message: 'Session started',
    data: session,
  });
});

export const stopSessionHandler = wrapAsync(async (req, res) => {
  const session = await stopSession(req.user.id, req.params.id);

  res.status(200).json({
    success: true,
    message: 'Session stopped',
    data: session,
  });
});

export const cancelSessionHandler = wrapAsync(async (req, res) => {
  const session = await cancelSession(req.user.id, req.params.id);

  res.status(200).json({
    success: true,
    message: 'Session cancelled',
    data: session,
  });
});

export const getSessionsHandler = wrapAsync(async (req, res) => {
  const { taskId, from, to, page, limit } = req.query;

  const result = await getSessions(req.user.id, { taskId, from, to, page, limit });

  res.status(200).json({
    success: true,
    data: result.sessions,
    pagination: result.pagination,
  });
});

export const getRunningSessionHandler = wrapAsync(async (req, res) => {
  const session = await getRunningSession(req.user.id);

  res.status(200).json({
    success: true,
    data: session,
  });
});