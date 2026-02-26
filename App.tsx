
import React, { useState, useMemo } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { LessonView } from './components/LessonView';
import { MyJourney } from './components/MyJourney';
import { BuilderView } from './components/BuilderView';
import { AuthView } from './components/AuthView';
import { PricingView } from './components/PricingView';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { AdminDashboard } from './components/AdminDashboard';
import { AppView, Companion, UserProgress } from './types';
import { INITIAL_COMPANIONS } from './constants';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>('home');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [selectedCompanionId, setSelectedCompanionId] = useState<string | null>(null);
  const [customCompanions, setCustomCompanions] = useState<Companion[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    lessonsCompleted: 12,
    companionsCreated: 5,
    history: [
      {
        id: 'h1',
        companionId: 'hausa-tutor',
        companionName: 'Malam Richie',
        topic: 'Hausa Basics & Culture',
        subject: 'Language',
        duration: '20 mins',
        completedAt: 'Yesterday',
        icon: 'Languages'
      },
      {
        id: 'h2',
        companionId: '1',
        companionName: 'Neura the Brainy Explorer',
        topic: 'Neural Networks of the Brain',
        subject: 'Science',
        duration: '45 mins',
        completedAt: '2 days ago',
        icon: 'Beaker'
      }
    ]
  });

  const allCompanions = useMemo(() => {
    return [...INITIAL_COMPANIONS, ...customCompanions];
  }, [customCompanions]);

  const handleNavigate = (view: AppView, companionId?: string) => {
    setActiveView(view);
    if (companionId) setSelectedCompanionId(companionId);
  };

  const handleSaveCompanion = (newComp: Companion) => {
    setCustomCompanions(prev => [newComp, ...prev]);
    setUserProgress(prev => ({ ...prev, companionsCreated: prev.companionsCreated + 1 }));
    setActiveView('dashboard');
  };

  const handleEndLesson = () => {
    const comp = allCompanions.find(c => c.id === selectedCompanionId);
    if (comp) {
        const newRecord = {
            id: Math.random().toString(),
            companionId: comp.id,
            companionName: comp.name,
            topic: comp.topic,
            subject: comp.subject,
            duration: comp.duration === 'Custom' ? '15 mins' : comp.duration,
            completedAt: 'Just now',
            icon: comp.icon
        };
        setUserProgress(prev => ({
            ...prev,
            lessonsCompleted: prev.lessonsCompleted + 1,
            history: [newRecord, ...prev.history]
        }));
    }
    setActiveView('dashboard');
    setSelectedCompanionId(null);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return <HomeView onNavigate={handleNavigate} />;
      case 'about':
        return <AboutView onNavigate={handleNavigate} />;
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} recentLessons={userProgress.history.slice(0, 5)} />;
      case 'journey':
        return <MyJourney progress={userProgress} user={user} />;
      case 'builder':
        return <BuilderView onSave={handleSaveCompanion} onBack={() => setActiveView('dashboard')} />;
      case 'lesson':
        const comp = allCompanions.find(c => c.id === selectedCompanionId) || allCompanions[0];
        return <LessonView companion={comp} onEnd={handleEndLesson} onNavigate={handleNavigate} />;
      case 'pricing':
        return <PricingView user={user} />;
      case 'admin':
        return <AdminDashboard />;
      case 'auth':
        return <AuthView onSuccess={() => {
          setUser({ name: 'Guest User', email: 'guest@example.com' });
          setActiveView('dashboard');
        }} />;
      case 'library':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Your Companions</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allCompanions.map(c => (
                    <div key={c.id} className={`${c.colorClass} border-2 border-black/5 p-10 rounded-[48px] shadow-sm flex flex-col h-full relative group hover:shadow-xl hover:shadow-black/5 transition-all`}>
                        <div className="bg-black text-white text-[10px] font-black px-3 py-1.5 rounded-full w-fit mb-8 uppercase tracking-widest">{c.subject}</div>
                        <h3 className="text-3xl font-black text-gray-900 mb-2 leading-tight">{c.name}</h3>
                        <p className="text-sm text-gray-600 mb-4 font-bold">Topic: {c.topic}</p>
                        <p className="text-sm text-gray-500 mb-10 leading-relaxed font-medium">{c.description}</p>
                        <button 
                            onClick={() => handleNavigate('lesson', c.id)}
                            className="mt-auto w-full bg-[#FF5C35] text-white py-5 rounded-[32px] font-black text-lg shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
                        >
                            Launch Darasi
                        </button>
                    </div>
                ))}
            </div>
          </div>
        );
      default:
        return <Dashboard onNavigate={handleNavigate} recentLessons={userProgress.history} />;
    }
  };

  return (
    <Layout activeView={activeView} onNavigate={handleNavigate} user={user}>
      {renderContent()}
    </Layout>
  );
};

export default App;
