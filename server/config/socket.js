import { Server } from 'socket.io';

const initializeSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });

  const userSockets = new Map();

  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    userSockets.set(userId, socket.id);

    socket.on('join-room', (roomId) => {
      socket.join(roomId);
    });

    socket.on('send-message', async ({ recipientId, content }) => {
      const recipientSocketId = userSockets.get(recipientId);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('new-message', {
          senderId: userId,
          content,
          timestamp: new Date()
        });
      }
    });

    socket.on('disconnect', () => {
      userSockets.delete(userId);
    });
  });

  return io;
};

export default initializeSocket;