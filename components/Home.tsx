
import React from 'react';
import { FEATURED_RECIPES } from '../constants';
import { Recipe } from '../types';

interface HomeProps {
  onRecipeClick: (recipe: Recipe) => void;
}

const Home: React.FC<HomeProps> = ({ onRecipeClick }) => {
  return (
    <div className="px-6 pt-8 pb-4">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Explore</h1>
          <p className="text-slate-500 text-sm font-medium">195 Countries, 1 Plate</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
          <span className="font-bold">G</span>
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4 px-1">Featured Dishes</h2>
        <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-4 -mx-1 px-1">
          {FEATURED_RECIPES.map((recipe) => (
            <button
              key={recipe.id}
              onClick={() => onRecipeClick(recipe)}
              className="flex-shrink-0 w-64 text-left group"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 shadow-md">
                <img 
                  src={recipe.image} 
                  alt={recipe.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur py-1 px-3 rounded-full text-[10px] font-bold text-indigo-600 shadow-sm">
                  {recipe.difficulty}
                </div>
              </div>
              <h3 className="font-bold text-slate-800 truncate">{recipe.name}</h3>
              <p className="text-xs text-slate-500 font-medium">{recipe.country} • {recipe.prepTime}</p>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-4 px-1">Recent Globally</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-4 p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
              <img 
                src={`https://picsum.photos/seed/${i + 10}/200`} 
                className="w-20 h-20 rounded-xl object-cover" 
                alt="Recent" 
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-800 truncate">Sauerbraten</h4>
                <p className="text-xs text-slate-500">Germany • Main Course</p>
                <div className="flex items-center mt-2 space-x-2">
                  <div className="w-5 h-5 rounded-full bg-slate-100"></div>
                  <span className="text-[10px] font-medium text-slate-400">Chef Hans</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
