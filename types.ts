
export type Subject = 'Science' | 'Maths' | 'Language' | 'History' | 'Coding' | 'Economics' | 'Geography' | 'Finance';

export interface Companion {
  id: string;
  name: string;
  subject: Subject;
  topic: string;
  duration: string;
  colorClass: string;
  icon: string;
  description: string;
}

export interface LessonRecord {
  id: string;
  companionId: string;
  companionName: string;
  topic: string;
  subject: Subject;
  duration: string;
  completedAt: string;
  icon: string;
}

export interface UserProgress {
  lessonsCompleted: number;
  companionsCreated: number;
  history: LessonRecord[];
}

export type AppView = 'dashboard' | 'library' | 'journey' | 'builder' | 'lesson' | 'pricing' | 'auth';
