
import React, { useState } from 'react';
import { Camera, Plus, X, ChevronRight, Check } from 'lucide-react';
import { ALL_COUNTRIES } from '../constants';
import { Recipe } from '../types';

interface CreateRecipeProps {
  onSave: (recipe: Recipe) => void;
}

const CreateRecipe: React.FC<CreateRecipeProps> = ({ onSave }) => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('USA');
  const [description, setDescription] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [instructions, setInstructions] = useState<string[]>(['']);
  const [image, setImage] = useState('https://picsum.photos/seed/newrecipe/800/600');

  const handleAddIngredient = () => setIngredients([...ingredients, '']);
  const handleIngredientChange = (index: number, value: string) => {
    const newIngs = [...ingredients];
    newIngs[index] = value;
    setIngredients(newIngs);
  };

  const handleAddInstruction = () => setInstructions([...instructions, '']);
  const handleInstructionChange = (index: number, value: string) => {
    const newInst = [...instructions];
    newInst[index] = value;
    setInstructions(newInst);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecipe: Recipe = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      country,
      description,
      prepTime: prepTime || '30 mins',
      difficulty,
      ingredients: ingredients.filter(i => i.trim()),
      instructions: instructions.filter(i => i.trim()),
      image,
      isUserCreated: true
    };
    onSave(newRecipe);
  };

  return (
    <div className="px-6 pt-8 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">New Recipe</h2>
        <p className="text-slate-500 text-sm">Add your specialty to Shamaki's collection</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Image Placeholder */}
        <div className="relative aspect-video rounded-3xl bg-slate-100 overflow-hidden border-2 border-dashed border-slate-200 flex flex-col items-center justify-center group cursor-pointer">
          <img src={image} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" alt="Preview" />
          <div className="relative z-10 flex flex-col items-center text-slate-400 group-hover:text-indigo-500 transition-colors">
            <Camera size={32} strokeWidth={1.5} />
            <span className="text-xs font-bold mt-2 uppercase tracking-widest">Change Photo</span>
          </div>
        </div>

        {/* Basic Info */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Dish Name</label>
            <input 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Grandma's Secret Stew"
              className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Country</label>
              <select 
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-medium appearance-none"
              >
                {ALL_COUNTRIES.map(c => <option key={c.code} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Difficulty</label>
              <select 
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-medium appearance-none"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">The Story / Description</label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us about this dish..."
            className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-medium min-h-[100px]"
          />
        </div>

        {/* Ingredients */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ingredients</label>
            <button type="button" onClick={handleAddIngredient} className="text-indigo-600 hover:text-indigo-700">
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-2">
            {ingredients.map((ing, idx) => (
              <input 
                key={idx}
                value={ing}
                onChange={(e) => handleIngredientChange(idx, e.target.value)}
                placeholder={`Ingredient #${idx + 1}`}
                className="w-full bg-white border border-slate-100 rounded-xl py-3 px-4 focus:ring-1 focus:ring-indigo-400 outline-none transition-all text-sm"
              />
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Instructions</label>
            <button type="button" onClick={handleAddInstruction} className="text-indigo-600 hover:text-indigo-700">
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-2">
            {instructions.map((inst, idx) => (
              <div key={idx} className="flex space-x-2">
                <span className="text-xs font-black text-slate-300 pt-3">{idx + 1}</span>
                <textarea 
                  value={inst}
                  onChange={(e) => handleInstructionChange(idx, e.target.value)}
                  placeholder={`Step #${idx + 1}`}
                  className="w-full bg-white border border-slate-100 rounded-xl py-3 px-4 focus:ring-1 focus:ring-indigo-400 outline-none transition-all text-sm min-h-[60px]"
                />
              </div>
            ))}
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-slate-800 text-white py-4 rounded-2xl font-black shadow-xl shadow-slate-200 hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center space-x-2"
        >
          <Check size={20} />
          <span>PUBLISH RECIPE</span>
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
