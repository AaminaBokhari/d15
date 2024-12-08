import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import sendEmail from '../utils/email.js';
import { createVerificationToken, createPasswordResetToken } from '../utils/tokenGenerator.js';

export const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

export const registerUser = async (userData) => {
  const user = await User.create(userData);
  const { token, verificationUrl } = createVerificationToken(user);
  
  await user.save();
  
  return { user, token, verificationUrl };
};

export const verifyUserEmail = async (token) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await User.findOne({
    verificationToken: hashedToken,
    verificationExpires: { $gt: Date.now() }
  });

  if (!user) {
    throw new Error('Invalid or expired verification token');
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationExpires = undefined;
  await user.save();

  return user;
};

export const initiatePasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('No user found with that email');
  }

  const { token, resetUrl } = createPasswordResetToken(user);
  await user.save({ validateBeforeSave: false });

  return { user, resetUrl };
};

export const resetUserPassword = async (token, newPassword) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    throw new Error('Invalid or expired reset token');
  }

  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  return user;
};