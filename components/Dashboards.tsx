import React from 'react';
import { Card } from './Layout';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { User, Bell, AlertTriangle, FileText, CheckCircle, TrendingUp, Calendar, Timer, Upload } from 'lucide-react';
import { AppView } from '../types';

// --- Shared Data ---
const attendanceData = [
  { name: 'Present', value: 85, color: '#3B82F6' },
  { name: 'Absent', value: 15, color: '#374151' },
];

const marksData = [
  { name: 'Test 1', marks: 65 },
  { name: 'Test 2', marks: 72 },
  { name: 'Mid', marks: 85 },
  { name: 'Test 3', marks: 82 },
  { name: 'Final', marks: 90 },
];

// Helper to get a future date for demo purposes
const getFutureDate = (daysToAdd: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const upcomingExams = [
  { id: 1, name: 'Physics Mid-Term', date: getFutureDate(5), subject: 'Physics' },
  { id: 2, name: 'Calculus Final', date: getFutureDate(14), subject: 'Mathematics' },
];

// --- Student Dashboard ---
export const StudentDashboard: React.FC = () => {
  // Calculate days left for the next exam
  const nextExam = upcomingExams[0];
  const calculateDaysLeft = (dateString: string) => {
    const examDate = new Date(dateString);
    const today = new Date();
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = calculateDaysLeft(nextExam.date);

  return (
    <div className="space-y-6">
      {/* Attendance Summary */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="flex flex-col items-center justify-center p-4">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Attendance</h3>
          <div className="h-24 w-24 relative">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={attendanceData}
                   innerRadius={35}
                   outerRadius={45}
                   paddingAngle={5}
                   dataKey="value"
                   stroke="none"
                 >
                   {attendanceData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
               </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-100">85%</span>
             </div>
          </div>
          <span className="text-xs text-green-400 bg-green-900/20 px-2 py-1 rounded-full mt-2">Good Standing</span>
        </Card>

        <Card className="flex flex-col justify-between p-4">
          <div>
            <h3 className="text-gray-400 text-sm font-medium">Study Streak</h3>
            <div className="text-3xl font-bold text-gray-100 mt-1">12 <span className="text-base font-normal text-gray-500">days</span></div>
          </div>
          <div className="flex gap-1 mt-3">
             {[1,1,1,1,0,1,1].map((d, i) => (
               <div key={i} className={`h-8 w-full rounded-md ${d ? 'bg-blue-600' : 'bg-gray-700'}`}></div>
             ))}
          </div>
        </Card>
      </div>

      {/* Exam Countdown Timer */}
      <Card className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white border-none relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        
        <div className="flex items-center justify-between relative z-10">
          <div>
            <div className="flex items-center gap-2 text-blue-100 mb-1">
              <Timer size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">Exam Countdown</span>
            </div>
            <h3 className="text-xl font-bold">{nextExam.name}</h3>
            <p className="text-blue-100 text-sm">{nextExam.subject}</p>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3 min-w-[80px]">
            <span className="text-3xl font-bold block leading-none">{daysLeft}</span>
            <span className="text-[10px] uppercase font-medium text-blue-100">Days Left</span>
          </div>
        </div>
      </Card>

      {/* Marks Chart */}
      <Card title="Performance Trend">
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={marksData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} dy={10} />
              <YAxis hide domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: '#1F2937', color: '#F3F4F6', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)' }} 
                cursor={{ stroke: '#374151', strokeWidth: 2 }} 
              />
              <Line 
                type="monotone" 
                dataKey="marks" 
                stroke="#3B82F6" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#111827' }} 
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Upcoming Exams List */}
      <Card title="Upcoming Exams">
        <div className="space-y-4">
          {upcomingExams.map((exam) => (
            <div key={exam.id} className="flex items-center p-3 bg-blue-900/20 rounded-xl border border-blue-800/50">
               <div className="p-3 bg-gray-800 text-blue-400 rounded-lg shadow-sm mr-4 flex-shrink-0">
                  <Calendar size={20} />
               </div>
               <div className="flex-1">
                  <h4 className="font-bold text-gray-200">{exam.name}</h4>
                  <p className="text-xs text-gray-400 font-medium">{exam.subject}</p>
               </div>
               <div className="text-right">
                  <span className="text-sm font-bold text-blue-400 block">{exam.date.split(',')[0]}</span>
                  <span className="text-xs text-gray-500">{exam.date.split(',')[1]}</span>
               </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Notifications / Next Class */}
      <Card title="Next Up">
         <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-900/30 text-indigo-400 rounded-xl">
               <Bell size={24} />
            </div>
            <div>
               <h4 className="font-bold text-gray-200">Physics Laboratory</h4>
               <p className="text-sm text-gray-400">Room 302 • 10:00 AM</p>
            </div>
         </div>
      </Card>
    </div>
  );
};

// --- Parent Dashboard ---
export const ParentDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
       {/* Child Status Banner */}
       <div className="bg-blue-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-900/40">
          <div className="flex items-center gap-4 mb-4">
             <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <User size={24} className="text-white" />
             </div>
             <div>
                <h2 className="text-xl font-bold">Alex Johnson</h2>
                <p className="text-blue-200 text-sm">Class 12-A • Roll No. 45</p>
             </div>
          </div>
          <div className="grid grid-cols-3 gap-4 border-t border-blue-500/30 pt-4">
             <div className="text-center">
                <div className="text-2xl font-bold">85%</div>
                <div className="text-xs text-blue-200">Attendance</div>
             </div>
             <div className="text-center border-l border-blue-500/30">
                <div className="text-2xl font-bold">A</div>
                <div className="text-xs text-blue-200">Avg Grade</div>
             </div>
             <div className="text-center border-l border-blue-500/30">
                <div className="text-2xl font-bold">0</div>
                <div className="text-xs text-blue-200">Remarks</div>
             </div>
          </div>
       </div>

       <Card title="Recent Activity">
          <div className="space-y-4">
             <div className="flex items-start gap-3">
                <AlertTriangle size={18} className="text-amber-500 mt-1" />
                <div>
                   <p className="text-sm text-gray-200"><span className="font-bold">Absent</span> for Chemistry Class</p>
                   <p className="text-xs text-gray-500">Today, 09:30 AM</p>
                </div>
             </div>
             <div className="flex items-start gap-3">
                <TrendingUp size={18} className="text-green-500 mt-1" />
                <div>
                   <p className="text-sm text-gray-200">Scored <span className="font-bold">92/100</span> in Math Test</p>
                   <p className="text-xs text-gray-500">Yesterday</p>
                </div>
             </div>
          </div>
       </Card>

       <Card title="Upcoming Exams">
          <div className="space-y-3">
             <div className="bg-gray-700/50 p-3 rounded-xl flex justify-between items-center border border-gray-700">
                <div>
                   <h4 className="font-bold text-gray-200">Physics Mid-Term</h4>
                   <p className="text-xs text-gray-400">Chapter 1-5</p>
                </div>
                <div className="text-right">
                   <div className="text-sm font-bold text-blue-400">Oct 24</div>
                   <div className="text-xs text-gray-500">Monday</div>
                </div>
             </div>
          </div>
       </Card>
    </div>
  );
};

// --- College Dashboard ---
interface DashboardProps {
  onNavigate?: (view: AppView) => void;
}

export const CollegeDashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
       <div className="grid grid-cols-2 gap-4">
          <Card className="bg-blue-700 text-white border-none">
             <div className="text-3xl font-bold">1,240</div>
             <div className="text-blue-100 text-sm">Total Students</div>
          </Card>
          <Card>
             <div className="text-3xl font-bold text-gray-100">92%</div>
             <div className="text-gray-400 text-sm">Avg Attendance</div>
          </Card>
       </div>

       <Card title="Quick Actions">
          <div className="grid grid-cols-2 gap-4">
             <button 
                onClick={() => onNavigate?.(AppView.COLLEGE_ATTENDANCE)}
                className="flex flex-col items-center justify-center p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-colors active:scale-95 border border-gray-700/50"
             >
                <CheckCircle size={24} className="text-green-500 mb-2" />
                <span className="text-xs font-medium text-gray-300">Mark Attendance</span>
             </button>
             <button 
                onClick={() => onNavigate?.(AppView.COLLEGE_MARKS)}
                className="flex flex-col items-center justify-center p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-colors active:scale-95 border border-gray-700/50"
             >
                <FileText size={24} className="text-blue-500 mb-2" />
                <span className="text-xs font-medium text-gray-300">Upload Marks</span>
             </button>
             <button 
                onClick={() => onNavigate?.(AppView.COLLEGE_NOTICES)}
                className="flex flex-col items-center justify-center p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-colors active:scale-95 border border-gray-700/50"
             >
                <Bell size={24} className="text-amber-500 mb-2" />
                <span className="text-xs font-medium text-gray-300">Send Notice</span>
             </button>
             <button 
                onClick={() => onNavigate?.(AppView.COLLEGE_LEAVES)}
                className="flex flex-col items-center justify-center p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-colors active:scale-95 border border-gray-700/50"
             >
                <User size={24} className="text-purple-500 mb-2" />
                <span className="text-xs font-medium text-gray-300">Approve Leave</span>
             </button>
          </div>
       </Card>

       <Card title="Recent Leave Applications">
          <div className="space-y-3">
             <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                <div>
                   <p className="font-bold text-gray-200">Sarah Smith</p>
                   <p className="text-xs text-gray-500">Medical Reason • 2 Days</p>
                </div>
                <div className="flex gap-2">
                   <button 
                      onClick={() => onNavigate?.(AppView.COLLEGE_LEAVES)}
                      className="px-3 py-1 bg-green-900/30 text-green-400 text-xs font-bold rounded-lg border border-green-800/50"
                   >
                      View
                   </button>
                </div>
             </div>
             <div className="flex justify-between items-center">
                <div>
                   <p className="font-bold text-gray-200">John Doe</p>
                   <p className="text-xs text-gray-500">Family Function • 1 Day</p>
                </div>
                <div className="flex gap-2">
                   <button 
                      onClick={() => onNavigate?.(AppView.COLLEGE_LEAVES)}
                      className="px-3 py-1 bg-green-900/30 text-green-400 text-xs font-bold rounded-lg border border-green-800/50"
                   >
                      View
                   </button>
                </div>
             </div>
          </div>
       </Card>
    </div>
  );
};