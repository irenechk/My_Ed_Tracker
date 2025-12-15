import React, { useState, useEffect, useRef } from 'react';
import { Card, Button } from './Layout';
import { Heart, X, Zap, Moon, Sun, Book, Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, Clock, Send, Smile, Paperclip } from 'lucide-react';
import { Message } from '../types';

interface Partner {
  id: string;
  name: string;
  age: number;
  subjects: string[];
  vibe: 'Night Owl' | 'Morning Bird';
  streak: number;
  avatar: string;
  bio: string;
}

const MOCK_PARTNERS: Partner[] = [
  {
    id: '1',
    name: 'Chloe Price',
    age: 19,
    subjects: ['Physics', 'Calculus'],
    vibe: 'Night Owl',
    streak: 15,
    avatar: 'https://ui-avatars.com/api/?name=Chloe+Price&background=6366f1&color=fff',
    bio: "Focusing on finals. Let's maximize efficiency! 🚀"
  },
  {
    id: '2',
    name: 'Max C.',
    age: 20,
    subjects: ['History', 'Literature'],
    vibe: 'Morning Bird',
    streak: 8,
    avatar: 'https://ui-avatars.com/api/?name=Max+C&background=10b981&color=fff',
    bio: "Need a silent study buddy for essay writing ✍️"
  },
  {
    id: '3',
    name: 'Liam D.',
    age: 19,
    subjects: ['Chemistry', 'Biology'],
    vibe: 'Night Owl',
    streak: 22,
    avatar: 'https://ui-avatars.com/api/?name=Liam+D&background=f59e0b&color=fff',
    bio: "Pomodoro technique only! 25/5 intervals. ⏱️"
  }
];

