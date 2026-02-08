
import React, { useState, useMemo } from 'react';
import { Search as SearchIcon, Globe, ChevronRight, Loader2, Sparkles, Utensils } from 'lucide-react';
import { ALL_COUNTRIES } from '../constants';
import { Country, Recipe } from '../types';
import { getRecipeFromAI, searchRecipeGlobally } from '../services/gemini';

interface SearchProps {
  onRecipeClick: (recipe: Recipe) => void;
}

const Search: React.FC<SearchProps> = ({ onRecipeClick }) => {
  const [query, setQuery] = useState('');
  const [isSearchingGlobal, setIsSearchingGlobal] = useState(false);
  const [loadingCountry, setLoadingCountry] = useState<string | null>(null);

  const filteredCountries = useMemo(() => {
    if (!query) return ALL_COUNTRIES.slice(0, 15); // Show first 15 if empty
    return ALL_COUNTRIES.filter(c => 
      c.name.toLowerCase().includes(query.toLowerCase()) || 
      c.region.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 20); // Limit to 20 for performance
  }, [query]);

  const handleCountrySelect = async (country: Country) => {
    setLoadingCountry(country.name);
    try {
      const recipe = await getRecipeFromAI(country.name);
      onRecipeClick(recipe as Recipe);
    } catch (err) {
      console.error(err);
      alert("Could not fetch recipe for " + country.name);
    } finally {
      setLoadingCountry(null);
    }
  };

  const handleGlobalSearch = async () => {
    if (!query.trim() || isSearchingGlobal) return;
    setIsSearchingGlobal(true);
    try {
      const recipe = await searchRecipeGlobally(query);
      onRecipeClick(recipe as Recipe);
    } catch (err) {
      console.error(err);
      alert("No recipes found for '" + query + "'");
    } finally {
      setIsSearchingGlobal(false);
    }
  };

  return (
    <div className="px-6 pt-8 pb-12 animate-in fade-in duration-500">
      <h1 className="text-2xl font-black text-slate-800 mb-2 uppercase tracking-tight">Search</h1>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">Explore dishes or countries</p>
      
      <div className="relative mb-6">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGlobalSearch()}
          placeholder="Try 'Pasta' or 'Nigeria'..."
          className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
        />
      </div>

      {query.length > 1 && (
        <button
          onClick={handleGlobalSearch}
          disabled={isSearchingGlobal || loadingCountry !== null}
          className="w-full mb-8 p-4 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-100 flex items-center justify-between group active:scale-95 transition-all"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              {isSearchingGlobal ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
            </div>
            <div className="text-left">
              <p className="font-bold text-sm">Search globally for "{query}"</p>
              <p className="text-[10px] text-indigo-100 font-medium">Powered by Chef AI</p>
            </div>
          </div>
          <ChevronRight size={18} className="opacity-50 group-hover:opacity-100 transition-opacity" />
        </button>
      )}

      <div className="space-y-4">
        <div className="flex justify-between items-center mb-2 px-1">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {query ? 'Country Results' : 'Suggested Countries'}
          </span>
          <Globe size={14} className="text-slate-300" />
        </div>
        
        {filteredCountries.length === 0 && !isSearchingGlobal && (
          <div className="py-12 text-center bg-white rounded-3xl border border-dashed border-slate-200">
            <Utensils className="mx-auto text-slate-200 mb-3" size={32} />
            <p className="text-sm font-bold text-slate-400">No matching countries</p>
            <p className="text-xs text-slate-300 mt-1">Try the global AI search above!</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-2">
          {filteredCountries.map((country) => (
            <button
              key={country.code}
              disabled={loadingCountry !== null || isSearchingGlobal}
              onClick={() => handleCountrySelect(country)}
              className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="flex items-center space-x-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-sm font-black shadow-inner group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  {loadingCountry === country.name ? <Loader2 className="animate-spin" size={18} /> : country.code}
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-800 text-sm">{country.name}</p>
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.1em]">{country.region}</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              
              {loadingCountry === country.name && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-20">
                  <span className="text-[10px] font-black text-indigo-600 uppercase animate-pulse">Consulting Chef...</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
