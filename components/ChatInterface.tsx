import React, { useState } from 'react';
import { Send, User } from 'lucide-react';
import { Message } from '../types';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'Teacher', content: 'Hello! Alex missed the first period today. Is everything okay?', timestamp: new Date(), isMe: false },
    { id: '2', sender: 'Me', content: 'Hi, yes, he had a dental appointment. He should be there by 10 AM.', timestamp: new Date(), isMe: true },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'Me',
      content: inputText,
      timestamp: new Date(),
      isMe: true
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-gray-800 rounded-2xl shadow-sm overflow-hidden border border-gray-700">
      <div className="bg-gray-800 p-4 border-b border-gray-700 flex items-center gap-3">
         <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400">
            <User size={20} />
         </div>
         <div>
            <h3 className="font-bold text-gray-200">Mr. Anderson</h3>
            <p className="text-xs text-green-400 flex items-center gap-1">● Online</p>
         </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${
              msg.isMe 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-gray-700 text-gray-200 rounded-tl-none'
            }`}>
              {msg.content}
              <div className={`text-[10px] mt-1 text-right ${msg.isMe ? 'text-blue-200' : 'text-gray-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 bg-gray-800 border-t border-gray-700 flex gap-2">
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={handleSend}
          className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};