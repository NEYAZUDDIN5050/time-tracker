import { registerUser, loginUser, getUserById } from '../services/authService.js';
import wrapAsync from '../utils/wrapAsync.js';

export const signup = wrapAsync(async (req, res) => {
    const { name, email, password } = req.body;
    const result = await registerUser({ name, email, password });

  res.status(201).json({
    success:true,
    message:'User register successfully',
    data: result,
  });

});
export const login = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await loginUser({ email, password });

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: result,
  });
});
export const getMe = wrapAsync(async (req, res) => {
  const user = await getUserById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});