

import React, { useState } from 'react';
import { UserRole, AppView, User } from './types';
import { BottomNav, Header, Button, Card } from './components/Layout';
import { StudentDashboard, ParentDashboard, CollegeDashboard } from './components/Dashboards';
import { StudyTimer, AIPlanner, AssignmentsList, LearningSwipe } from './components/StudentFeatures';
import { ChatInterface } from './components/ChatInterface';
import { AttendanceMarker, MarksUpload, NoticeManager, LeaveApproval } from './components/CollegeFeatures';
import { StudyTwin } from './components/StudyTwin';
import { Timetable } from './components/Timetable';
import { StressManagement } from './components/StressManagement';
import { SmartStudy } from './components/SmartStudy';
import { Gamification } from './components/Gamification';
import { LogOut, GraduationCap, Users, Building2, ChevronRight, User as UserIcon, ArrowLeft, KeyRound, Hash, BookOpen, ShieldCheck } from 'lucide-react';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  
  // Login State
  const [loginStep, setLoginStep] = useState<'ROLE' | 'FORM' | 'OTP'>('ROLE');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    name: '',
    id: '',       
    section: '', 
    phone: '',
    password: ''
  });
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setLoginStep('FORM');
    // Reset form
    setLoginForm({ name: '', id: '', section: '', phone: '', password: '' });
    setOtp(['', '', '', '']);
  };

  const handleBackToRoles = () => {
    setLoginStep('ROLE');
    setSelectedRole(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API check then move to OTP
    setTimeout(() => {
      setIsLoading(false);
      setLoginStep('OTP');
    }, 800);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus next
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate OTP verification
    setTimeout(() => {
      // Create user from form data or fallback to mock
      const name = loginForm.name || (selectedRole === UserRole.STUDENT ? 'Alex Johnson' : selectedRole === UserRole.PARENT ? 'Mrs. Johnson' : 'Admin Staff');
      
      const newUser: User = {
        id: loginForm.id || '1',
        name: name,
        role: selectedRole!,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4F46E5&color=fff`,
        level: 12,
        xp: 2320,
        maxXp: 3000
      };

      setCurrentUser(newUser);
      setCurrentView(AppView.DASHBOARD);
      setIsLoading(false);
    }, 1200);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView(AppView.DASHBOARD);
    setLoginStep('ROLE');
    setSelectedRole(null);
  };

  // --- Render Login Logic ---
  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="z-10 w-full max-w-sm">
          
          {/* Header Section */}
          <div className="text-center space-y-3 mb-10">
            <div className="inline-flex p-5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl shadow-2xl shadow-blue-500/20 mb-4 transform hover:scale-105 transition-transform duration-300 ring-1 ring-white/10">
               <GraduationCap size={44} className="text-white drop-shadow-md" />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">EduTrackr</h1>
            <p className="text-blue-200/80 font-medium">Your academic progress, simplified.</p>
          </div>

          {/* Role Selection Step */}
          {loginStep === 'ROLE' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <p className="text-xs font-bold text-blue-300/50 uppercase tracking-widest text-center mb-6">Select your role</p>
              
              <button 
                onClick={() => handleRoleSelect(UserRole.STUDENT)}
                className="w-full flex items-center justify-between p-4 glass-card rounded-2xl group hover:bg-white/5 transition-all duration-300 border-white/5 hover:border-blue-500/30"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                    <UserIcon size={26} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg text-white group-hover:text-blue-200 transition-colors">Student</h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300">Access schedule & tasks</p>
                  </div>
                </div>
                <ChevronRight className="text-gray-600 group-hover:text-blue-400 transition-transform group-hover:translate-x-1" />
              </button>

              <button 
                onClick={() => handleRoleSelect(UserRole.PARENT)}
                className="w-full flex items-center justify-between p-4 glass-card rounded-2xl group hover:bg-white/5 transition-all duration-300 border-white/5 hover:border-purple-500/30"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
                    <Users size={26} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg text-white group-hover:text-purple-200 transition-colors">Parent</h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300">Monitor progress</p>
                  </div>
                </div>
                <ChevronRight className="text-gray-600 group-hover:text-purple-400 transition-transform group-hover:translate-x-1" />
              </button>

              <button 
                onClick={() => handleRoleSelect(UserRole.COLLEGE)}
                className="w-full flex items-center justify-between p-4 glass-card rounded-2xl group hover:bg-white/5 transition-all duration-300 border-white/5 hover:border-indigo-500/30"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                    <Building2 size={26} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg text-white group-hover:text-indigo-200 transition-colors">College</h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300">Manage records</p>
                  </div>
                </div>
                <ChevronRight className="text-gray-600 group-hover:text-indigo-400 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}

          {/* Form Step */}
          {loginStep === 'FORM' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
               <button 
                  onClick={handleBackToRoles}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-2 pl-1"
               >
                  <ArrowLeft size={18} /> Back to Roles
               </button>

               <div className="glass-card p-8 rounded-3xl">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    {selectedRole === UserRole.STUDENT && 'Student Login'}
                    {selectedRole === UserRole.PARENT && 'Parent Login'}
                    {selectedRole === UserRole.COLLEGE && 'Staff Login'}
                  </h2>
                  
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    
                    {/* --- STUDENT FIELDS --- */}
                    {selectedRole === UserRole.STUDENT && (
                      <>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-blue-300/70 uppercase ml-1 tracking-wider">Student Name</label>
                          <div className="relative group">
                            <input 
                              type="text" 
                              required
                              placeholder="Enter your full name"
                              value={loginForm.name}
                              onChange={e => setLoginForm({...loginForm, name: e.target.value})}
                              className="w-full pl-11 pr-4 py-3.5 bg-black/20 border border-white/10 text-white rounded-xl focus:border-blue-500 focus:bg-black/30 outline-none transition-all placeholder-gray-500"
                            />
                            <UserIcon size={20} className="absolute left-3.5 top-3.5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-blue-300/70 uppercase ml-1 tracking-wider">College ID</label>
                          <div className="relative group">
                            <input 
                              type="text" 
                              required
                              placeholder="e.g. STU-2023-089"
                              value={loginForm.id}
                              onChange={e => setLoginForm({...loginForm, id: e.target.value})}
                              className="w-full pl-11 pr-4 py-3.5 bg-black/20 border border-white/10 text-white rounded-xl focus:border-blue-500 focus:bg-black/30 outline-none transition-all uppercase placeholder-gray-500"
                            />
                            <Hash size={20} className="absolute left-3.5 top-3.5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-blue-300/70 uppercase ml-1 tracking-wider">Class Section</label>
                          <div className="relative group">
                            <input 
                              type="text" 
                              required
                              placeholder="e.g. 12-A"
                              value={loginForm.section}
                              onChange={e => setLoginForm({...loginForm, section: e.target.value})}
                              className="w-full pl-11 pr-4 py-3.5 bg-black/20 border border-white/10 text-white rounded-xl focus:border-blue-500 focus:bg-black/30 outline-none transition-all placeholder-gray-500"
                            />
                            <BookOpen size={20} className="absolute left-3.5 top-3.5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                          </div>
                        </div>
                      </>
                    )}

                    {/* --- PARENT FIELDS --- */}
                    {selectedRole === UserRole.PARENT && (
                      <>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-purple-300/70 uppercase ml-1 tracking-wider">Parent Name</label>
                          <div className="relative group">
                            <input 
                              type="text" 
                              required
                              placeholder="Enter your name"
                              value={loginForm.name}
                              onChange={e => setLoginForm({...loginForm, name: e.target.value})}
                              className="w-full pl-11 pr-4 py-3.5 bg-black/20 border border-white/10 text-white rounded-xl focus:border-purple-500 focus:bg-black/30 outline-none transition-all placeholder-gray-500"
                            />
                            <UserIcon size={20} className="absolute left-3.5 top-3.5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-purple-300/70 uppercase ml-1 tracking-wider">Phone Number</label>
                          <input 
                            type="tel" 
                            required
                            placeholder="+91 98765 43210"
                            value={loginForm.phone}
                            onChange={e => setLoginForm({...loginForm, phone: e.target.value})}
                            className="w-full px-4 py-3.5 bg-black/20 border border-white/10 text-white rounded-xl focus:border-purple-500 focus:bg-black/30 outline-none transition-all placeholder-gray-500"
                          />
                        </div>
                      </>
                    )}

                    {/* --- COLLEGE FIELDS --- */}
                    {selectedRole === UserRole.COLLEGE && (
                      <>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-indigo-300/70 uppercase ml-1 tracking-wider">Employee ID</label>
                          <div className="relative group">
                            <input 
                              type="text" 
                              required
                              placeholder="e.g. EMP-001"
                              value={loginForm.id}
                              onChange={e => setLoginForm({...loginForm, id: e.target.value})}
                              className="w-full pl-11 pr-4 py-3.5 bg-black/20 border border-white/10 text-white rounded-xl focus:border-indigo-500 focus:bg-black/30 outline-none transition-all uppercase placeholder-gray-500"
                            />
                            <UserIcon size={20} className="absolute left-3.5 top-3.5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-indigo-300/70 uppercase ml-1 tracking-wider">Password</label>
                          <div className="relative group">
                            <input 
                              type="password" 
                              required
                              placeholder="••••••••"
                              value={loginForm.password}
                              onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                              className="w-full pl-11 pr-4 py-3.5 bg-black/20 border border-white/10 text-white rounded-xl focus:border-indigo-500 focus:bg-black/30 outline-none transition-all placeholder-gray-500"
                            />
                            <KeyRound size={20} className="absolute left-3.5 top-3.5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                          </div>
                        </div>
                      </>
                    )}

                    <Button 
                      type="submit"
                      disabled={isLoading}
                      className={`w-full mt-2`}
                    >
                       {isLoading ? 'Verifying...' : 'Send OTP'}
                    </Button>
                  </form>
               </div>
            </div>
          )}

          {/* OTP Step */}
          {loginStep === 'OTP' && (
            <div className="space-y-6 animate-in fade-in zoom-in duration-500">
               <button 
                  onClick={() => setLoginStep('FORM')}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-2 pl-1"
               >
                  <ArrowLeft size={18} /> Back to Details
               </button>

               <div className="glass-card p-8 rounded-3xl text-center">
                  <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mb-6 border border-blue-500/20">
                     <ShieldCheck size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Enter verification code</h2>
                  <p className="text-gray-400 text-sm mb-8">We've sent a 4-digit code to your registered number ending in **89</p>
                  
                  <form onSubmit={handleOtpSubmit} className="space-y-6">
                    <div className="flex justify-center gap-4">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={e => handleOtpChange(index, e.target.value)}
                          className="w-14 h-16 text-center text-2xl font-bold bg-black/20 border border-white/10 rounded-2xl focus:border-blue-500 focus:bg-black/30 outline-none transition-all text-white caret-blue-500"
                        />
                      ))}
                    </div>

                    <Button 
                      type="submit"
                      disabled={isLoading || otp.some(d => !d)}
                      className="w-full"
                    >
                       {isLoading ? 'Authenticating...' : 'Verify & Login'}
                    </Button>

                    <p className="text-xs text-gray-500">Didn't receive code? <button type="button" className="text-blue-400 font-semibold hover:text-blue-300">Resend</button></p>
                  </form>
               </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  // --- Main App Logic ---
  const renderContent = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        if (currentUser.role === UserRole.STUDENT) return <StudentDashboard />;
        if (currentUser.role === UserRole.PARENT) return <ParentDashboard />;
        if (currentUser.role === UserRole.COLLEGE) return <CollegeDashboard onNavigate={setCurrentView} />;
        return <div>Unknown Role</div>;
      
      case AppView.TIMETABLE:
        return <Timetable />;

      case AppView.TIMER:
        return <StudyTimer />;
      
      case AppView.AI_PLANNER:
        return <AIPlanner />;

      case AppView.ASSIGNMENTS:
        return <AssignmentsList />;

      case AppView.MESSAGES:
        return <ChatInterface />;

      case AppView.STUDY_TWIN:
        return <StudyTwin />;
        
      case AppView.STRESS_MANAGEMENT:
        return <StressManagement />;

      case AppView.SMART_STUDY:
        return <SmartStudy />;

      case AppView.GAMIFICATION:
        return <Gamification />;

      case AppView.LEARNING_SWIPE:
        return <LearningSwipe />;

      // College Admin Views
      case AppView.COLLEGE_ATTENDANCE:
        return <AttendanceMarker />;
      
      case AppView.COLLEGE_MARKS:
        return <MarksUpload />;
      
      case AppView.COLLEGE_NOTICES:
        return <NoticeManager />;
      
      case AppView.COLLEGE_LEAVES:
        return <LeaveApproval />;
      
      case AppView.COLLEGE_UPLOAD:
        return <MarksUpload />; 

      case AppView.PROFILE:
        return (
           <div className="space-y-4">
              <Card className="flex items-center gap-5">
                 <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden border-2 border-white/10 shadow-lg">
                    <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
                 </div>
                 <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">{currentUser.name}</h2>
                    <p className="text-sm text-gray-400 font-medium">{currentUser.role} • ID: {currentUser.id}</p>
                 </div>
              </Card>
              <Button variant="outline" onClick={handleLogout} className="w-full border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/40">
                 <LogOut size={18} /> Log Out
              </Button>
           </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <p>Work in Progress</p>
            <Button variant="secondary" onClick={() => setCurrentView(AppView.DASHBOARD)} className="mt-4">
              Go Back Home
            </Button>
          </div>
        );
    }
  };

  const getPageTitle = () => {
    switch (currentView) {
      case AppView.DASHBOARD: return 'Dashboard';
      case AppView.TIMETABLE: return 'Schedule';
      case AppView.TIMER: return 'Focus Timer';
      case AppView.AI_PLANNER: return 'Study Plan';
      case AppView.ASSIGNMENTS: return 'Assignments';
      case AppView.MESSAGES: return 'Messages';
      case AppView.STUDY_TWIN: return 'StudyTwin';
      case AppView.STRESS_MANAGEMENT: return 'Wellness';
      case AppView.SMART_STUDY: return 'Smart Tools';
      case AppView.GAMIFICATION: return 'Rankings';
      case AppView.LEARNING_SWIPE: return 'Daily Learning';
      case AppView.PROFILE: return 'Profile';
      case AppView.COLLEGE_ATTENDANCE: return 'Attendance';
      case AppView.COLLEGE_MARKS: return 'Upload Marks';
      case AppView.COLLEGE_NOTICES: return 'Notices';
      case AppView.COLLEGE_LEAVES: return 'Leave Requests';
      case AppView.COLLEGE_UPLOAD: return 'Manage';
      default: return 'EduTrackr';
    }
  };

  return (
    <div className="min-h-screen pb-24 max-w-md mx-auto shadow-2xl overflow-hidden relative">
      <Header 
        title={getPageTitle()} 
        subtitle={currentView === AppView.DASHBOARD ? `Welcome, ${currentUser.name.split(' ')[0]}` : undefined}
        user={currentUser} 
      />
      
      <main className="p-6">
        {renderContent()}
      </main>

      <BottomNav 
        currentView={currentView} 
        role={currentUser.role} 
        onNavigate={setCurrentView} 
      />
    </div>
  );
}

export default App;