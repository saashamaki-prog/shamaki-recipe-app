
import React from 'react';
import { Home, Search, Plus, User, Settings, MessageSquare } from 'lucide-react';
import { AppView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  onNavigate: (view: AppView) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onNavigate }) => {
  const navItems = [
    { id: 'HOME' as AppView, label: 'Home', icon: Home },
    { id: 'SEARCH' as AppView, label: 'Search', icon: Search },
    { id: 'PLUS' as AppView, label: 'Plus', icon: Plus },
    { id: 'CHAT' as AppView, label: 'Chat', icon: MessageSquare },
    { id: 'PROFILE' as AppView, label: 'Profile', icon: User },
    { id: 'SETTINGS' as AppView, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 max-w-md mx-auto relative overflow-hidden shadow-2xl border-x border-slate-200">
      <main className="flex-1 overflow-y-auto pb-24 no-scrollbar">
        {children}
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-200 px-4 py-3 flex justify-between items-center z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center transition-all ${
                isActive ? 'text-indigo-600 scale-110' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Icon size={isActive ? 24 : 22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
