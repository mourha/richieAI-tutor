
import React from 'react';
// Added Play to imports
import { Sparkles, Plus, CheckCircle, Clock, Beaker, Calculator, Code, ArrowRight, Play } from 'lucide-react';
import { Companion, LessonRecord, Subject, AppView } from '../types';
import { INITIAL_COMPANIONS, SUBJECT_METADATA } from '../constants';
import { Button } from './Button';

interface DashboardProps {
  onNavigate: (view: AppView, companionId?: string) => void;
  recentLessons: LessonRecord[];
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, recentLessons }) => {
  const featured = INITIAL_COMPANIONS.slice(0, 3);

  return (
    <div className="space-y-8 lg:space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 lg:gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-indigo-950 tracking-tight">
            Hello, <span className="text-gradient">Explorer!</span>
          </h1>
          <p className="text-indigo-400 font-medium mt-1 lg:mt-2 text-base lg:text-lg">Ready to master a new skill today?</p>
        </div>
        <Button variant="secondary" size="md" onClick={() => onNavigate('library')} className="group w-full md:w-auto">
          Browse All Tutors <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </header>

      {/* Featured Companions */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {featured.map((companion) => {
          const meta = SUBJECT_METADATA[companion.subject];
          return (
            <div 
              key={companion.id}
              className={`bg-white border-2 border-indigo-50 rounded-[32px] lg:rounded-[40px] p-6 lg:p-8 relative overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all group`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-[100px] -z-0 translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform"></div>
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl ${meta.color} flex items-center justify-center mb-6 shadow-sm`}>
                  {meta.icon}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-indigo-50 text-indigo-600 text-[10px] uppercase font-black px-2.5 py-1 rounded-lg tracking-wider">
                    {companion.subject}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-indigo-950 mb-3">{companion.name}</h3>
                <p className="text-sm text-indigo-400 font-medium mb-6 line-clamp-2">{companion.topic}</p>
              </div>

              <div className="mt-auto relative z-10 pt-4 flex items-center justify-between border-t border-indigo-50">
                <div className="flex items-center text-xs text-indigo-300 font-bold">
                  <Clock className="w-3.5 h-3.5 mr-1.5" /> {companion.duration}
                </div>
                <button 
                  onClick={() => onNavigate('lesson', companion.id)}
                  className="p-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 active:scale-90 transition-all shadow-lg shadow-indigo-200"
                >
                  <Play className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>
          );
        })}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recently Completed */}
        <div className="lg:col-span-2 bg-white rounded-[32px] lg:rounded-[48px] border border-indigo-50 p-6 lg:p-10 shadow-sm">
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <h2 className="text-xl lg:text-2xl font-black text-indigo-950">Recent Journey</h2>
            <button onClick={() => onNavigate('journey')} className="text-sm font-bold text-indigo-400 hover:text-indigo-600 transition-colors">View All</button>
          </div>
          
          <div className="space-y-4 lg:space-y-6">
            {recentLessons.length > 0 ? (
              recentLessons.map((lesson) => (
                <div key={lesson.id} className="flex items-center group cursor-pointer hover:bg-indigo-50/50 p-3 lg:p-4 -m-3 lg:-m-4 rounded-2xl lg:rounded-3xl transition-all">
                  <div className={`w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl ${SUBJECT_METADATA[lesson.subject].color} flex items-center justify-center mr-4 lg:mr-6 shadow-sm group-hover:scale-105 transition-transform shrink-0`}>
                    {React.cloneElement(SUBJECT_METADATA[lesson.subject].icon as React.ReactElement, { className: 'w-5 h-5 lg:w-7 lg:h-7 text-indigo-600' } as any)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-indigo-950 text-base lg:text-lg truncate">{lesson.companionName}</h4>
                    <p className="text-xs lg:text-sm text-indigo-400 font-medium truncate">{lesson.topic}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                    <span className="text-[8px] lg:text-[10px] font-black uppercase text-indigo-400 bg-indigo-50 px-2 py-0.5 rounded-md">{lesson.subject}</span>
                    <span className="text-[10px] lg:text-xs text-indigo-200 font-bold">{lesson.completedAt}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 text-indigo-200">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="text-lg font-bold">Your story is just beginning.</p>
                <p className="text-sm font-medium mt-1">Complete a lesson to see it here!</p>
              </div>
            )}
          </div>
        </div>

        {/* Builder Call to action */}
        <div className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900 rounded-[32px] lg:rounded-[48px] p-8 lg:p-10 flex flex-col justify-between text-white relative overflow-hidden group shadow-2xl shadow-indigo-500/20">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
          
          <div className="relative z-10">
            <div className="bg-white/10 backdrop-blur-md text-white text-[10px] font-black px-4 py-1.5 rounded-full w-fit mb-4 lg:mb-6 uppercase tracking-widest border border-white/10">
              Personalized
            </div>
            <h2 className="text-2xl lg:text-4xl font-black leading-tight mb-3 lg:mb-4">Create your own <span className="text-indigo-400 italic">Companion.</span></h2>
            <p className="text-indigo-200 text-xs lg:text-sm mb-6 lg:mb-8 leading-relaxed font-medium">
              Design a custom tutor with a unique personality and voice tailored just for you.
            </p>
          </div>

          <div className="relative z-10 py-6 lg:py-10 flex justify-center scale-110 lg:scale-125 group-hover:scale-150 transition-transform duration-700">
             <div className="relative">
               <div className="absolute inset-0 bg-white/10 blur-2xl rounded-full"></div>
               <Sparkles className="w-16 h-16 text-white relative animate-pulse" />
             </div>
          </div>

          <Button variant="glass" fullWidth size="lg" onClick={() => onNavigate('builder')} className="relative z-10 group">
            <Plus className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform" /> Build Now
          </Button>
        </div>
      </div>
    </div>
  );
};
