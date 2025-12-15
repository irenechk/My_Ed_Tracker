import React from 'react';
import { UserRole, AppView, User } from '../types';
import { Home, BookOpen, Clock, MessageSquare, User as UserIcon, Briefcase, CalendarCheck, Sparkles, Calendar, Smile, Brain, Trophy, Users } from 'lucide-react';

interface BottomNavProps {
  currentView: AppView;
  role: UserRole;
  onNavigate: (view: AppView) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, role, onNavigate }) => {
  const getNavItems = () => {
    switch (role) {
      case UserRole.STUDENT:
        return [
          { view: AppView.DASHBOARD, icon: Home, label: 'Home' },
          { view: AppView.TIMETABLE, icon: Calendar, label: 'Schedule' },
          { view: AppView.SMART_STUDY, icon: Brain, label: 'Learn' },
          { view: AppView.STUDY_TWIN, icon: Users, label: 'Twin' },
          { view: AppView.STRESS_MANAGEMENT, icon: Smile, label: 'Wellness' },
        ];
      case UserRole.PARENT:
        return [
          { view: AppView.DASHBOARD, icon: Home, label: 'Overview' },
          { view: AppView.MESSAGES, icon: MessageSquare, label: 'Chat' },
          { view: AppView.LEAVES, icon: CalendarCheck, label: 'Leaves' },
          { view: AppView.PROFILE, icon: UserIcon, label: 'Profile' },
        ];
      case UserRole.COLLEGE:
        return [
          { view: AppView.DASHBOARD, icon: Home, label: 'Admin' },
          { view: AppView.COLLEGE_UPLOAD, icon: Briefcase, label: 'Manage' },
          { view: AppView.MESSAGES, icon: MessageSquare, label: 'Notices' },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 glass-nav pb-safe pt-3 px-2 pb-5 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {getNavItems().map((item) => {
          const isActive = currentView === item.view;
          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.view)}
              className={`flex flex-col items-center gap-1 transition-all duration-300 w-16 ${
                isActive 
                  ? 'text-blue-400 scale-110' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <item.icon 
                size={22} 
                strokeWidth={isActive ? 2.5 : 2}
                className={`transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]' : ''}`}
              />
              <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

interface HeaderProps {
  title: string;
  subtitle?: string;
  user: User | null;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, user }) => {
  // Calculate XP Progress for visualization
  const xp = user?.xp || 2320;
  const maxXp = user?.maxXp || 3000;
  const progress = (xp / maxXp) * 100;
  const level = user?.level || 12;

  return (
    <header className="sticky top-0 z-40 glass border-b border-white/5 px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-blue-200/80 font-medium">{subtitle}</p>}
      </div>
      
      {user && (
        <div className="flex items-center gap-3">
          {user.role === UserRole.STUDENT && (
             <div className="flex flex-col items-end mr-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Lvl {level}</span>
                <div className="w-16 h-1.5 bg-gray-700 rounded-full mt-0.5 overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-300" style={{ width: `${progress}%` }}></div>
                </div>
             </div>
          )}
          <div className="w-10 h-10 rounded-full border-2 border-white/10 shadow-lg overflow-hidden relative group cursor-pointer">
            <img src={user.avatar || 'https://via.placeholder.com/40'} alt="Profile" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
          </div>
        </div>
      )}
    </header>
  );
};

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, subtitle, children, className = '' }) => (
  <div className={`glass-card rounded-3xl p-5 ${className}`}>
    {(title || subtitle) && (
      <div className="mb-4">
        {title && <h3 className="font-bold text-lg text-white tracking-tight">{title}</h3>}
        {subtitle && <p className="text-xs text-gray-400 font-medium mt-0.5">{subtitle}</p>}
      </div>
    )}
    {children}
  </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const sizeStyles = {
    sm: "py-2 px-4 text-sm",
    md: "py-3.5 px-6"
  };

  const baseStyles = "rounded-xl font-bold transition-all duration-300 active:scale-95 flex items-center justify-center shadow-lg";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20 hover:shadow-blue-500/40",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white shadow-gray-900/20",
    outline: "border-2 border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white bg-transparent shadow-none"
  };

  return (
    <button className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};