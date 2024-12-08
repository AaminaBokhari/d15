import crypto from 'crypto';

export const createVerificationToken = (user) => {
  const token = crypto.randomBytes(32).toString('hex');
  
  user.verificationToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
    
  user.verificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  const verificationUrl = `${process.env.BASE_URL}/api/auth/verify/${token}`;
  
  return { token, verificationUrl };
};

export const createPasswordResetToken = (user) => {
  const token = crypto.randomBytes(32).toString('hex');
  
  user.passwordResetToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
    
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  const resetUrl = `${process.env.BASE_URL}/api/auth/reset-password/${token}`;
  
  return { token, resetUrl };
};