
import React, { useState } from 'react';

interface AuthProps {
  onLogin: () => void;
  isWelcome: boolean;
}

const Auth: React.FC<AuthProps> = ({ onLogin, isWelcome: initialIsWelcome }) => {
  const [view, setView] = useState<'WELCOME' | 'REGISTRATION'>(initialIsWelcome ? 'WELCOME' : 'REGISTRATION');

  if (view === 'WELCOME') {
    return (
      <div className="flex flex-col h-screen bg-white max-w-md mx-auto">
        <div className="flex-1 flex flex-col items-center justify-center px-8 space-y-8">
          <div className="w-64 h-80 bg-slate-100 border-2 border-slate-200 rounded-xl flex items-center justify-center relative overflow-hidden group">
            <img 
              src="https://picsum.photos/seed/chef/600/800" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              alt="Welcome" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="relative z-10 text-white font-bold text-xl text-center px-4 uppercase tracking-widest leading-tight">Shamaki's Recipe</span>
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Welcome</h1>
          <button 
            onClick={() => setView('REGISTRATION')}
            className="w-full bg-slate-800 text-white py-4 rounded-full font-bold text-lg hover:bg-slate-700 transition-colors shadow-lg"
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white max-w-md mx-auto px-8 pt-12">
      <div className="w-full aspect-video bg-slate-100 rounded-xl mb-12 flex items-center justify-center relative overflow-hidden">
        <img src="https://picsum.photos/seed/reg/800/400" className="absolute inset-0 w-full h-full object-cover" alt="Reg" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <h2 className="text-center font-bold text-lg uppercase tracking-widest text-slate-500 mb-8">Registration</h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase">Enter Your Email</label>
          <input 
            type="email" 
            placeholder="email@example.com"
            className="w-full bg-slate-100 border-none rounded-xl py-4 px-6 focus:ring-2 focus:ring-slate-400 transition-all outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase">Password</label>
          <input 
            type="password" 
            placeholder="••••••••"
            className="w-full bg-slate-100 border-none rounded-xl py-4 px-6 focus:ring-2 focus:ring-slate-400 transition-all outline-none"
          />
        </div>

        <button className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase w-full text-center">
          Forgot Password?
        </button>

        <button 
          className="w-full bg-slate-200 text-slate-700 py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-slate-300 transition-colors"
        >
          <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
          <span>Enter with Google account</span>
        </button>

        <button 
          onClick={onLogin}
          className="w-full bg-slate-800 text-white py-4 rounded-full font-bold text-lg hover:bg-slate-700 transition-colors shadow-lg mt-8"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Auth;
