
import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react';
import { Button } from './Button';

interface AuthViewProps {
  onSuccess: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 animate-in fade-in zoom-in duration-500">
      <div className="w-full max-w-md bg-white rounded-[48px] border border-indigo-50 shadow-2xl shadow-indigo-100/50 p-10 md:p-12">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-indigo-600 rounded-[28px] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-200 rotate-3">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black text-indigo-950 tracking-tight mb-2">
            {isLogin ? 'Welcome Back' : 'Join Richie AI'}
          </h1>
          <p className="text-indigo-400 font-medium">
            {isLogin ? 'Continue your learning journey' : 'Start mastering new subjects today'}
          </p>
        </div>

        <div className="space-y-4">
          {!isLogin && (
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-300 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full bg-indigo-50/30 border border-indigo-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
              />
            </div>
          )}
          
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-300 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full bg-indigo-50/30 border border-indigo-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-300 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full bg-indigo-50/30 border border-indigo-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
            />
          </div>

          <Button 
            variant="primary" 
            fullWidth 
            onClick={onSuccess}
            className="!py-4 rounded-2xl text-lg font-black shadow-xl shadow-indigo-500/20 mt-4"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-indigo-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest font-black text-indigo-300">
            <span className="bg-white px-4">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-indigo-100 hover:bg-indigo-50 transition-colors font-bold text-indigo-950">
            <Chrome className="w-5 h-5" />
            Google
          </button>
          <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-indigo-100 hover:bg-indigo-50 transition-colors font-bold text-indigo-950">
            <Github className="w-5 h-5" />
            GitHub
          </button>
        </div>

        <p className="mt-10 text-center text-sm font-bold text-indigo-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};
