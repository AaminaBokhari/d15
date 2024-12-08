import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

function Chat() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Patient Chat</h1>
      <ChatInterface />
    </div>
  );
}

export default Chat;