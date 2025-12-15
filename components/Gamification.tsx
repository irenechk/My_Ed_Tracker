
import React, { useState } from 'react';
import { Card } from './Layout';
import { Trophy, Medal, Star, TrendingUp, TrendingDown, Crown, Shield } from 'lucide-react';
import { LeaderboardEntry, Badge } from '../types';

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { id: '1', rank: 1, name: 'Chloe Price', avatar: 'https://ui-avatars.com/api/?name=Chloe+Price&background=6366f1&color=fff', xp: 2450, trend: 'UP' },
  { id: '2', rank: 2, name: 'Alex Johnson', avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=2563EB&color=fff', xp: 2320, trend: 'SAME' }, // Current User
  { id: '3', rank: 3, name: 'Liam D.', avatar: 'https://ui-avatars.com/api/?name=Liam+D&background=f59e0b&color=fff', xp: 2100, trend: 'DOWN' },
  { id: '4', rank: 4, name: 'Sarah S.', avatar: 'https://ui-avatars.com/api/?name=Sarah+S&background=10b981&color=fff', xp: 1950, trend: 'UP' },
];

const MOCK_BADGES: Badge[] = [
  { id: '1', name: 'Early Bird', icon: '🌅', description: 'Complete a study session before 7 AM', unlocked: true },
  { id: '2', name: 'Quiz Master', icon: '🧠', description: 'Score 100% on 3 consecutive quizzes', unlocked: true },
  { id: '3', name: '7 Day Streak', icon: '🔥', description: 'Study for 7 days in a row', unlocked: true },
  { id: '4', name: 'Night Owl', icon: '🦉', description: 'Study past midnight', unlocked: false },
  { id: '5', name: 'Helper', icon: '🤝', description: 'Share notes with 5 friends', unlocked: false },
  { id: '6', name: 'Marathon', icon: '🏃', description: 'Study for 4 hours in one day', unlocked: false },
];

export const Gamification: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'LEADERBOARD' | 'BADGES'>('LEADERBOARD');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Toggle */}
      <div className="flex bg-gray-800 p-1 rounded-xl">
        <button 
          onClick={() => setActiveTab('LEADERBOARD')}
          className={`flex-1 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'LEADERBOARD' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
        >
          <Trophy size={16} /> Leaderboard
        </button>
        <button 
          onClick={() => setActiveTab('BADGES')}
          className={`flex-1 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'BADGES' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
        >
          <Medal size={16} /> Badges
        </button>
      </div>

      {activeTab === 'LEADERBOARD' && (
        <div className="space-y-3">
          {/* Top 3 Podium (Visual) */}
          <div className="flex items-end justify-center gap-4 mb-6 pt-4">
             {/* 2nd Place */}
             <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-4 border-gray-400 overflow-hidden mb-2 relative">
                   <img src={MOCK_LEADERBOARD[1].avatar} className="w-full h-full object-cover" />
                   <div className="absolute bottom-0 w-full bg-gray-400 text-[10px] text-center font-bold text-gray-900">2</div>
                </div>
                <div className="h-24 w-16 bg-gradient-to-t from-gray-800 to-gray-700 rounded-t-xl flex items-end justify-center pb-2 opacity-80">
                   <span className="text-gray-400 font-bold">2nd</span>
                </div>
             </div>
             {/* 1st Place */}
             <div className="flex flex-col items-center">
                <div className="relative">
                   <Crown size={24} className="text-yellow-400 absolute -top-8 left-1/2 -translate-x-1/2 animate-bounce" />
                   <div className="w-20 h-20 rounded-full border-4 border-yellow-400 overflow-hidden mb-2 relative shadow-yellow-500/20 shadow-lg">
                      <img src={MOCK_LEADERBOARD[0].avatar} className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 w-full bg-yellow-400 text-xs text-center font-bold text-yellow-900">1</div>
                   </div>
                </div>
                <div className="h-32 w-20 bg-gradient-to-t from-yellow-900/40 to-yellow-600/40 rounded-t-xl flex items-end justify-center pb-2 border-t border-yellow-500/30">
                   <span className="text-yellow-400 font-bold text-xl">1st</span>
                </div>
             </div>
             {/* 3rd Place */}
             <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-4 border-amber-700 overflow-hidden mb-2 relative">
                   <img src={MOCK_LEADERBOARD[2].avatar} className="w-full h-full object-cover" />
                   <div className="absolute bottom-0 w-full bg-amber-700 text-[10px] text-center font-bold text-amber-100">3</div>
                </div>
                <div className="h-20 w-16 bg-gradient-to-t from-gray-800 to-amber-900/30 rounded-t-xl flex items-end justify-center pb-2 opacity-80">
                   <span className="text-amber-600 font-bold">3rd</span>
                </div>
             </div>
          </div>

          {/* List */}
          {MOCK_LEADERBOARD.map((user) => (
             <div key={user.id} className={`flex items-center p-3 rounded-2xl border ${user.name === 'Alex Johnson' ? 'bg-blue-900/20 border-blue-500/50' : 'bg-gray-800 border-gray-700'}`}>
                <div className="w-8 font-bold text-gray-400 text-center">{user.rank}</div>
                <div className="w-10 h-10 rounded-full bg-gray-700 mr-3 overflow-hidden">
                   <img src={user.avatar} className="w-full h-full" />
                </div>
                <div className="flex-1">
                   <h4 className={`font-bold ${user.name === 'Alex Johnson' ? 'text-blue-400' : 'text-gray-200'}`}>{user.name}</h4>
                   <div className="text-xs text-gray-500">{user.xp} XP</div>
                </div>
                <div className="text-right">
                   {user.trend === 'UP' && <TrendingUp size={16} className="text-green-500" />}
                   {user.trend === 'DOWN' && <TrendingDown size={16} className="text-red-500" />}
                   {user.trend === 'SAME' && <span className="text-gray-600">-</span>}
                </div>
             </div>
          ))}
        </div>
      )}

      {activeTab === 'BADGES' && (
         <div className="grid grid-cols-2 gap-4">
            {MOCK_BADGES.map((badge) => (
               <div key={badge.id} className={`p-4 rounded-2xl border flex flex-col items-center text-center relative overflow-hidden group ${badge.unlocked ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gray-900 border-gray-800 opacity-60 grayscale'}`}>
                  {badge.unlocked && <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>}
                  <div className={`text-4xl mb-3 transform transition-transform ${badge.unlocked ? 'group-hover:scale-110 drop-shadow-md' : 'opacity-50'}`}>
                     {badge.icon}
                  </div>
                  <h3 className={`font-bold text-sm ${badge.unlocked ? 'text-gray-200' : 'text-gray-500'}`}>{badge.name}</h3>
                  <p className="text-[10px] text-gray-500 mt-1">{badge.description}</p>
                  {!badge.unlocked && (
                     <div className="absolute top-2 right-2">
                        <Shield size={12} className="text-gray-600" />
                     </div>
                  )}
               </div>
            ))}
         </div>
      )}
    </div>
  );
};
