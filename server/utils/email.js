import { configureEmailService } from '../config/email.js';

const emailService = configureEmailService();

const sendEmail = async (options) => {
  await emailService.send(options);
};

export default sendEmail;