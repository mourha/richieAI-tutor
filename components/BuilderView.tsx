
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

      <div className="bg-white rounded-[40px] border border-gray-100 p-8 md:p-12 shadow-sm">
        <div className="flex items-center mb-10">
          <div className="w-16 h-16 bg-orange-100 rounded-3xl flex items-center justify-center mr-6">
            <Sparkles className="w-8 h-8 text-orange-600" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900">Create Companion</h1>
            <p className="text-gray-500">Design your perfect AI learning partner.</p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-3">Companion Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Professor Pipsqueak" 
              className="w-full bg-gray-50 border-2 border-transparent focus:border-orange-500 focus:bg-white rounded-2xl py-4 px-6 outline-none transition-all text-lg font-bold"
            />
          </div>

          <div>
            <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-3">Topic to Master</label>
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Quantum Physics or Baking bread" 
              className="w-full bg-gray-50 border-2 border-transparent focus:border-orange-500 focus:bg-white rounded-2xl py-4 px-6 outline-none transition-all text-lg font-bold"
            />
          </div>

          <div>
            <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-3">Choose Subject</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {subjects.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`relative p-4 rounded-2xl border-2 transition-all flex flex-col items-center text-center ${
                    selectedSubject === sub 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                >
                  {selectedSubject === sub && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white rounded-full p-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                  <div className={`w-10 h-10 rounded-xl ${SUBJECT_METADATA[sub].color} flex items-center justify-center mb-2`}>
                    {SUBJECT_METADATA[sub].icon}
                  </div>
                  <span className={`text-xs font-bold ${selectedSubject === sub ? 'text-orange-600' : 'text-gray-500'}`}>{sub}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-3">Bio / Personality (Optional)</label>
            <textarea 
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell Richie how this tutor should act..." 
              className="w-full bg-gray-50 border-2 border-transparent focus:border-orange-500 focus:bg-white rounded-2xl py-4 px-6 outline-none transition-all font-medium"
            />
          </div>

          <Button 
            fullWidth 
            size="lg" 
            onClick={handleCreate}
            disabled={!name || !topic}
            className="rounded-3xl !py-6 text-xl shadow-xl shadow-orange-500/20"
          >
            Create Learning Companion
          </Button>
        </div>
      </div>
    </div>
  );
};
