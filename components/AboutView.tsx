
import React from 'react';
import { Target, Users, Shield, Zap, Heart, Sparkles, ArrowLeft } from 'lucide-react';
import { Button } from './Button';
import { AppView } from '../types';

interface AboutViewProps {
  onNavigate: (view: AppView) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <button 
        onClick={() => onNavigate('home')} 
        className="flex items-center text-indigo-400 hover:text-indigo-600 mb-12 font-bold transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
      </button>

      <header className="mb-20">
        <h1 className="text-5xl lg:text-7xl font-black text-indigo-950 tracking-tight mb-8">
          Democratizing <span className="text-gradient">Education</span> for Everyone.
        </h1>
        <p className="text-xl lg:text-2xl text-indigo-400 font-medium leading-relaxed max-w-3xl">
          Richie was born from a simple idea: that high-quality, personalized tutoring should be accessible to every learner on the planet, regardless of their location or language.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-32">
        <div>
          <h2 className="text-3xl font-black text-indigo-950 mb-6">Our Mission</h2>
          <p className="text-indigo-400 text-lg leading-relaxed mb-8">
            We are building the world's most advanced AI learning platform. By combining cutting-edge generative AI with proven pedagogical techniques, we create learning experiences that are not just informative, but truly transformative.
          </p>
          <div className="space-y-4">
            {[
              "Personalized learning paths for every student",
              "Support for local languages and cultures",
              "Affordable access to world-class expertise",
              "Safe and encouraging learning environment"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3 h-3 text-indigo-600" />
                </div>
                <span className="text-indigo-900 font-bold">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full"></div>
          <img 
            src="https://picsum.photos/seed/mission/800/800" 
            className="relative z-10 rounded-[48px] shadow-2xl border-4 border-white"
            alt="Our Mission"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <section className="mb-32">
        <h2 className="text-3xl lg:text-5xl font-black text-indigo-950 text-center mb-16">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Heart className="w-6 h-6 text-red-500" />,
              title: "Learner First",
              desc: "Every feature we build starts with the question: 'How does this help the student?'"
            },
            {
              icon: <Shield className="w-6 h-6 text-indigo-500" />,
              title: "Trust & Safety",
              desc: "We prioritize data privacy and create a safe space for curiosity and mistakes."
            },
            {
              icon: <Zap className="w-6 h-6 text-orange-500" />,
              title: "Innovation",
              desc: "We constantly push the boundaries of what's possible in educational technology."
            },
            {
              icon: <Users className="w-6 h-6 text-purple-500" />,
              title: "Inclusion",
              desc: "Education is a right, not a privilege. We build for the global majority."
            },
            {
              icon: <Target className="w-6 h-6 text-emerald-500" />,
              title: "Excellence",
              desc: "We strive for the highest quality in our AI models and user experiences."
            }
          ].map((value, i) => (
            <div key={i} className="bg-white border border-indigo-50 p-8 rounded-[32px] hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-black text-indigo-950 mb-3">{value.title}</h3>
              <p className="text-indigo-400 font-medium text-sm leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-indigo-50 rounded-[48px] p-12 lg:p-20 text-center">
        <h2 className="text-3xl lg:text-5xl font-black text-indigo-950 mb-8">Join the Revolution</h2>
        <p className="text-xl text-indigo-400 font-medium mb-12 max-w-2xl mx-auto">
          Whether you're a student, a teacher, or a lifelong learner, there's a place for you at Richie.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" onClick={() => onNavigate('auth')} className="!px-10 rounded-2xl">Start Learning</Button>
          <Button variant="secondary" size="lg" className="!px-10 rounded-2xl">Contact Us</Button>
        </div>
      </div>
    </div>
  );
};
