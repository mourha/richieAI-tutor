
import React, { useState } from 'react';
import { Sparkles, ArrowLeft, Check } from 'lucide-react';
import { Subject, Companion, AppView } from '../types';
import { SUBJECT_METADATA } from '../constants';
import { Button } from './Button';

interface BuilderViewProps {
  onSave: (companion: Companion) => void;
  onBack: () => void;
}

export const BuilderView: React.FC<BuilderViewProps> = ({ onSave, onBack }) => {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject>('Science');
  const [description, setDescription] = useState('');

  const subjects: Subject[] = ['Science', 'Maths', 'Language', 'History', 'Coding', 'Economics', 'Geography', 'Finance'];

  const handleCreate = () => {
    if (!name || !topic) return;
    
    const newCompanion: Companion = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      subject: selectedSubject,
      topic,
      duration: 'Custom',
      colorClass: SUBJECT_METADATA[selectedSubject].color.split(' ')[0],
      icon: 'Sparkles',
      description: description || `A custom tutor for ${topic}.`
    };

    onSave(newCompanion);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-gray-900 mb-8 font-semibold transition-colors">
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard
      </button>

      <div className="bg-white rounded-[32px] lg:rounded-[40px] border border-indigo-50 p-6 lg:p-12 shadow-sm">
        <div className="flex items-center mb-8 lg:mb-10">
          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-indigo-50 rounded-2xl lg:rounded-3xl flex items-center justify-center mr-4 lg:mr-6">
            <Sparkles className="w-6 h-6 lg:w-8 lg:h-8 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-black text-indigo-950">Create Companion</h1>
            <p className="text-indigo-400 text-sm lg:text-base">Design your perfect AI learning partner.</p>
          </div>
        </div>

        <div className="space-y-6 lg:space-y-8">
          <div>
            <label className="block text-[10px] lg:text-sm font-black text-indigo-300 uppercase tracking-widest mb-2 lg:mb-3">Companion Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Professor Pipsqueak" 
              className="w-full bg-indigo-50/30 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-xl lg:rounded-2xl py-3 lg:py-4 px-5 lg:px-6 outline-none transition-all text-base lg:text-lg font-bold text-indigo-950"
            />
          </div>

          <div>
            <label className="block text-[10px] lg:text-sm font-black text-indigo-300 uppercase tracking-widest mb-2 lg:mb-3">Topic to Master</label>
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Quantum Physics or Baking bread" 
              className="w-full bg-indigo-50/30 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-xl lg:rounded-2xl py-3 lg:py-4 px-5 lg:px-6 outline-none transition-all text-base lg:text-lg font-bold text-indigo-950"
            />
          </div>

          <div>
            <label className="block text-[10px] lg:text-sm font-black text-indigo-300 uppercase tracking-widest mb-2 lg:mb-3">Choose Subject</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 lg:gap-4">
              {subjects.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`relative p-3 lg:p-4 rounded-xl lg:rounded-2xl border-2 transition-all flex flex-col items-center text-center ${
                    selectedSubject === sub 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-indigo-50/50 bg-white hover:border-indigo-100'
                  }`}
                >
                  {selectedSubject === sub && (
                    <div className="absolute top-1.5 lg:top-2 right-1.5 lg:right-2 bg-indigo-500 text-white rounded-full p-0.5">
                      <Check className="w-2.5 lg:w-3 h-2.5 lg:h-3" />
                    </div>
                  )}
                  <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl ${SUBJECT_METADATA[sub].color} flex items-center justify-center mb-1.5 lg:mb-2 shrink-0`}>
                    {React.cloneElement(SUBJECT_METADATA[sub].icon as React.ReactElement, { className: 'w-4 h-4 lg:w-5 lg:h-5' })}
                  </div>
                  <span className={`text-[10px] lg:text-xs font-bold ${selectedSubject === sub ? 'text-indigo-600' : 'text-indigo-400'}`}>{sub}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] lg:text-sm font-black text-indigo-300 uppercase tracking-widest mb-2 lg:mb-3">Bio / Personality (Optional)</label>
            <textarea 
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell Richie how this tutor should act..." 
              className="w-full bg-indigo-50/30 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-xl lg:rounded-2xl py-3 lg:py-4 px-5 lg:px-6 outline-none transition-all font-medium text-indigo-950"
            />
          </div>

          <Button 
            fullWidth 
            size="lg" 
            onClick={handleCreate}
            disabled={!name || !topic}
            className="rounded-2xl lg:rounded-3xl !py-4 lg:!py-6 text-lg lg:text-xl shadow-xl shadow-indigo-500/20"
          >
            Create Learning Companion
          </Button>
        </div>
      </div>
    </div>
  );
};
