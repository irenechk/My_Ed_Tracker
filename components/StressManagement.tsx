import React, { useState, useEffect } from 'react';
import { Card, Button } from './Layout';
import { Wind, Music, Smile, CloudRain, Trees, Volume2, Heart, RefreshCw } from 'lucide-react';

export const StressManagement: React.FC = () => {
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathText, setBreathText] = useState('Ready');
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale' | 'idle'>('idle');
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [mood, setMood] = useState<string | null>(null);

  // Breathing Logic (4-7-8 Technique)
  useEffect(() => {
    let interval: number;
    if (breathingActive) {
      let phaseTime = 0;
      const cycle = () => {
        // Simple 4-4-4 for visual ease in demo
        if (phaseTime < 4) {
          setBreathPhase('inhale');
          setBreathText('Inhale...');
        } else if (phaseTime < 8) {
          setBreathPhase('hold');
          setBreathText('Hold...');
        } else if (phaseTime < 12) {
          setBreathPhase('exhale');
          setBreathText('Exhale...');
        } else {
          phaseTime = -1; // Reset
        }
        phaseTime++;
      };
      
      cycle(); // Start immediately
      interval = window.setInterval(cycle, 1000);
    } else {
      setBreathPhase('idle');
      setBreathText('Ready');
    }
    return () => clearInterval(interval);
  }, [breathingActive]);

  const toggleBreathing = () => {
    setBreathingActive(!breathingActive);
  };

  const affirmations = [
    "You are doing your best, and that is enough.",
    "Small progress is still progress.",
    "Your potential to succeed is infinite.",
    "Take a deep breath. You got this.",
    "Focus on what you can control."
  ];

  const [affirmation, setAffirmation] = useState(affirmations[0]);

  const newAffirmation = () => {
    const random = affirmations[Math.floor(Math.random() * affirmations.length)];
    setAffirmation(random);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-500/20 to-emerald-500/20 p-6 rounded-3xl border border-teal-500/30 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <Wind size={40} className="text-teal-400 mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-teal-100">Take a Moment</h2>
        <p className="text-teal-200/80 text-sm mt-1">Reset your mind and body.</p>
      </div>

      {/* Breathing Exercise */}
      <Card title="Guided Breathing" className="text-center py-8 relative overflow-hidden">
        <div className="relative h-48 flex items-center justify-center mb-6">
          {/* Animated Circles */}
          <div className={`absolute w-32 h-32 rounded-full border-4 border-teal-500/30 transition-all duration-[4000ms] ease-in-out ${
            breathPhase === 'inhale' ? 'scale-150 opacity-100 border-teal-400' : 
            breathPhase === 'exhale' ? 'scale-75 opacity-50' : 
            breathPhase === 'hold' ? 'scale-150 border-teal-300 shadow-[0_0_30px_rgba(45,212,191,0.5)]' : 'scale-100'
          }`}></div>
          <div className={`absolute w-24 h-24 bg-teal-500/20 rounded-full backdrop-blur-sm transition-all duration-[4000ms] ease-in-out ${
             breathPhase === 'inhale' ? 'scale-150' : 
             breathPhase === 'exhale' ? 'scale-50' : 'scale-150'
          }`}></div>
          
          <span className="relative z-10 text-2xl font-bold text-white tracking-widest uppercase transition-all">
            {breathText}
          </span>
        </div>
        
        <Button 
          onClick={toggleBreathing}
          className={`mx-auto w-40 ${breathingActive ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-teal-500 text-white hover:bg-teal-600'}`}
        >
          {breathingActive ? 'Stop Session' : 'Start Breathing'}
        </Button>
      </Card>

      {/* Soundscapes */}
      <Card title="Soundscapes">
        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={() => setActiveSound(activeSound === 'rain' ? null : 'rain')}
            className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all ${
              activeSound === 'rain' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <CloudRain size={24} />
            <span className="text-xs font-medium">Rain</span>
          </button>
          
          <button 
            onClick={() => setActiveSound(activeSound === 'forest' ? null : 'forest')}
            className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all ${
              activeSound === 'forest' ? 'bg-green-600 text-white shadow-lg shadow-green-900/40' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Trees size={24} />
            <span className="text-xs font-medium">Forest</span>
          </button>

          <button 
            onClick={() => setActiveSound(activeSound === 'lofi' ? null : 'lofi')}
            className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all ${
              activeSound === 'lofi' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Music size={24} />
            <span className="text-xs font-medium">Lo-Fi</span>
          </button>
        </div>
        {activeSound && (
           <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 animate-pulse">
              <Volume2 size={14} /> Playing {activeSound} sounds...
           </div>
        )}
      </Card>

      {/* Mood Tracker */}
      <div className="space-y-4">
         <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider ml-1">Daily Check-in</h3>
         <div className="glass-card p-5 rounded-3xl flex justify-between items-center">
            {['😫', '😕', '😐', '🙂', '🤩'].map((emoji, idx) => (
               <button 
                  key={idx}
                  onClick={() => setMood(emoji)}
                  className={`text-3xl transition-transform hover:scale-125 p-2 rounded-full ${mood === emoji ? 'bg-white/10 scale-125 ring-2 ring-blue-400' : 'opacity-50 hover:opacity-100'}`}
               >
                  {emoji}
               </button>
            ))}
         </div>
      </div>

      {/* Daily Affirmation */}
      <div className="relative group cursor-pointer" onClick={newAffirmation}>
         <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
         <div className="glass-card p-6 rounded-3xl border border-pink-500/20 relative text-center">
            <Heart size={20} className="text-pink-400 mx-auto mb-3 fill-current" />
            <p className="text-lg font-serif italic text-pink-100">"{affirmation}"</p>
            <div className="mt-3 text-xs text-pink-400/60 flex items-center justify-center gap-1">
               <RefreshCw size={10} /> Tap for new affirmation
            </div>
         </div>
      </div>
    </div>
  );
};
