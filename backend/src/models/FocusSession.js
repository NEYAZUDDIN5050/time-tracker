import mongoose from 'mongoose';

const focusSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
      default: null,
    },
    type: {
      type: String,
      enum: ['pomodoro', 'deep-work', 'custom'],
      default: 'custom',
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      default: null,
    },
    durationMinutes: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['running', 'completed', 'cancelled'],
      default: 'running',
    },
  },
  { timestamps: true }
);

const FocusSession = mongoose.model('FocusSession', focusSessionSchema);

export default FocusSession;