
import React, { useState, useMemo } from 'react';
import { Camera, LogOut, UtensilsCrossed } from 'lucide-react';
import { Recipe } from '../types';

interface ProfileProps {
  allRecipes: Recipe[];
  likedIds: string[];
  savedIds: string[];
  onRecipeClick: (recipe: Recipe) => void;
}

const Profile: React.FC<ProfileProps> = ({ 
  allRecipes, 
  likedIds, 
  savedIds, 
  onRecipeClick 
}) => {
  const [avatar, setAvatar] = useState('https://picsum.photos/seed/user/400');
  const [activeTab, setActiveTab] = useState<'MY' | 'SAVED' | 'LIKES'>('LIKES');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) setAvatar(ev.target.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const displayedRecipes = useMemo(() => {
    if (activeTab === 'LIKES') {
      return allRecipes.filter(r => likedIds.includes(r.id));
    }
    if (activeTab === 'SAVED') {
      return allRecipes.filter(r => savedIds.includes(r.id));
    }
    if (activeTab === 'MY') {
      return allRecipes.filter(r => r.isUserCreated);
    }
    return [];
  }, [activeTab, allRecipes, likedIds, savedIds]);

  const uniqueCountriesCount = useMemo(() => {
    const countries = new Set(allRecipes.filter(r => likedIds.includes(r.id) || savedIds.includes(r.id)).map(r => r.country));
    return countries.size;
  }, [allRecipes, likedIds, savedIds]);

  return (
    <div className="px-6 pt-12 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col items-center mb-8">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-200">
            <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <label className="absolute bottom-0 right-0 bg-slate-800 text-white p-2 rounded-full cursor-pointer hover:bg-slate-700 shadow-lg border-2 border-white">
            <Camera size={16} />
            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
          </label>
        </div>
        <h2 className="mt-4 text-2xl font-black text-slate-800">Chef Julian</h2>
        <p className="text-slate-500 font-medium text-sm">Passionate for Global Flavors</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="text-center py-4 bg-white rounded-2xl shadow-sm border border-slate-100">
          <p className="text-lg font-black text-slate-800">{allRecipes.filter(r => r.isUserCreated).length}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">My Recipes</p>
        </div>
        <div className="text-center py-4 bg-white rounded-2xl shadow-sm border border-slate-100">
          <p className="text-lg font-black text-slate-800">{likedIds.length}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Likes</p>
        </div>
        <div className="text-center py-4 bg-white rounded-2xl shadow-sm border border-slate-100">
          <p className="text-lg font-black text-slate-800">{uniqueCountriesCount}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Countries</p>
        </div>
      </div>

      <div className="flex border-b border-slate-200 mb-6">
        <button 
          onClick={() => setActiveTab('MY')}
          className={`flex-1 pb-3 font-bold text-sm transition-all ${activeTab === 'MY' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400'}`}
        >
          My Creations
        </button>
        <button 
          onClick={() => setActiveTab('SAVED')}
          className={`flex-1 pb-3 font-bold text-sm transition-all ${activeTab === 'SAVED' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400'}`}
        >
          Saved
        </button>
        <button 
          onClick={() => setActiveTab('LIKES')}
          className={`flex-1 pb-3 font-bold text-sm transition-all ${activeTab === 'LIKES' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400'}`}
        >
          Likes
        </button>
      </div>

      {displayedRecipes.length === 0 ? (
        <div className="py-20 text-center text-slate-300 flex flex-col items-center">
          <UtensilsCrossed size={48} className="text-slate-100 mb-4" />
          <p className="text-sm font-medium italic">Nothing here yet. Go explore!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {displayedRecipes.map((recipe) => (
            <button 
              key={recipe.id} 
              onClick={() => onRecipeClick(recipe)}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-sm group text-left"
            >
              <img src={recipe.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={recipe.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 text-white">
                <p className="text-[10px] font-black uppercase text-indigo-300 tracking-wider leading-none mb-1">{recipe.country}</p>
                <p className="text-xs font-bold truncate">{recipe.name}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      <button className="w-full mt-12 mb-8 flex items-center justify-center space-x-2 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-colors">
        <LogOut size={16} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Profile;
