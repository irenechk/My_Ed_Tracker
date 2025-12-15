
import React, { useState } from 'react';
import { Card, Button } from './Layout';
import { Bot, Layers, BookOpen, Send, RotateCw, Lightbulb, Check, X as XIcon, ClipboardPen, HelpCircle } from 'lucide-react';
import { Flashcard, QuizQuestion } from '../types';
import { generateFlashcards, askAITutor, generateQuizFromText } from '../services/geminiService';

export const SmartStudy: React.FC = () => {
  const [tool, setTool] = useState<'AI_TUTOR' | 'FLASHCARDS' | 'NOTES'>('FLASHCARDS');

  return (
    <div className="space-y-6">
      {/* Tool Selector */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        <button 
          onClick={() => setTool('FLASHCARDS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${tool === 'FLASHCARDS' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40' : 'bg-gray-800 text-gray-400'}`}
        >
          <Layers size={18} /> Flashcards
        </button>
        <button 
          onClick={() => setTool('AI_TUTOR')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${tool === 'AI_TUTOR' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'bg-gray-800 text-gray-400'}`}
        >
          <Bot size={18} /> AI Tutor
        </button>
        <button 
          onClick={() => setTool('NOTES')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${tool === 'NOTES' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' : 'bg-gray-800 text-gray-400'}`}
        >
          <BookOpen size={18} /> Notes Gen
        </button>
      </div>

      <div className="min-h-[400px]">
        {tool === 'FLASHCARDS' && <FlashcardSystem />}
        {tool === 'AI_TUTOR' && <AITutorSystem />}
        {tool === 'NOTES' && <NotesGeneratorSystem />}
      </div>
    </div>
  );
};

// --- Sub-components ---

const FlashcardSystem: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleCreate = async () => {
    if (!topic) return;
    setLoading(true);
    const newCards = await generateFlashcards(topic, 5);
    setCards(newCards);
    setCurrentIndex(0);
    setFlipped(false);
    setLoading(false);
  };

  const handleNext = () => {
    setFlipped(false);
    setTimeout(() => {
      if (currentIndex < cards.length - 1) setCurrentIndex(prev => prev + 1);
      else alert("Deck completed! +50 XP");
    }, 200);
  };

  return (
    <div className="space-y-6">
      {cards.length === 0 ? (
        <Card title="AI Flashcard Creator" className="border-t-4 border-indigo-500">
          <p className="text-gray-400 text-sm mb-4">Enter a topic, and I'll generate study cards for you.</p>
          <div className="flex gap-2">
            <input 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Photosynthesis, WWII, Calculus Limits"
              className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none"
            />
            <Button onClick={handleCreate} disabled={loading} className="bg-indigo-600">
               {loading ? <RotateCw className="animate-spin" /> : 'Create'}
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
           {/* Card Display */}
           <div className="perspective-1000 h-64 w-full relative group cursor-pointer" onClick={() => setFlipped(!flipped)}>
              <div className={`w-full h-full transition-all duration-500 transform preserve-3d relative ${flipped ? 'rotate-y-180' : ''}`}>
                 {/* Front */}
                 <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-indigo-800 to-indigo-900 rounded-2xl border border-indigo-500/30 p-8 flex flex-col items-center justify-center text-center shadow-2xl">
                    <span className="absolute top-4 left-4 text-xs font-bold text-indigo-300 uppercase tracking-widest">Question {currentIndex + 1}/{cards.length}</span>
                    <h3 className="text-xl font-bold text-white">{cards[currentIndex].front}</h3>
                    <p className="absolute bottom-6 text-xs text-indigo-300 opacity-50">Tap to flip</p>
                 </div>
                 {/* Back */}
                 <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gray-800 rounded-2xl border border-gray-700 p-8 flex flex-col items-center justify-center text-center shadow-2xl">
                    <span className="absolute top-4 left-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Answer</span>
                    <h3 className="text-lg text-white">{cards[currentIndex].back}</h3>
                 </div>
              </div>
           </div>

           {/* Controls */}
           <div className="flex justify-center gap-4">
              <button onClick={handleNext} className="flex-1 py-3 bg-red-900/30 border border-red-800/50 text-red-400 rounded-xl font-bold hover:bg-red-900/50">Hard</button>
              <button onClick={handleNext} className="flex-1 py-3 bg-blue-900/30 border border-blue-800/50 text-blue-400 rounded-xl font-bold hover:bg-blue-900/50">Medium</button>
              <button onClick={handleNext} className="flex-1 py-3 bg-green-900/30 border border-green-800/50 text-green-400 rounded-xl font-bold hover:bg-green-900/50">Easy</button>
           </div>
           
           <button onClick={() => setCards([])} className="w-full text-center text-xs text-gray-500 hover:text-white mt-2">Start New Deck</button>
        </div>
      )}
    </div>
  );
};

const AITutorSystem: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
    { role: 'ai', content: "Hi! I'm your AI Tutor. What subject or concept are you stuck on today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setLoading(true);
    
    const response = await askAITutor(userMsg, 'General');
    setMessages(prev => [...prev, { role: 'ai', content: response }]);
    setLoading(false);
  };

  return (
    <Card className="h-[500px] flex flex-col p-0 overflow-hidden border-t-4 border-t-blue-500">
       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
          {messages.map((m, i) => (
             <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-gray-700 text-gray-200 rounded-tl-sm'}`}>
                   {m.role === 'ai' && <div className="text-xs font-bold text-blue-300 mb-1 flex items-center gap-1"><Bot size={10} /> Tutor</div>}
                   {m.content}
                </div>
             </div>
          ))}
          {loading && <div className="text-xs text-gray-500 ml-4 animate-pulse">Thinking...</div>}
       </div>
       <div className="p-3 bg-gray-800 border-t border-gray-700 flex gap-2">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 text-white text-sm focus:border-blue-500 outline-none"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend} className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"><Send size={18} /></button>
       </div>
    </Card>
  );
};

const NotesGeneratorSystem: React.FC = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Quiz State
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [quizLoading, setQuizLoading] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSummarize = () => {
    if (!text.trim()) return;
    setLoading(true);
    // Mock summary for demo
    setTimeout(() => {
      setSummary("• " + text.substring(0, Math.min(text.length, 100)) + "...\n\n• Key Point 1: The input text was analyzed.\n• Key Point 2: Structure was identified.\n• Summary: This is an AI-generated summary of your raw notes.");
      setLoading(false);
    }, 1500);
  };

  const handleGenerateQuiz = async () => {
      setQuizLoading(true);
      const questions = await generateQuizFromText(summary);
      setQuiz(questions);
      setQuizLoading(false);
  };

  const handleAnswer = (qId: string, optionIdx: number) => {
      setAnswers(prev => ({...prev, [qId]: optionIdx}));
  };

  const resetAll = () => {
    setSummary(''); 
    setText(''); 
    setQuiz([]); 
    setAnswers({}); 
    setShowResults(false);
  };

  return (
    <Card title="Notes Magician" className="border-t-4 border-emerald-500 text-center py-6">
      <div className="w-12 h-12 bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
         <BookOpen size={24} className="text-emerald-400" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">Paste & Summarize</h3>
      <p className="text-sm text-gray-400 mb-6 px-4">Paste your rough notes below, and AI will organize them into bullet points.</p>
      
      {!summary ? (
        <div className="space-y-4">
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your notes here..."
            className="w-full h-32 bg-gray-900 border border-gray-700 rounded-xl p-4 text-white focus:border-emerald-500 outline-none resize-none text-sm placeholder-gray-600"
          ></textarea>
          <Button onClick={handleSummarize} disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-500">
             {loading ? <RotateCw className="animate-spin" /> : 'Generate Summary'}
          </Button>
        </div>
      ) : (
        <div className="space-y-4 text-left animate-in fade-in">
          <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-xl text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
             {summary}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button onClick={resetAll} variant="secondary" className="flex-1">
              <ClipboardPen size={18} className="mr-2" /> Start Over
            </Button>
            {!quiz.length && (
              <Button onClick={handleGenerateQuiz} disabled={quizLoading} className="flex-1 bg-indigo-600 hover:bg-indigo-500">
                {quizLoading ? <RotateCw className="animate-spin" /> : <><HelpCircle size={18} className="mr-2" /> Take Quiz</>}
              </Button>
            )}
          </div>

          {/* Quiz Section */}
          {quiz.length > 0 && (
            <div className="mt-6 space-y-6 text-left border-t border-gray-700 pt-6 animate-in slide-in-from-bottom-2">
              <h4 className="font-bold text-white flex items-center gap-2"><Lightbulb size={18} className="text-yellow-400" /> Knowledge Check</h4>
              {quiz.map((q, idx) => (
                <div key={q.id} className="space-y-3">
                  <p className="text-sm font-medium text-gray-200">{idx + 1}. {q.question}</p>
                  <div className="grid grid-cols-1 gap-2">
                    {q.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleAnswer(q.id, optIdx)}
                        disabled={showResults}
                        className={`text-left text-xs p-3 rounded-lg border transition-all ${
                          showResults 
                            ? optIdx === q.correctAnswer 
                              ? 'bg-green-900/40 border-green-500 text-green-100'
                              : answers[q.id] === optIdx 
                                ? 'bg-red-900/40 border-red-500 text-red-100'
                                : 'bg-gray-800 border-gray-700 opacity-50'
                            : answers[q.id] === optIdx
                              ? 'bg-blue-600 border-blue-500 text-white'
                              : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              
              {!showResults ? (
                 <Button onClick={() => setShowResults(true)} className="w-full bg-green-600 hover:bg-green-500">Check Answers</Button>
              ) : (
                 <div className="text-center p-4 bg-gray-800 rounded-xl">
                    <p className="font-bold text-white mb-2">Score: {quiz.filter(q => answers[q.id] === q.correctAnswer).length} / {quiz.length}</p>
                    <Button onClick={resetAll} variant="secondary" size="sm">Finish & Close</Button>
                 </div>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
