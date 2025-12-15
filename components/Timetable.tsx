import React, { useState } from 'react';
import { Card } from './Layout';
import { Clock, MapPin, User, ChevronRight, Calendar } from 'lucide-react';

type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';

interface ClassSession {
  id: string;
  subject: string;
  time: string;
  duration: string;
  room: string;
  teacher: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
  status: 'COMPLETED' | 'LIVE' | 'UPCOMING';
}

const WEEK_SCHEDULE: Record<DayOfWeek, ClassSession[]> = {
  'Mon': [
    { id: '1', subject: 'Physics', time: '09:00 AM', duration: '1h', room: 'Room 301', teacher: 'Dr. Smith', type: 'Lecture', status: 'COMPLETED' },
    { id: '2', subject: 'Calculus II', time: '10:15 AM', duration: '1.5h', room: 'Room 104', teacher: 'Prof. Johnson', type: 'Lecture', status: 'LIVE' },
    { id: '3', subject: 'Computer Science', time: '01:00 PM', duration: '2h', room: 'Lab 2', teacher: 'Ms. Davis', type: 'Lab', status: 'UPCOMING' },
  ],
  'Tue': [
    { id: '4', subject: 'English Lit', time: '09:00 AM', duration: '1h', room: 'Room 205', teacher: 'Mr. White', type: 'Lecture', status: 'UPCOMING' },
    { id: '5', subject: 'Physics', time: '11:00 AM', duration: '1h', room: 'Room 301', teacher: 'Dr. Smith', type: 'Lecture', status: 'UPCOMING' },
  ],
  'Wed': [
    { id: '6', subject: 'Chemistry', time: '10:00 AM', duration: '1.5h', room: 'Lab 1', teacher: 'Mrs. Green', type: 'Lab', status: 'UPCOMING' },
    { id: '7', subject: 'History', time: '02:00 PM', duration: '1h', room: 'Room 402', teacher: 'Mr. Black', type: 'Lecture', status: 'UPCOMING' },
  ],
  'Thu': [
    { id: '8', subject: 'Calculus II', time: '09:00 AM', duration: '1h', room: 'Room 104', teacher: 'Prof. Johnson', type: 'Tutorial', status: 'UPCOMING' },
    { id: '9', subject: 'Computer Science', time: '10:30 AM', duration: '1h', room: 'Room 201', teacher: 'Ms. Davis', type: 'Lecture', status: 'UPCOMING' },
  ],
  'Fri': [
    { id: '10', subject: 'Physical Ed', time: '08:00 AM', duration: '1h', room: 'Field A', teacher: 'Coach T', type: 'Lecture', status: 'UPCOMING' },
    { id: '11', subject: 'Library', time: '10:00 AM', duration: '2h', room: 'Main Lib', teacher: '-', type: 'Tutorial', status: 'UPCOMING' },
  ]
};

export const Timetable: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(() => {
    const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = dayMap[new Date().getDay()];
    // If today is weekend, default to Monday, else use today
    return (['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(today)) ? (today as DayOfWeek) : 'Mon';
  });

  return (
    <div className="space-y-6">
      {/* Header Date Display */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Weekly Schedule</h2>
          <p className="text-gray-400 text-sm">Oct 24 - Oct 28, 2023</p>
        </div>
        <div className="p-2 bg-blue-900/30 text-blue-400 rounded-xl">
           <Calendar size={24} />
        </div>
      </div>

      {/* Day Selector */}
      <div className="flex justify-between bg-gray-800 p-1.5 rounded-2xl shadow-sm border border-gray-700 overflow-x-auto no-scrollbar">
        {(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as DayOfWeek[]).map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-3 rounded-xl text-sm font-bold transition-all min-w-[64px] ${
              selectedDay === day 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/50' 
                : 'text-gray-400 hover:bg-gray-700'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule List */}
      <div className="space-y-4">
        {WEEK_SCHEDULE[selectedDay].length > 0 ? (
          WEEK_SCHEDULE[selectedDay].map((session, index) => (
            <div 
              key={session.id} 
              className={`relative flex gap-4 p-4 rounded-2xl border transition-all ${
                session.status === 'LIVE' 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-900/40 scale-[1.02]' 
                  : 'bg-gray-800 text-gray-200 border-gray-700 shadow-sm'
              }`}
            >
              {/* Timeline Line */}
              {index !== WEEK_SCHEDULE[selectedDay].length - 1 && (
                <div className="absolute left-[2.35rem] top-16 bottom-[-20px] w-0.5 border-l-2 border-dashed border-gray-700 z-0"></div>
              )}

              {/* Time Column */}
              <div className="flex flex-col items-center min-w-[3.5rem] z-10">
                <span className={`text-sm font-bold ${session.status === 'LIVE' ? 'text-white' : 'text-gray-200'}`}>
                  {session.time.split(' ')[0]}
                </span>
                <span className={`text-[10px] ${session.status === 'LIVE' ? 'text-blue-200' : 'text-gray-500'}`}>
                  {session.time.split(' ')[1]}
                </span>
                <div className={`mt-2 w-2 h-2 rounded-full ${session.status === 'LIVE' ? 'bg-white' : 'bg-gray-600'}`}></div>
              </div>

              {/* Content Column */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg">{session.subject}</h3>
                  {session.status === 'LIVE' && (
                    <span className="px-2 py-0.5 bg-white/20 rounded text-[10px] font-bold uppercase tracking-wider animate-pulse">
                      Now
                    </span>
                  )}
                </div>
                
                <div className={`flex flex-wrap gap-x-4 gap-y-2 text-sm ${session.status === 'LIVE' ? 'text-blue-100' : 'text-gray-400'}`}>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    <span>{session.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    <span>{session.room}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User size={14} />
                    <span>{session.teacher}</span>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              {session.status !== 'COMPLETED' && (
                 <div className="flex flex-col justify-center text-current opacity-50">
                    <ChevronRight size={20} />
                 </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-gray-800 rounded-2xl border border-dashed border-gray-700">
            <p className="text-gray-500">No classes scheduled for this day.</p>
          </div>
        )}
      </div>
    </div>
  );
};