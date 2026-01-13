
import React from 'react';
import { User, CheckCircle, Award, BarChart2 } from 'lucide-react';
// Fix: SUBJECT_METADATA is exported from constants.tsx, not types.ts
import { UserProgress } from '../types';
import { SUBJECT_METADATA } from '../constants';
import { Button } from './Button';

interface MyJourneyProps {
  progress: UserProgress;
}

export const MyJourney: React.FC<MyJourneyProps> = ({ progress }) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-sm">
        <img 
          src="https://picsum.photos/seed/user/200/200" 
          className="w-32 h-32 rounded-3xl object-cover border-4 border-gray-50 shadow-xl"
          alt="Profile"
        />
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-black text-gray-900 mb-1">Adrian Hajdin</h2>
          <p className="text-gray-400 font-medium mb-6">adrian@jsmastery.pro</p>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
             <div className="bg-white border-2 border-gray-100 rounded-2xl p-4 flex items-center min-w-[160px]">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                   <CheckCircle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-black text-gray-900">{progress.lessonsCompleted}</div>
                  <div className="text-xs font-bold text-gray-400 uppercase">Lessons Completed</div>
                </div>
             </div>
             <div className="bg-white border-2 border-gray-100 rounded-2xl p-4 flex items-center min-w-[160px]">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                   <Award className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-black text-gray-900">{progress.companionsCreated}</div>
                  <div className="text-xs font-bold text-gray-400 uppercase">Companions Created</div>
                </div>
             </div>
          </div>
        </div>
        <Button variant="outline">Edit Profile</Button>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm overflow-hidden">
        <h3 className="text-2xl font-black text-gray-900 mb-8">Completed lessons</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-xs font-black uppercase tracking-widest border-b border-gray-50">
                <th className="pb-4 font-black">Lessons</th>
                <th className="pb-4 font-black">Subject</th>
                <th className="pb-4 font-black text-right">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {progress.history.map((lesson) => (
                <tr key={lesson.id} className="group">
                  <td className="py-6 flex items-center">
                    <div className={`w-12 h-12 rounded-xl ${SUBJECT_METADATA[lesson.subject].color} flex items-center justify-center mr-4`}>
                      {SUBJECT_METADATA[lesson.subject].icon}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 group-hover:text-orange-500 transition-colors">{lesson.companionName}</div>
                      <div className="text-xs text-gray-400 font-medium">Topic: {lesson.topic}</div>
                    </div>
                  </td>
                  <td className="py-6">
                    <span className="bg-black text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {lesson.subject}
                    </span>
                  </td>
                  <td className="py-6 text-right">
                    <div className="text-gray-900 font-bold">{lesson.duration}</div>
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
