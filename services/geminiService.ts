
import { GoogleGenAI, Type } from "@google/genai";
import { StudyPlanItem, Flashcard, QuizQuestion } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize the client only if the key exists to avoid errors in dev environments without keys
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateStudyPlan = async (subjects: string[], hoursAvailable: number): Promise<StudyPlanItem[]> => {
  if (!ai) {
    console.warn("Gemini API Key missing");
    return [
      { time: "09:00 AM", subject: "Math", topic: "Calculus Review", duration: "1h" },
      { time: "10:15 AM", subject: "Physics", topic: "Thermodynamics", duration: "45m" },
      { time: "11:15 AM", subject: "Break", topic: "Relax", duration: "15m" },
    ];
  }

  try {
    const prompt = `Create a study schedule for a student who needs to study these subjects: ${subjects.join(', ')}. 
    They have ${hoursAvailable} hours available today. 
    Break it down into realistic slots including short breaks.
    Return a list of study slots.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              time: { type: Type.STRING, description: "Start time e.g., 09:00 AM" },
              subject: { type: Type.STRING, description: "Subject name" },
              topic: { type: Type.STRING, description: "Specific topic to cover" },
              duration: { type: Type.STRING, description: "Duration e.g., 45m" }
            },
            required: ["time", "subject", "topic", "duration"]
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return [];
    
    return JSON.parse(jsonText) as StudyPlanItem[];
  } catch (error) {
    console.error("Failed to generate study plan", error);
    return [];
  }
};

export const generateFlashcards = async (topic: string, count: number = 5): Promise<Flashcard[]> => {
  if (!ai) {
    return [
      { id: '1', front: 'What is the powerhouse of the cell?', back: 'Mitochondria', difficulty: 'EASY' },
      { id: '2', front: 'Newton\'s Second Law?', back: 'F = ma', difficulty: 'MEDIUM' },
    ];
  }

  try {
    const prompt = `Generate ${count} flashcards for the topic: "${topic}". 
    Each card should have a question (front) and a concise answer (back).
    Assign a difficulty level (EASY, MEDIUM, HARD).`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              front: { type: Type.STRING, description: "Question" },
              back: { type: Type.STRING, description: "Answer" },
              difficulty: { type: Type.STRING, enum: ["EASY", "MEDIUM", "HARD"] }
            },
            required: ["front", "back", "difficulty"]
          }
        }
      }
    });

    const data = JSON.parse(response.text || '[]');
    return data.map((item: any, index: number) => ({ ...item, id: Date.now().toString() + index }));
  } catch (error) {
    console.error("Failed flashcards", error);
    return [];
  }
};

export const generateQuizFromText = async (text: string): Promise<QuizQuestion[]> => {
  if (!ai) {
    return [
      { id: '1', question: 'What is the main idea of the summary?', options: ['Idea A', 'Idea B', 'Idea C', 'Idea D'], correctAnswer: 0 },
      { id: '2', question: 'Which detail was explicitly mentioned?', options: ['Detail X', 'Detail Y', 'Detail Z', 'None'], correctAnswer: 1 },
      { id: '3', question: 'What is the conclusion?', options: ['Conclusion 1', 'Conclusion 2', 'Conclusion 3', 'Conclusion 4'], correctAnswer: 2 },
    ];
  }

  try {
    const prompt = `Generate a 3-question multiple choice quiz based on the following text: "${text}".
    Return a JSON array of objects with properties: question, options (array of 4 strings), and correctAnswer (index 0-3).`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswer: { type: Type.NUMBER }
            },
            required: ["question", "options", "correctAnswer"]
          }
        }
      }
    });

    const data = JSON.parse(response.text || '[]');
    return data.map((item: any, index: number) => ({ ...item, id: Date.now().toString() + index }));
  } catch (error) {
    console.error("Failed quiz generation", error);
    return [];
  }
};

export const askAITutor = async (question: string, subject: string): Promise<string> => {
  if (!ai) return "I can help explain that concept! (Connect API Key to enable AI Tutor)";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert tutor in ${subject}. Explain this concept to a high school student clearly and concisely. 
      Use analogies if helpful. Question: ${question}`,
    });
    return response.text || "Sorry, I couldn't generate an explanation.";
  } catch (error) {
    return "Error connecting to AI Tutor.";
  }
};
