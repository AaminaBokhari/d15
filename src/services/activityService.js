import api from './api';

export const getActivities = async () => {
  const response = await api.get('/activities');
  return response.data;
};

export const getRecentActivities = async (limit = 3) => {
  const response = await api.get(`/activities/recent?limit=${limit}`);
  return response.data;
};

export const createActivity = async (activityData) => {
  const response = await api.post('/activities', activityData);
  return response.data;
};