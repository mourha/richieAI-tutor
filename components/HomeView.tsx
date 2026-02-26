
import React from 'react';
import { Sparkles, Mic, Brain, Globe, ArrowRight, CheckCircle, Users, Zap } from 'lucide-react';
import { Button } from './Button';
import { AppView } from '../types';

interface HomeViewProps {
  onNavigate: (view: AppView) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-1000">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-indigo-100">
            <Sparkles className="w-4 h-4 mr-2" /> The Future of Learning is Here
          </div>
          <h1 className="text-5xl lg:text-8xl font-black text-indigo-950 tracking-tight leading-[0.9] mb-8">
            Master Any Skill with <span className="text-gradient">Richie.</span>
          </h1>
          <p className="text-xl lg:text-2xl text-indigo-400 font-medium max-w-3xl mx-auto mb-12 leading-relaxed">
            Your personal AI tutor that speaks your language. Interactive voice lessons, personalized curriculum, and 24/7 support.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={() => onNavigate('auth')} className="!px-10 !py-6 text-xl rounded-3xl shadow-2xl shadow-indigo-500/30">
              Start Learning Free
            </Button>
            <Button variant="secondary" size="lg" onClick={() => onNavigate('about')} className="!px-10 !py-6 text-xl rounded-3xl">
              How it Works
            </Button>
          </div>

          <div className="mt-20 relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-[60px]"></div>
            <img 
              src="https://picsum.photos/seed/learning/1200/600" 
              className="relative z-10 rounded-[40px] lg:rounded-[60px] border-8 border-white shadow-2xl w-full object-cover h-[300px] lg:h-[500px]"
              alt="Richie App Preview"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-black text-indigo-950 mb-6">Built for Modern Learners</h2>
            <p className="text-xl text-indigo-400 font-medium max-w-2xl mx-auto">Everything you need to accelerate your learning journey and master complex topics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: <Mic className="w-8 h-8 text-indigo-600" />,
                title: "Voice Interaction",
                desc: "Talk to your tutor naturally. Perfect for language learning and hands-free study sessions."
              },
              {
                icon: <Brain className="w-8 h-8 text-purple-600" />,
                title: "Adaptive Learning",
                desc: "Richie adjusts to your pace, simplifying complex topics when you're stuck and challenging you when you're ready."
              },
              {
                icon: <Globe className="w-8 h-8 text-emerald-600" />,
                title: "Multilingual Support",
                desc: "Learn in your native tongue. Specialized tutors for Hausa, English, and more."
              }
            ].map((feature, i) => (
              <div key={i} className="p-10 rounded-[40px] bg-indigo-50/30 border border-indigo-50 hover:border-indigo-200 transition-all group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black text-indigo-950 mb-4">{feature.title}</h3>
                <p className="text-indigo-400 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-indigo-950 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { label: "Active Learners", value: "50K+" },
              { label: "Lessons Completed", value: "1M+" },
              { label: "AI Tutors", value: "100+" },
              { label: "Success Rate", value: "98%" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl lg:text-6xl font-black mb-2">{stat.value}</div>
                <div className="text-indigo-300 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[60px] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-500/40">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <h2 className="text-4xl lg:text-6xl font-black mb-8 relative z-10">Ready to start your journey?</h2>
            <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto relative z-10">Join thousands of students mastering new skills every day with Richie.</p>
            <Button variant="secondary" size="lg" onClick={() => onNavigate('auth')} className="!bg-white !text-indigo-950 !px-12 !py-6 text-xl rounded-3xl relative z-10 hover:scale-105 transition-transform">
              Get Started for Free
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
