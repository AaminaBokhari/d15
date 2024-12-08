import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect(userId) {
    this.socket = io('http://localhost:3000', {
      query: { userId },
    });

    this.socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });
  }

  subscribeToMessages(callback) {
    if (!this.socket) return;
    this.socket.on('new-message', callback);
  }

  sendMessage(recipientId, message) {
    if (!this.socket) return;
    this.socket.emit('send-message', {
      recipientId,
      message,
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketService();