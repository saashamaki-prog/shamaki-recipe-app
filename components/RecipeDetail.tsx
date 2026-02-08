
import React from 'react';
import { ArrowLeft, Clock, BarChart, Heart, Share2, Globe, Bookmark } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  isLiked: boolean;
  isSaved: boolean;
  onToggleLike: () => void;
  onToggleSave: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ 
  recipe, 
  onBack, 
  isLiked, 
  isSaved, 
  onToggleLike, 
  onToggleSave 
}) => {
  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-96">
        <img src={recipe.image} className="w-full h-full object-cover" alt={recipe.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30" />
        
        <button 
          onClick={onBack}
          className="absolute top-12 left-6 w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/40 transition-all"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="absolute top-12 right-6 flex space-x-3">
          <button 
            onClick={onToggleLike}
            className={`w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center transition-all ${
              isLiked ? 'bg-red-500 text-white shadow-lg' : 'bg-white/20 text-white hover:bg-white/40'
            }`}
          >
            <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={onToggleSave}
            className={`w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center transition-all ${
              isSaved ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white/20 text-white hover:bg-white/40'
            }`}
          >
            <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
          </button>
          <button className="w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/40 transition-all">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      <div className="relative -mt-12 bg-white rounded-t-[40px] px-8 pt-10 pb-20">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
          <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">{recipe.country}</span>
        </div>
        
        <h1 className="text-3xl font-black text-slate-800 mb-6 tracking-tight leading-tight">{recipe.name}</h1>

        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="flex flex-col items-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <Clock size={16} className="text-indigo-500 mb-1" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">Prep</span>
            <span className="text-xs font-black text-slate-700">{recipe.prepTime}</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <BarChart size={16} className="text-indigo-500 mb-1" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">Ease</span>
            <span className="text-xs font-black text-slate-700">{recipe.difficulty}</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <Globe size={16} className="text-indigo-500 mb-1" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">Orig.</span>
            <span className="text-xs font-black text-slate-700">Native</span>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-black text-slate-800 mb-4 tracking-tight">The Story</h2>
          <p className="text-slate-500 text-sm leading-relaxed">{recipe.description}</p>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-black text-slate-800 mb-4 tracking-tight">Ingredients</h2>
          <ul className="space-y-3">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex items-center space-x-3 text-sm text-slate-600 bg-slate-50/50 p-3 rounded-xl">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-200"></div>
                <span>{ing}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-black text-slate-800 mb-4 tracking-tight">Preparation</h2>
          <div className="space-y-6">
            {recipe.instructions.map((step, i) => (
              <div key={i} className="flex space-x-4">
                <span className="text-2xl font-black text-indigo-100 leading-none">{i + 1}</span>
                <p className="text-sm text-slate-600 leading-relaxed pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
