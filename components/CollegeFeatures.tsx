import React, { useState } from 'react';
import { Card, Button } from './Layout';
import { User, Check, X, Send, FileText, Upload, Calendar } from 'lucide-react';

// Mock Data
const STUDENTS = [
  { id: '1', name: 'Alex Johnson', roll: '45' },
  { id: '2', name: 'Sarah Smith', roll: '46' },
  { id: '3', name: 'Michael Brown', roll: '47' },
  { id: '4', name: 'Emily Davis', roll: '48' },
];

export const AttendanceMarker: React.FC = () => {
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  // Initialize attendance to true (present) by default
  useState(() => {
    const initial: Record<string, boolean> = {};
    STUDENTS.forEach(s => initial[s.id] = true);
    setAttendance(initial);
  });

  const toggleAttendance = (id: string) => {
    setAttendance(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-4">
      <Card title="Mark Attendance" subtitle="Class 12-A • Oct 24, 2023" className="border-t-4 border-t-blue-600">
        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
          {STUDENTS.map(student => (
            <div key={student.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-800 border-2 border-gray-600 rounded-full flex items-center justify-center text-gray-400 font-bold shadow-sm">
                  {student.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gray-200">{student.name}</div>
                  <div className="text-xs text-gray-400">Roll No. {student.roll}</div>
                </div>
              </div>
              <button
                onClick={() => toggleAttendance(student.id)}
                className={`w-12 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  attendance[student.id] 
                    ? 'bg-green-900/30 text-green-400 border border-green-800' 
                    : 'bg-red-900/30 text-red-400 border border-red-800'
                }`}
              >
                {attendance[student.id] ? <span className="text-xs font-bold">P</span> : <span className="text-xs font-bold">A</span>}
              </button>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-700">
           <Button onClick={handleSubmit} className={`w-full ${submitted ? 'bg-green-600 hover:bg-green-700' : ''}`}>
             {submitted ? 'Attendance Saved!' : 'Submit Attendance'}
           </Button>
        </div>
      </Card>
    </div>
  );
};

export const MarksUpload: React.FC = () => {
  const [exam, setExam] = useState('Mid-Term');
  const [subject, setSubject] = useState('Physics');
  const [marks, setMarks] = useState<Record<string, string>>({});

  const handleMarkChange = (id: string, value: string) => {
    setMarks(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="space-y-4">
      <Card title="Upload Marks" className="border-t-4 border-t-indigo-600">
        <div className="grid grid-cols-2 gap-4 mb-6">
           <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Exam Type</label>
              <div className="relative">
                <select 
                  value={exam} onChange={(e) => setExam(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 text-gray-200 rounded-xl text-sm appearance-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                >
                  <option>Mid-Term</option>
                  <option>Finals</option>
                  <option>Unit Test 1</option>
                </select>
                <div className="absolute right-3 top-3 pointer-events-none text-gray-400">▼</div>
              </div>
           </div>
           <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Subject</label>
              <div className="relative">
                <select 
                  value={subject} onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 text-gray-200 rounded-xl text-sm appearance-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                >
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Mathematics</option>
                  <option>English</option>
                </select>
                <div className="absolute right-3 top-3 pointer-events-none text-gray-400">▼</div>
              </div>
           </div>
        </div>

        <div className="space-y-3 bg-gray-700 p-4 rounded-2xl">
          {STUDENTS.map(student => (
            <div key={student.id} className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-200">{student.name}</span>
                <span className="text-xs text-gray-400">Roll: {student.roll}</span>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  placeholder="0"
                  value={marks[student.id] || ''}
                  onChange={(e) => handleMarkChange(student.id, e.target.value)}
                  className="w-20 p-2 text-center bg-gray-800 border border-gray-600 text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all font-mono font-bold"
                />
                <span className="text-gray-500 text-xs font-medium">/100</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
           <Button className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 shadow-indigo-900/40"><Upload size={18} /> Publish Results</Button>
        </div>
      </Card>
    </div>
  );
};

export const NoticeManager: React.FC = () => {
  const [notices, setNotices] = useState([
    { id: 1, title: 'Holiday Declaration', date: 'Oct 20', active: true },
    { id: 2, title: 'Exam Schedule Released', date: 'Oct 18', active: true },
  ]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSend = () => {
    if(!title) return;
    setNotices([{ id: Date.now(), title, date: 'Today', active: true }, ...notices]);
    setTitle('');
    setContent('');
  };

  return (
    <div className="space-y-6">
       <Card title="Compose Notice" className="border-t-4 border-t-amber-500">
          <div className="space-y-4">
             <div className="space-y-1">
               <label className="text-xs font-bold text-gray-500 uppercase ml-1">Title</label>
               <input 
                  type="text" 
                  placeholder="e.g., Annual Sports Day"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all placeholder-gray-400"
               />
             </div>
             <div className="space-y-1">
               <label className="text-xs font-bold text-gray-500 uppercase ml-1">Message Body</label>
               <textarea 
                  placeholder="Type the full details of the notice here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-xl h-32 resize-none outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all placeholder-gray-400"
               ></textarea>
             </div>
             <Button onClick={handleSend} className="w-full gap-2 bg-amber-600 hover:bg-amber-700 text-white shadow-amber-900/40">
                <Send size={18} /> Send to All Students
             </Button>
          </div>
       </Card>

       <Card title="Notice History">
          <div className="space-y-3">
             {notices.map(notice => (
                <div key={notice.id} className="flex items-center justify-between p-3 bg-gray-800 border border-gray-700 rounded-xl shadow-sm">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-900/30 text-amber-500 rounded-lg">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-200 text-sm">{notice.title}</h4>
                        <p className="text-xs text-gray-500">{notice.date}</p>
                      </div>
                   </div>
                   <span className="px-2 py-1 bg-green-900/30 text-green-400 text-[10px] font-bold uppercase tracking-wide rounded">Active</span>
                </div>
             ))}
          </div>
       </Card>
    </div>
  );
};

export const LeaveApproval: React.FC = () => {
  const [requests, setRequests] = useState([
    { id: 1, name: 'Sarah Smith', reason: 'Medical (Fever)', days: '2 Days', dates: '24-25 Oct', status: 'PENDING' },
    { id: 2, name: 'John Doe', reason: 'Family Function', days: '1 Day', dates: '28 Oct', status: 'PENDING' },
    { id: 3, name: 'Emily Davis', reason: 'Personal', days: '3 Days', dates: '1-3 Nov', status: 'PENDING' },
  ]);

  const handleAction = (id: number, status: string) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <div className="space-y-4">
       <div className="flex items-center justify-between px-2">
         <h2 className="font-bold text-gray-500 uppercase text-xs tracking-wider">Pending Requests ({requests.filter(r => r.status === 'PENDING').length})</h2>
       </div>

       {requests.map(req => (
          <Card key={req.id} className={`border-l-4 ${req.status === 'PENDING' ? 'border-l-purple-500' : req.status === 'APPROVED' ? 'border-l-green-500' : 'border-l-red-500'} ${req.status !== 'PENDING' ? 'opacity-60 grayscale-[0.5]' : ''}`}>
             <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-gradient-to-br from-purple-900 to-blue-900 text-purple-400 rounded-full flex items-center justify-center font-bold text-lg shadow-inner border border-purple-500/30">
                      {req.name.charAt(0)}
                   </div>
                   <div>
                      <h3 className="font-bold text-gray-200">{req.name}</h3>
                      <p className="text-xs text-gray-400 font-medium">{req.reason}</p>
                   </div>
                </div>
                <div className="text-right">
                   <span className="block text-sm font-bold text-gray-200">{req.days}</span>
                   <span className="text-[10px] text-gray-500">{req.dates}</span>
                </div>
             </div>
             
             {req.status === 'PENDING' ? (
                <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-gray-700">
                   <button 
                      onClick={() => handleAction(req.id, 'REJECTED')}
                      className="py-2.5 rounded-xl border border-red-900/50 bg-red-900/10 text-red-500 font-bold text-sm hover:bg-red-900/30 transition-colors flex items-center justify-center gap-2"
                   >
                      <X size={16} /> Reject
                   </button>
                   <button 
                      onClick={() => handleAction(req.id, 'APPROVED')}
                      className="py-2.5 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 shadow-lg shadow-purple-900/40 transition-all flex items-center justify-center gap-2"
                   >
                      <Check size={16} /> Approve
                   </button>
                </div>
             ) : (
                <div className={`mt-2 py-1 text-center text-xs font-bold uppercase tracking-widest rounded-lg ${req.status === 'APPROVED' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                   {req.status}
                </div>
             )}
          </Card>
       ))}
       {requests.length === 0 && (
          <div className="text-center text-gray-500 py-10 bg-gray-800 rounded-2xl border border-dashed border-gray-700">
            <Check size={32} className="mx-auto mb-2 text-gray-600" />
            <p>All caught up!</p>
          </div>
       )}
    </div>
  );
};