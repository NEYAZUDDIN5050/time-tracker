import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import wrapAsync from '../utils/wrapAsync.js';

const authMiddleware = wrapAsync(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    const error = new Error('Not authorized, no token provided');
    error.statusCode = 401;
    throw error;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select('-password');

  if (!user) {
    const error = new Error('Not authorized, user not found');
    error.statusCode = 401;
    throw error;
  }

  req.user = { id: user._id };

  next();
});

export default authMiddleware;