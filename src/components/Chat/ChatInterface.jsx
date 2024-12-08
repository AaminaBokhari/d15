import React, { useState, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import socketService from '../../utils/socketService';
import { toast } from 'react-toastify';

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize socket connection
    const doctorId = 'doctor-123'; // In real app, this would come from auth
    socketService.connect(doctorId);
    setIsConnected(true);

    // Subscribe to new messages
    socketService.subscribeToMessages((message) => {
      setMessages(prev => [...prev, message]);
      toast.info(`New message from ${message.sender}`);
    });

    return () => {
      socketService.disconnect();
    };
  }, []);

  const handleSendMessage = (text) => {
    if (!isConnected) {
      toast.error('Not connected to chat server');
      return;
    }

    const newMessage = {
      id: messages.length + 1,
      sender: 'doctor',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, newMessage]);
    socketService.sendMessage('patient-123', text); // In real app, recipientId would be dynamic
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-lg shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Patient Chat</h2>
        <span className={`inline-block w-2 h-2 rounded-full ml-2 ${
          isConnected ? 'bg-green-500' : 'bg-red-500'
        }`}></span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default ChatInterface;