export const StudyTwin: React.FC = () => {
  const [view, setView] = useState<'PREFS' | 'SWIPE' | 'MATCHED' | 'VIDEO' | 'CHAT'>('PREFS');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [matchedPartner, setMatchedPartner] = useState<Partner | null>(null);
  
  // Chat State
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Video Room State
  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [sessionTime, setSessionTime] = useState(0);

  // Timer logic for video room
  useEffect(() => {
    let interval: number;
    if (view === 'VIDEO') {
      interval = window.setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [view]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (view === 'CHAT') {
       chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, view]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      // It's a match!
      setMatchedPartner(MOCK_PARTNERS[currentCardIndex]);
      setTimeout(() => setView('MATCHED'), 500); // Small delay for animation simulation
    } else {
      // Next card
      if (currentCardIndex < MOCK_PARTNERS.length - 1) {
        setCurrentCardIndex(prev => prev + 1);
      } else {
        // Reset for demo
        setCurrentCardIndex(0);
      }
    }
  };

  const startSession = () => {
    setView('VIDEO');
  };

  const startChat = () => {
     setMessages([
        { id: '1', sender: matchedPartner!.name, content: "Hey! Let's crush these exams! 📚", timestamp: new Date(), isMe: false }
     ]);
     setView('CHAT');
  };

  const handleSendMessage = () => {
     if (!inputText.trim()) return;
     const newMsg: Message = {
        id: Date.now().toString(),
        sender: 'Me',
        content: inputText,
        timestamp: new Date(),
        isMe: true
     };
     setMessages([...messages, newMsg]);
     setInputText('');
     
     // Mock reply
     setTimeout(() => {
        setMessages(prev => [...prev, {
           id: (Date.now() + 1).toString(),
           sender: matchedPartner!.name,
           content: "Sounds like a plan! I'm free to study in 10 mins.",
           timestamp: new Date(),
           isMe: false
        }]);
     }, 1500);
  };

  // --- 1. Preferences Screen ---
  if (view === 'PREFS') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center space-y-2 mb-8 mt-4">
           <div className="inline-flex p-4 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full shadow-lg shadow-purple-900/40 mb-2 relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
              <Zap size={32} className="text-white fill-current relative z-10" />
           </div>
           <h2 className="text-3xl font-bold text-white tracking-tight">Find Your StudyTwin</h2>
           <p className="text-gray-400 px-6 font-medium">Match with students who share your subjects, goals, and study vibe.</p>
        </div>

        <Card title="What's your vibe?" className="border-t-4 border-t-purple-500">
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center p-4 rounded-2xl border border-purple-500 bg-purple-900/20 transition-all hover:bg-purple-900/30">
              <Moon size={32} className="text-purple-400 mb-2" />
              <span className="font-bold text-gray-200">Night Owl</span>
              <span className="text-xs text-purple-400 font-medium mt-1">8 PM - 2 AM</span>
            </button>
            <button className="flex flex-col items-center p-4 rounded-2xl border border-gray-700 hover:bg-white/5 transition-all opacity-60">
              <Sun size={32} className="text-amber-500 mb-2" />
              <span className="font-bold text-gray-200">Morning Bird</span>
              <span className="text-xs text-gray-500 font-medium mt-1">5 AM - 10 AM</span>
            </button>
          </div>
        </Card>

        <Card title="Focus Subjects" className="border-none">
          <div className="flex flex-wrap gap-2">
            {['Calculus', 'Physics', 'History', 'Literature', 'Coding'].map(subj => (
              <span key={subj} className="px-3.5 py-1.5 rounded-full bg-gray-800 text-gray-300 text-sm font-medium border border-gray-700">
                {subj}
              </span>
            ))}
            <span className="px-3.5 py-1.5 rounded-full border border-dashed border-gray-600 text-gray-500 text-sm font-medium hover:border-gray-400 hover:text-gray-400 cursor-pointer transition-colors">
              + Add
            </span>
          </div>
        </Card>

        <Button onClick={() => setView('SWIPE')} className="w-full bg-gradient-to-r from-purple-600 to-pink-500 shadow-purple-900/40 border-none h-14 text-lg">
          Start Matching
        </Button>
      </div>
    );
  }

  // --- 2. Swipe Screen ---
  if (view === 'SWIPE') {
    const card = MOCK_PARTNERS[currentCardIndex];
    return (
      <div className="h-[calc(100vh-180px)] flex flex-col items-center justify-center relative">
        {/* Background stack effect */}
        <div className="absolute w-[85%] h-[60%] bg-gray-800 rounded-3xl shadow-sm -z-10 translate-y-4 scale-95 opacity-50 border border-white/5"></div>
        <div className="absolute w-[80%] h-[60%] bg-gray-800 rounded-3xl shadow-sm -z-20 translate-y-8 scale-90 opacity-25 border border-white/5"></div>

        {/* Main Card */}
        <div className="w-full max-w-sm glass-card rounded-[2rem] shadow-2xl shadow-black/50 overflow-hidden border border-white/10 relative transform transition-all hover:scale-[1.01]">
           {/* Image Area */}
           <div className="h-72 bg-gradient-to-br from-indigo-900 to-purple-900 relative">
              <img src={card.avatar} alt={card.name} className="w-full h-full object-cover opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent p-6 pt-24">
                 <h2 className="text-3xl font-bold text-white tracking-tight">{card.name}, {card.age}</h2>
                 <p className="text-white/80 flex items-center gap-2 font-medium">
                    {card.vibe === 'Night Owl' ? <Moon size={16} className="text-purple-400" /> : <Sun size={16} className="text-amber-400" />} {card.vibe}
                 </p>
              </div>
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold border border-white/20 flex items-center gap-1.5 shadow-lg">
                 <Zap size={14} className="text-yellow-400 fill-current" /> {card.streak} Day Streak
              </div>
           </div>
           
           {/* Content Area */}
           <div className="p-6 pb-28">
              <div className="flex flex-wrap gap-2 mb-4">
                {card.subjects.map(s => (
                  <span key={s} className="px-2.5 py-1 bg-indigo-500/20 text-indigo-200 text-xs font-bold rounded-lg border border-indigo-500/20">
                    {s}
                  </span>
                ))}
              </div>
              <p className="text-gray-300 italic text-lg leading-relaxed">"{card.bio}"</p>
           </div>

           {/* Actions */}
           <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-8">
              <button 
                onClick={() => handleSwipe('left')}
                className="w-16 h-16 bg-gray-800/80 backdrop-blur-md rounded-full shadow-lg shadow-black/30 text-red-400 flex items-center justify-center border border-white/10 hover:bg-red-500/20 hover:text-red-300 hover:scale-110 transition-all duration-300"
              >
                <X size={32} />
              </button>
              <button 
                onClick={() => handleSwipe('right')}
                className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full shadow-lg shadow-purple-900/50 text-white flex items-center justify-center hover:scale-110 hover:shadow-purple-500/50 transition-all duration-300 border border-white/20"
              >
                <Heart size={32} fill="currentColor" />
              </button>
           </div>
        </div>
      </div>
    );
  }

  // --- 3. Matched Screen ---
  if (view === 'MATCHED' && matchedPartner) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-140px)] animate-in zoom-in duration-300">
         <div className="text-center space-y-8 w-full max-w-sm px-4">
            <div className="relative h-32 mb-10">
               <div className="absolute left-1/2 -translate-x-[85%] w-28 h-28 rounded-full border-4 border-gray-900 shadow-2xl overflow-hidden z-10 animate-in slide-in-from-left duration-700">
                  <img src="https://ui-avatars.com/api/?name=Me&background=2563EB&color=fff" className="w-full h-full object-cover" />
               </div>
               <div className="absolute left-1/2 -translate-x-[15%] w-28 h-28 rounded-full border-4 border-gray-900 shadow-2xl overflow-hidden z-20 animate-in slide-in-from-right duration-700">
                  <img src={matchedPartner.avatar} className="w-full h-full object-cover" />
               </div>
               <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow-xl animate-bounce">
                  <Heart size={28} className="text-pink-500 fill-current" />
               </div>
            </div>
            
            <div className="space-y-2">
               <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-sm">
                  It's a Match!
               </h2>
               <p className="text-gray-400 text-lg">
                  You and <span className="font-bold text-white">{matchedPartner.name}</span> match perfectly.
               </p>
            </div>

            <div className="flex flex-col gap-4 w-full pt-6">
               <Button onClick={startChat} className="bg-gray-800 hover:bg-gray-700 border border-gray-700 h-14 text-lg gap-3">
                  <MessageSquare size={20} /> Say Hello
               </Button>
               <Button onClick={startSession} className="bg-gradient-to-r from-indigo-600 to-purple-600 border-none h-14 text-lg shadow-lg shadow-indigo-900/30 gap-3">
                  <Video size={22} /> Video Room
               </Button>
               <button onClick={() => setView('SWIPE')} className="text-sm text-gray-500 hover:text-gray-300 mt-2">
                  Keep Swiping
               </button>
            </div>
         </div>
      </div>
    );
  }

  // --- 4. Chat Screen ---
  if (view === 'CHAT' && matchedPartner) {
    return (
      <div className="flex flex-col h-[calc(100vh-140px)] glass-card rounded-3xl overflow-hidden border border-white/10 animate-in slide-in-from-bottom-10 duration-300">
         {/* Chat Header */}
         <div className="bg-gray-900/50 p-4 border-b border-white/5 flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-3">
               <button onClick={() => setView('MATCHED')} className="p-1 -ml-1 text-gray-400 hover:text-white">
                  <X size={20} />
               </button>
               <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                     <img src={matchedPartner.avatar} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
               </div>
               <div>
                  <h3 className="font-bold text-gray-100">{matchedPartner.name}</h3>
                  <p className="text-[10px] text-gray-400 flex items-center gap-1">
                     <Zap size={8} className="text-yellow-500 fill-current" /> {matchedPartner.streak} Day Streak
                  </p>
               </div>
            </div>
            <button onClick={startSession} className="p-2 bg-indigo-600/20 text-indigo-400 rounded-full hover:bg-indigo-600 hover:text-white transition-all">
               <Video size={20} />
            </button>
         </div>

         {/* Messages */}
         <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
            {messages.map((msg) => (
               <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                  {!msg.isMe && (
                     <div className="w-8 h-8 rounded-full overflow-hidden mr-2 mt-auto border border-white/10">
                        <img src={matchedPartner.avatar} className="w-full h-full object-cover" />
                     </div>
                  )}
                  <div className={`max-w-[70%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                     msg.isMe 
                     ? 'bg-blue-600 text-white rounded-tr-sm' 
                     : 'bg-gray-700 text-gray-100 rounded-tl-sm'
                  }`}>
                     {msg.content}
                     <div className={`text-[10px] mt-1 text-right opacity-60`}>
                     {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                     </div>
                  </div>
               </div>
            ))}
            <div ref={chatEndRef} />
         </div>

         {/* Input Area */}
         <div className="p-3 bg-gray-900/50 border-t border-white/5 backdrop-blur-md flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-200">
               <Paperclip size={20} />
            </button>
            <input 
               type="text" 
               value={inputText}
               onChange={(e) => setInputText(e.target.value)}
               placeholder="Type a message..."
               className="flex-1 px-4 py-2.5 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 text-sm transition-all"
               onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button 
               onClick={handleSendMessage}
               className={`p-2.5 rounded-full transition-all ${inputText.trim() ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-800 text-gray-500'}`}
            >
               <Send size={18} className={inputText.trim() ? 'ml-0.5' : ''} />
            </button>
         </div>
      </div>
    );
  }

  // --- 5. Video Room ---
  if (view === 'VIDEO' && matchedPartner) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col animate-in fade-in duration-500">
         {/* Header */}
         <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center gap-3">
               <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-white text-xs font-mono tracking-wider">{formatTime(sessionTime)}</span>
               </div>
               <div className="bg-purple-900/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-500/30 shadow-lg shadow-purple-900/20">
                  <span className="text-purple-200 text-xs font-bold flex items-center gap-1.5">
                     <Zap size={12} fill="currentColor" /> AI Focus Monitor
                  </span>
               </div>
            </div>
            <button 
               onClick={() => setView('MATCHED')}
               className="p-3 bg-red-500/20 text-white rounded-full hover:bg-red-500 transition-colors backdrop-blur-md border border-white/10"
            >
               <PhoneOff size={20} />
            </button>
         </div>

         {/* Main Video Area (Partner) */}
         <div className="flex-1 relative bg-gray-900">
            <img src={matchedPartner.avatar} className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="text-center">
                  <div className="w-24 h-24 rounded-full border-4 border-purple-500/30 flex items-center justify-center mx-auto mb-4 relative">
                     <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 animate-spin"></div>
                     <Book size={32} className="text-white/50" />
                  </div>
                  <p className="text-white/80 font-medium tracking-wide">{matchedPartner.name} is studying...</p>
               </div>
            </div>
         </div>

         {/* Self View (PIP) */}
         <div className="absolute bottom-24 right-4 w-32 h-48 bg-gray-800 rounded-2xl border-2 border-white/10 overflow-hidden shadow-2xl">
            {isVideoOn ? (
               <div className="w-full h-full bg-gray-700 flex items-center justify-center relative group">
                  <img src="https://ui-avatars.com/api/?name=Me&background=2563EB&color=fff" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 text-[10px] text-white/70 bg-black/40 px-1.5 rounded backdrop-blur-sm">You</span>
               </div>
            ) : (
               <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <VideoOff size={24} className="text-white/30" />
               </div>
            )}
         </div>

         {/* Controls */}
         <div className="h-24 bg-gray-900/80 backdrop-blur-xl border-t border-white/10 flex items-center justify-center gap-8 px-6 pb-4">
            <button 
               onClick={() => setIsMicOn(!isMicOn)}
               className={`p-4 rounded-full transition-all duration-300 ${isMicOn ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-red-500/20 text-red-500 border border-red-500/30'}`}
            >
               {isMicOn ? <Mic size={24} /> : <MicOff size={24} />}
            </button>
            <button 
               onClick={() => setIsVideoOn(!isVideoOn)}
               className={`p-4 rounded-full transition-all duration-300 ${isVideoOn ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-red-500/20 text-red-500 border border-red-500/30'}`}
            >
               {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
            </button>
            <button 
                onClick={() => setView('CHAT')}
                className="p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 relative"
            >
               <MessageSquare size={24} />
               <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-900"></span>
            </button>
         </div>
      </div>
    );
  }

  return <div>Unknown View</div>;
};