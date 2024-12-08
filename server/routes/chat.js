import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  sendMessage,
  getMessages,
  markMessagesAsRead
} from '../controllers/chat.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(sendMessage);

router.route('/:userId')
  .get(getMessages)
  .patch(markMessagesAsRead);

export default router;