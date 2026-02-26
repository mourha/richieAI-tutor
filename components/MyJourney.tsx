
import React from 'react';
import { User, CheckCircle, Award, BarChart2 } from 'lucide-react';
// Fix: SUBJECT_METADATA is exported from constants.tsx, not types.ts
import { UserProgress } from '../types';
import { SUBJECT_METADATA } from '../constants';
import { Button } from './Button';

interface MyJourneyProps {
  progress: UserProgress;
  user: { name: string; email: string } | null;
}

export const MyJourney: React.FC<MyJourneyProps> = ({ progress, user }) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Profile Header */}
      <div className="bg-white rounded-[32px] border border-indigo-50 p-6 lg:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 lg:gap-8 shadow-sm">
        <img 
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Guest'}`} 
          className="w-24 h-24 lg:w-32 lg:h-32 rounded-[24px] lg:rounded-3xl object-cover border-4 border-white shadow-xl bg-indigo-50"
          alt="Profile"
        />
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl lg:text-3xl font-black text-indigo-950 mb-1">{user?.name || 'Guest Learner'}</h2>
          <p className="text-indigo-400 font-medium mb-6">{user?.email || 'Sign in to sync your progress'}</p>
          
          <div className="flex flex-wrap gap-3 lg:gap-4 justify-center md:justify-start">
             <div className="bg-white border-2 border-indigo-50 rounded-2xl p-3 lg:p-4 flex items-center min-w-[140px] lg:min-w-[160px]">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3 shrink-0">
                   <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-xl lg:text-2xl font-black text-indigo-950">{progress.lessonsCompleted}</div>
                  <div className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">Lessons</div>
                </div>
             </div>
             <div className="bg-white border-2 border-indigo-50 rounded-2xl p-3 lg:p-4 flex items-center min-w-[140px] lg:min-w-[160px]">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3 shrink-0">
                   <Award className="w-5 h-5 lg:w-6 lg:h-6 text-indigo-600" />
                </div>
                <div>
                  <div className="text-xl lg:text-2xl font-black text-indigo-950">{progress.companionsCreated}</div>
                  <div className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">Companions</div>
                </div>
             </div>
          </div>
        </div>
        <Button variant="outline" className="w-full md:w-auto">Edit Profile</Button>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-[32px] border border-indigo-50 p-6 lg:p-8 shadow-sm overflow-hidden">
        <h3 className="text-xl lg:text-2xl font-black text-indigo-950 mb-6 lg:mb-8">Completed Lessons</h3>
        
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="text-left text-indigo-300 text-[10px] font-black uppercase tracking-widest border-b border-indigo-50">
                <th className="pb-4">Lesson</th>
                <th className="pb-4">Subject</th>
                <th className="pb-4 text-right">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-50">
              {progress.history.map((lesson) => (
                <tr key={lesson.id} className="group">
                  <td className="py-4 lg:py-6 flex items-center">
                    <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl ${SUBJECT_METADATA[lesson.subject].color} flex items-center justify-center mr-4 shrink-0`}>
                      {React.cloneElement(SUBJECT_METADATA[lesson.subject].icon as React.ReactElement, { className: 'w-5 h-5 lg:w-6 lg:h-6' })}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-indigo-950 group-hover:text-indigo-600 transition-colors truncate">{lesson.companionName}</div>
                      <div className="text-[10px] lg:text-xs text-indigo-400 font-medium truncate">Topic: {lesson.topic}</div>
                    </div>
                  </td>
                  <td className="py-4 lg:py-6">
                    <span className="bg-indigo-950 text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {lesson.subject}
                    </span>
                  </td>
                  <td className="py-4 lg:py-6 text-right">
                    <div className="text-indigo-950 font-bold text-sm lg:text-base">{lesson.duration}</div>
                    <div className="text-[10px] text-indigo-200 font-bold">{lesson.completedAt}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {progress.history.length === 0 && (
            <div className="text-center py-20 text-gray-300">
               <BarChart2 className="w-16 h-16 mx-auto mb-4 opacity-20" />
               <p className="text-lg font-medium">No learning records found yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
