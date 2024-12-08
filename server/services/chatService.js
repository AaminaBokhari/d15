import Message from '../models/Message.js';

export const createMessageService = async (messageData) => {
  return await Message.create(messageData);
};

export const getMessagesService = async (userId1, userId2) => {
  return await Message.find({
    $or: [
      { sender: userId1, recipient: userId2 },
      { sender: userId2, recipient: userId1 }
    ]
  })
  .populate(['sender', 'recipient'])
  .sort({ createdAt: 1 });
};

export const markMessagesAsReadService = async (senderId, recipientId) => {
  return await Message.updateMany(
    { sender: senderId, recipient: recipientId, read: false },
    { read: true }
  );
};