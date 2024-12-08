import sgMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';

export const configureEmailService = () => {
  if (process.env.NODE_ENV === 'production') {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    return {
      send: async (options) => {
        const msg = {
          to: options.email,
          from: process.env.EMAIL_FROM,
          subject: options.subject,
          text: options.message,
          html: options.html
        };
        return sgMail.send(msg);
      }
    };
  } else {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    return {
      send: async (options) => {
        return transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: options.email,
          subject: options.subject,
          text: options.message,
          html: options.html
        });
      }
    };
  }
};