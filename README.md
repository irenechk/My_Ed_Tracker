# EduTrackr

A comprehensive, mobile-first educational platform connecting Students, Parents, and Colleges. EduTrackr integrates modern study tools, real-time communication, and AI-powered learning assistants into a cohesive ecosystem.

## 🚀 Features

### 🎓 For Students
*   **Dashboard:** Visual analytics for attendance, study streaks, and performance trends. Includes an exam countdown timer.
*   **AI Study Planner:** Generates personalized daily study schedules based on subjects and available time using Google Gemini.
*   **Smart Study Tools:**
    *   **AI Flashcards:** Auto-generate study cards for any topic.
    *   **AI Tutor:** Ask questions and get instant explanations.
    *   **Notes Magician:** Summarize raw notes and auto-generate quizzes to test knowledge.
*   **Study Twin:** A social matching feature to find study partners with similar habits ("Night Owl" vs "Morning Bird"). Includes chat and a simulated video focus room.
*   **Focus Timer:** Pomodoro-style timer with focus and break modes.
*   **Wellness Center:** Guided breathing exercises (4-7-8 technique), ambient soundscapes (Rain, Forest, Lo-Fi), and mood tracking.
*   **Gamification:** Earn XP, climb leaderboards, and unlock badges for study consistency.

### 👨‍👩‍👧 For Parents
*   **Student Oversight:** Real-time view of child's attendance, grades, and upcoming exams.
*   **Activity Feed:** Instant notifications for absences or test results.
*   **Direct Communication:** Chat interface to connect with teachers.

### 🏛️ For Colleges/Faculty
*   **Digital Attendance:** Quick interface to mark class attendance.
*   **Marks Management:** Upload and publish exam results.
*   **Notice Board:** Compose and broadcast announcements to students.
*   **Leave Management:** Review and approve/reject student leave applications.

## 🛠️ Tech Stack

*   **Frontend:** React 19, TypeScript
*   **Styling:** Tailwind CSS (Glassmorphism design system)
*   **Icons:** Lucide React
*   **Charts:** Recharts
*   **AI Integration:** Google Gemini API (`@google/genai`)

## ⚙️ Setup & Configuration

1.  **Environment Variables**
    *   The application requires a Google Gemini API key for AI features (Planner, Tutor, Quiz generation).
    *   Ensure `process.env.API_KEY` is available in your environment.
    *   *Note: If no API key is detected, the app gracefully falls back to mock data for demonstration purposes.*

2.  **Running the App**
    *   Install dependencies: `npm install`
    *   Start development server: `npm start`

## 📱 UI/UX Design
The application features a modern "Glassmorphism" aesthetic optimized for mobile devices:
*   **Dark Mode by Default:** Reduces eye strain during late-night study sessions.
*   **Touch-Optimized:** Large touch targets, swipe gestures, and a bottom navigation bar.
*   **Responsive:** Adapts fluidly to different screen sizes.

## 🤖 AI Capabilities
Powered by **Google Gemini 2.5 Flash**:
*   **Structured Output:** Generates strictly typed JSON for Study Plans and Flashcards using `responseSchema`.
*   **Natural Language Processing:** Provides conversational tutoring and text summarization.
*   **Context Awareness:** Generates quizzes specifically tailored to the notes provided by the student.