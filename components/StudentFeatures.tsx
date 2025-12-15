
import React, { useState, useEffect, useRef } from 'react';
import { Card, Button } from './Layout';
import { Play, Pause, RotateCcw, BrainCircuit, CheckCircle, Clock, BookOpen } from 'lucide-react';
import { generateStudyPlan } from '../services/geminiService';
import { StudyPlanItem } from '../types';

// --- Study Timer Component ---
export const StudyTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'FOCUS' | 'BREAK'>('FOCUS');
  
  // Ref for the interval to clear it properly
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Logic for timer completion (e.g., play sound, switch mode)
      if (mode === 'FOCUS') {
        setMode('BREAK');
        setTimeLeft(5 * 60);
      } else {
        setMode('FOCUS');
        setTimeLeft(25 * 60);
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'FOCUS' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = mode === 'FOCUS' 
    ? ((25 * 60 - timeLeft) / (25 * 60)) * 100 
    : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

  return (
    <div className="space-y-6">
      <Card className="text-center py-10">
        <div className="relative w-64 h-64 mx-auto mb-8 flex items-center justify-center">
          {/* Circular Progress Background */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="#374151"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke={mode === 'FOCUS' ? '#3B82F6' : '#10B981'}
              strokeWidth="12"
              fill="none"
              strokeDasharray={2 * Math.PI * 120}
              strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
              className="transition-all duration-1000 ease-linear"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-sm font-bold tracking-widest uppercase mb-2 ${mode === 'FOCUS' ? 'text-blue-400' : 'text-green-400'}`}>
              {mode === 'FOCUS' ? 'Focus Mode' : 'Break Time'}
            </span>
            <span className="text-6xl font-mono font-bold text-gray-100 tracking-tighter">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button 
            onClick={toggleTimer}
            className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-transform active:scale-95 ${isActive ? 'bg-amber-500' : 'bg-blue-600'}`}
          >
            {isActive ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
          </button>
          <button 
            onClick={resetTimer}
            className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 hover:bg-gray-600 transition-colors"
          >
            <RotateCcw size={24} />
          </button>
        </div>
      </Card>
      
      <div className="grid grid-cols-2 gap-4">
        <Card title="Today's Goal" className="bg-blue-900/20 border border-blue-800/50">
          <div className="text-2xl font-bold text-blue-400">4h 30m</div>
          <div className="text-sm text-blue-300/70">Target Duration</div>
        </Card>
        <Card title="Completed" className="bg-green-900/20 border border-green-800/50">
          <div className="text-2xl font-bold text-green-400">1h 15m</div>
          <div className="text-sm text-green-300/70">2 Sessions</div>
        </Card>
      </div>
    </div>
  );
};

// --- AI Planner Component ---
export const AIPlanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<StudyPlanItem[] | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    // Mock subjects for demo
    const subjects = ['Mathematics', 'Computer Science', 'History'];
    const newPlan = await generateStudyPlan(subjects, 3);
    setPlan(newPlan);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-indigo-700 to-purple-800 text-white border-none">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <BrainCircuit size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">AI Study Planner</h3>
            <p className="text-indigo-100 text-sm mb-4">Let Gemini AI optimize your study schedule based on your subjects and free time.</p>
            <Button 
              onClick={handleGenerate} 
              disabled={loading}
              className="bg-white text-indigo-700 w-full hover:bg-indigo-50 shadow-none border-none font-bold"
            >
              {loading ? 'Generating Plan...' : 'Generate Today\'s Plan'}
            </Button>
          </div>
        </div>
      </Card>

      {plan && (
        <div className="space-y-3">
          <h3 className="font-bold text-gray-400 ml-1">Your Optimized Schedule</h3>
          {plan.map((item, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-gray-800 rounded-xl border border-gray-700 shadow-sm">
              <div className="flex flex-col items-center min-w-[60px]">
                <span className="font-bold text-gray-200">{item.time}</span>
                <span className="text-xs text-gray-500 mt-1">{item.duration}</span>
              </div>
              <div className="w-px h-12 bg-gray-700"></div>
              <div>
                <h4 className="font-bold text-gray-200">{item.subject}</h4>
                <p className="text-sm text-gray-400">{item.topic}</p>
              </div>
              <div className="ml-auto">
                 <div className="w-6 h-6 rounded-full border-2 border-gray-600" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Assignment List ---
export const AssignmentsList: React.FC = () => {
  const assignments = [
    { id: '1', title: 'Calculus Worksheet 4.2', subject: 'Math', due: 'Tomorrow', completed: false },
    { id: '2', title: 'React Project Proposal', subject: 'CS', due: 'In 2 days', completed: false },
    { id: '3', title: 'History Essay Draft', subject: 'History', due: 'Next Week', completed: true },
  ];

  return (
    <div className="space-y-4">
      {assignments.map(a => (
        <div key={a.id} className="flex items-center p-4 bg-gray-800 rounded-xl shadow-sm border border-gray-700">
          <div className={`p-3 rounded-xl mr-4 ${a.completed ? 'bg-green-900/30 text-green-400' : 'bg-blue-900/30 text-blue-400'}`}>
             <BookOpen size={20} />
          </div>
          <div className="flex-1">
            <h4 className={`font-bold ${a.completed ? 'text-gray-500 line-through' : 'text-gray-200'}`}>{a.title}</h4>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs font-semibold px-2 py-0.5 bg-gray-700 rounded text-gray-400">{a.subject}</span>
              <span className="text-xs text-red-400 flex items-center gap-1">
                <Clock size={12} /> {a.due}
              </span>
            </div>
          </div>
          <button className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${a.completed ? 'border-green-500 bg-green-500' : 'border-gray-600'}`}>
            {a.completed && <CheckCircle size={14} className="text-white" />}
          </button>
        </div>
      ))}
    </div>
  );
};

// --- Learning Swipe ---
export const LearningSwipe: React.FC = () => {
  return (
    <Card title="Daily Learning Swipe">
      <div className="flex flex-col items-center justify-center h-64 text-center p-6">
         <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-pink-500/30">
             <BookOpen size={32} className="text-white" />
         </div>
         <h3 className="text-xl font-bold text-white mb-2">Daily Micro-Learning</h3>
         <p className="text-gray-400">Swipe through bite-sized lessons tailored to your curriculum.</p>
         <Button className="mt-6 bg-pink-600 hover:bg-pink-500 w-full">Start Swiping</Button>
      </div>
    </Card>
  );
};
