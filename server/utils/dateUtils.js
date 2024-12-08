import { format, parseISO, isValid } from 'date-fns';

export const formatDate = (date, formatStr = 'yyyy-MM-dd') => {
  if (!date) return '';
  
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return isValid(parsedDate) ? format(parsedDate, formatStr) : '';
};

export const isValidDate = (date) => {
  if (!date) return false;
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return isValid(parsedDate);
};

export const getTimeSlots = (startTime, endTime, duration = 30) => {
  const slots = [];
  let currentSlot = new Date(startTime);

  while (currentSlot < endTime) {
    slots.push(new Date(currentSlot));
    currentSlot = new Date(currentSlot.getTime() + duration * 60000);
  }

  return slots;
};