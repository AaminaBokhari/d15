import React from 'react';

function ChatMessage({ message }) {
  const isDoctor = message.sender === 'doctor';
  
  return (
    <div className={`flex ${isDoctor ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isDoctor
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-gray-100 text-gray-800 rounded-bl-none'
        }`}
      >
        <p>{message.text}</p>
        <span className={`text-xs ${isDoctor ? 'text-blue-100' : 'text-gray-500'}`}>
          {message.time}
        </span>
      </div>
    </div>
  );
}

export default ChatMessage;