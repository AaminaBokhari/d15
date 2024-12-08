import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getActivities,
  getRecentActivities,
  createActivity
} from '../controllers/activities.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getActivities)
  .post(createActivity);

router.get('/recent', getRecentActivities);

export default router;