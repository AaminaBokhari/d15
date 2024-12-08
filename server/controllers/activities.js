import asyncHandler from '../utils/asyncHandler.js';
import * as activityService from '../services/activityService.js';
import AppError from '../utils/AppError.js';

export const getActivities = asyncHandler(async (req, res) => {
  const activities = await activityService.getActivitiesService({
    doctor: req.user.id
  });
  res.json(activities);
});

export const getRecentActivities = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 3;
  const activities = await activityService.getRecentActivitiesService({
    doctor: req.user.id
  }, limit);
  res.json(activities);
});

export const createActivity = asyncHandler(async (req, res) => {
  const activity = await activityService.createActivityService({
    ...req.body,
    doctor: req.user.id
  });
  res.status(201).json(activity);
});