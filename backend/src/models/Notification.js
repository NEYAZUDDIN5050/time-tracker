import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FocusSession',
      default: null,
    },
    message: {
      type: String,
      required: true,
    },
    channel: {
      type: String,
      enum: ['telegram', 'webpush', 'email'],
      default: 'telegram',
    },
    type: {
      type: String,
      enum: ['limit-breach', 'session-end', 'daily-summary'],
      required: true,
    },
    status: {
      type: String,
      enum: ['sent', 'failed'],
      default: 'sent',
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;