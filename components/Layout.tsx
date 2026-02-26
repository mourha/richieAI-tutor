
import React from 'react';
import { 
  Home, 
  Library, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X,
  Sparkles,
  CreditCard,
  LogIn,
  Info,
  ShieldCheck
} from 'lucide-react';
import { AppView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  user: { name: string; email: string } | null;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, onNavigate, user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = user 
    ? [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'library', label: 'Tutors', icon: Library },
        { id: 'journey', label: 'Journey', icon: UserIcon },
        { id: 'pricing', label: 'Pricing', icon: CreditCard },
        { id: 'about', label: 'About', icon: Info },
        { id: 'admin', label: 'Admin', icon: ShieldCheck },
      ]
    : [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'about', label: 'About', icon: Info },
        { id: 'pricing', label: 'Pricing', icon: CreditCard },
        { id: 'admin', label: 'Admin', icon: ShieldCheck },
      ];

  const handleNavClick = (view: AppView) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#f8faff]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-indigo-100/50 px-4 md:px-12 py-3 lg:py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center cursor-pointer group" onClick={() => handleNavClick(user ? 'dashboard' : 'home')}>
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl shadow-indigo-500/20 group-hover:scale-105 transition-transform">
             <Sparkles className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-indigo-950">Richie <span className="text-indigo-400 font-medium">AI</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => handleNavClick(item.id as AppView)}
              className={`px-5 py-2.5 text-sm font-bold rounded-xl transition-all ${
                activeView === item.id 
                ? 'bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-200/50' 
                : 'text-indigo-400 hover:text-indigo-900 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="flex items-center ml-6 pl-6 border-l border-indigo-50">
            {user ? (
              <>
                <div className="flex items-center mr-4">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-100 to-indigo-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm mr-3">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="User" />
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-xs font-black text-indigo-950 leading-none mb-1">{user.name}</p>
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Free Plan</p>
                  </div>
                </div>
                <button 
                  onClick={() => window.location.reload()}
                  className="p-2.5 text-indigo-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button 
                onClick={() => handleNavClick('auth')}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-black rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-indigo-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white md:hidden pt-24 px-8 animate-in fade-in duration-300">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => handleNavClick(item.id as AppView)}
                className={`flex items-center p-4 text-xl font-bold rounded-2xl transition-all ${
                  activeView === item.id ? 'bg-indigo-50 text-indigo-600' : 'text-indigo-950'
                }`}
              >
                <item.icon className={`w-6 h-6 mr-4 ${activeView === item.id ? 'text-indigo-600' : 'text-indigo-300'}`} />
                {item.label}
              </button>
            ))}
            <hr className="border-indigo-50 my-4" />
            {user ? (
              <button 
                onClick={() => window.location.reload()}
                className="flex items-center p-4 text-xl font-bold text-red-500 hover:bg-red-50 rounded-2xl"
              >
                 <LogOut className="w-6 h-6 mr-4" /> Sign Out
              </button>
            ) : (
              <button 
                onClick={() => handleNavClick('auth')}
                className="flex items-center p-4 text-xl font-bold text-indigo-600 hover:bg-indigo-50 rounded-2xl"
              >
                 <LogIn className="w-6 h-6 mr-4" /> Sign In
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        {children}
      </main>
    </div>
  );
};
