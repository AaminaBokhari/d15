import Activity from '../models/Activity.js';

export const getActivitiesService = async (query) => {
  return await Activity.find(query)
    .populate(['patient', 'doctor'])
    .sort({ timestamp: -1 });
};

export const getRecentActivitiesService = async (query, limit) => {
  return await Activity.find(query)
    .populate(['patient', 'doctor'])
    .sort({ timestamp: -1 })
    .limit(limit);
};

export const createActivityService = async (activityData) => {
  return await Activity.create(activityData);
};