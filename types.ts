

export enum UserRole {
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
  COLLEGE = 'COLLEGE',
  NONE = 'NONE'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
  level?: number;
  xp?: number;
  maxXp?: number;
}

export interface AttendanceRecord {
  subject: string;
  percentage: number;
  totalClasses: number;
  attendedClasses: number;
}

export interface MarkRecord {
  subject: string;
  marks: number;
  total: number;
  exam: string;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isMe: boolean;
}

export interface Assignment {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export interface StudyPlanItem {
  time: string;
  subject: string;
  topic: string;
  duration: string;
}

// --- New Types for Enhancements ---

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
}

export interface Badge {
  id: string;
  name: string;
  icon: string; // Emoji or Lucide icon name
  description: string;
  unlocked: boolean;
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  trend: 'UP' | 'DOWN' | 'SAME';
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  TIMETABLE = 'TIMETABLE',
  ASSIGNMENTS = 'ASSIGNMENTS',
  TIMER = 'TIMER',
  MESSAGES = 'MESSAGES',
  PROFILE = 'PROFILE',
  AI_PLANNER = 'AI_PLANNER',
  STUDY_TWIN = 'STUDY_TWIN',
  STRESS_MANAGEMENT = 'STRESS_MANAGEMENT',
  SMART_STUDY = 'SMART_STUDY', // Combined AI Tools
  GAMIFICATION = 'GAMIFICATION', // Leaderboard & Badges
  LEARNING_SWIPE = 'LEARNING_SWIPE',
  LEAVES = 'LEAVES',
  COLLEGE_UPLOAD = 'COLLEGE_UPLOAD',
  COLLEGE_ATTENDANCE = 'COLLEGE_ATTENDANCE',
  COLLEGE_MARKS = 'COLLEGE_MARKS',
  COLLEGE_NOTICES = 'COLLEGE_NOTICES',
  COLLEGE_LEAVES = 'COLLEGE_LEAVES'
}
