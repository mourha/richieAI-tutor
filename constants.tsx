
import React from 'react';
import { 
  Beaker, 
  Calculator, 
  MessageSquare, 
  History as HistoryIcon, 
  Code, 
  TrendingUp, 
  Map, 
  PieChart,
  Languages
} from 'lucide-react';
import { Subject, Companion } from './types';

export const SUBJECT_METADATA: Record<Subject, { color: string; icon: React.ReactNode }> = {
  Science: { color: 'bg-indigo-100 border-indigo-200', icon: <Beaker className="w-6 h-6 text-indigo-600" /> },
  Maths: { color: 'bg-purple-100 border-purple-200', icon: <Calculator className="w-6 h-6 text-purple-600" /> },
  Language: { color: 'bg-blue-100 border-blue-200', icon: <Languages className="w-6 h-6 text-blue-600" /> },
  History: { color: 'bg-amber-100 border-amber-200', icon: <HistoryIcon className="w-6 h-6 text-amber-600" /> },
  Coding: { color: 'bg-pink-100 border-pink-200', icon: <Code className="w-6 h-6 text-pink-600" /> },
  Economics: { color: 'bg-emerald-100 border-emerald-200', icon: <TrendingUp className="w-6 h-6 text-emerald-600" /> },
  Geography: { color: 'bg-sky-100 border-sky-200', icon: <Map className="w-6 h-6 text-sky-600" /> },
  Finance: { color: 'bg-teal-100 border-teal-200', icon: <PieChart className="w-6 h-6 text-teal-600" /> },
};

export const HAUSA_TEACHER_PROMPT = `
You are a professional Hausa teacher and tutor.

LANGUAGE:
- Primary language: Hausa
- Speak fluent, natural, Northern Nigerian Hausa
- Sound like a real human teacher, not an AI
- You may mix very simple English words only when necessary

TEACHING STYLE:
- Explain concepts slowly and clearly
- Always simplify difficult ideas
- Teach like you are speaking to a beginner
- Be patient, friendly, and encouraging

WHEN EXPLAINING ANY TOPIC:
1. Give a very simple definition in Hausa
2. Break the idea into small parts
3. Use real-life examples common in Nigeria (market, phone, school, ATM, farming, mosque, business)
4. Use analogy if helpful
5. Summarize in one simple sentence
6. Ask: "Kana fahimta?" or "In sake bayani?"

SPEECH RULES:
- Use clear pronunciation
- Natural pauses
- Classroom-teacher tone
- No rushing
- No robotic language

IF THE USER IS CONFUSED:
- Re-explain using even simpler Hausa
- Change the example
- Repeat key points differently

NEVER:
- Switch fully to English
- Use complex grammar
- Assume prior knowledge
- Sound formal or mechanical

GOAL:
By the end of each explanation, an average Hausa-speaking person should say: "Yanzu na gane sosai."
VOICE MODE:
- Speak Hausa clearly and fluently
- Teacher-style delivery
- Calm, warm, confident tone
- Slight pauses between ideas
- Human-like rhythm
`;

export const INITIAL_COMPANIONS: Companion[] = [
  {
    id: 'hausa-tutor',
    name: 'Malam Richie',
    subject: 'Language',
    topic: 'Hausa Basics & Culture',
    duration: '20 mins',
    colorClass: 'bg-blue-100',
    icon: 'Languages',
    description: 'Learn fluent Hausa with a professional teacher focusing on natural conversation.'
  },
  {
    id: '1',
    name: 'Neura the Explorer',
    subject: 'Science',
    topic: 'Neural Network of the Brain',
    duration: '45 mins',
    colorClass: 'bg-indigo-100',
    icon: 'Beaker',
    description: 'Explore the mysteries of neuroscience and cognitive science with Neura.'
  },
  {
    id: '2',
    name: 'Countsy the Wizard',
    subject: 'Maths',
    topic: 'Derivatives & Integrals',
    duration: '30 mins',
    colorClass: 'bg-purple-100',
    icon: 'Calculator',
    description: 'Master calculus and complex equations with playful step-by-step guidance.'
  },
  {
    id: '5',
    name: 'Codey the Hacker',
    subject: 'Coding',
    topic: 'Intro to Logic & Algorithms',
    duration: '30 mins',
    colorClass: 'bg-pink-100',
    icon: 'Code',
    description: 'Build your first logic algorithms in a fun and interactive sandbox.'
  }
];
