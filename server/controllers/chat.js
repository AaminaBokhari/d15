import Message from '../models/Message.js';

export const sendMessage = async (req, res) => {
  try {
    const message = await Message.create({
      sender: req.user.id,
      recipient: req.body.recipientId,
      content: req.body.content
    });

    await message.populate(['sender', 'recipient']);

    // Emit the message through Socket.IO
    req.io.to(req.body.recipientId).emit('new-message', message);

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, recipient: req.params.userId },
        { sender: req.params.userId, recipient: req.user.id }
      ]
    })
    .populate(['sender', 'recipient'])
    .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
};

export const markMessagesAsRead = async (req, res) => {
  try {
    await Message.updateMany(
      { sender: req.params.userId, recipient: req.user.id, read: false },
      { read: true }
    );

    res.json({ message: 'Messages marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Error marking messages as read', error: error.message });
  }
};