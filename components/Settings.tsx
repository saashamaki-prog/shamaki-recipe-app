
import React, { useState } from 'react';
import { Bell, Moon, Shield, Globe, User, ChevronRight, LogOut, HelpCircle, CreditCard } from 'lucide-react';

interface SettingsProps {
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onLogout }) => {
  const [toggles, setToggles] = useState({
    notifications: true,
    darkMode: false,
    privacy: false,
    autoSave: true
  });

  const toggleSwitch = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const SettingRow = ({ icon: Icon, label, value, onToggle, hasChevron }: any) => (
    <div 
      className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:border-indigo-100"
      onClick={onToggle && !hasChevron ? onToggle : undefined}
    >
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
          <Icon size={18} />
        </div>
        <span className="font-bold text-slate-700 text-sm">{label}</span>
      </div>
      
      {hasChevron ? (
        <ChevronRight size={18} className="text-slate-300" />
      ) : (
        <button 
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
          className={`w-11 h-6 rounded-full relative transition-colors duration-200 ease-in-out focus:outline-none ${
            value ? 'bg-indigo-600' : 'bg-slate-200'
          }`}
        >
          <div 
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${
              value ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      )}
    </div>
  );

  return (
    <div className="px-6 pt-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Settings</h2>
        <p className="text-slate-500 text-sm">Personalize your Shamaki's experience</p>
      </header>

      <section className="space-y-6">
        <div>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Account</h3>
          <div className="space-y-2">
            <SettingRow icon={User} label="Profile Information" hasChevron />
            <SettingRow icon={CreditCard} label="Subscription (Pro)" hasChevron />
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Preferences</h3>
          <div className="space-y-2">
            <SettingRow 
              icon={Bell} 
              label="Push Notifications" 
              value={toggles.notifications} 
              onToggle={() => toggleSwitch('notifications')} 
            />
            <SettingRow 
              icon={Moon} 
              label="Dark Appearance" 
              value={toggles.darkMode} 
              onToggle={() => toggleSwitch('darkMode')} 
            />
            <SettingRow icon={Globe} label="Language" hasChevron />
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Security & Privacy</h3>
          <div className="space-y-2">
            <SettingRow 
              icon={Shield} 
              label="Private Profile" 
              value={toggles.privacy} 
              onToggle={() => toggleSwitch('privacy')} 
            />
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Support</h3>
          <div className="space-y-2">
            <SettingRow icon={HelpCircle} label="Help Center" hasChevron />
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="w-full mt-8 flex items-center justify-center space-x-2 py-4 bg-red-50 text-red-600 rounded-2xl font-black text-sm hover:bg-red-100 transition-colors border border-red-100"
        >
          <LogOut size={18} />
          <span>SIGN OUT</span>
        </button>
      </section>
      
      <div className="mt-12 text-center">
        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Shamaki's Recipe v1.0.4</p>
      </div>
    </div>
  );
};

export default Settings;
