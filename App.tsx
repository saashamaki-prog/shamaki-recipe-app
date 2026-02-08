
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Auth from './components/Auth';
import Home from './components/Home';
import Search from './components/Search';
import Profile from './components/Profile';
import RecipeDetail from './components/RecipeDetail';
import ChatAI from './components/ChatAI';
import Settings from './components/Settings';
import CreateRecipe from './components/CreateRecipe';
import { AppView, Recipe } from './types';
import { FEATURED_RECIPES } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('WELCOME');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  
  // Persistence state
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>(FEATURED_RECIPES);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setView('HOME');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView('WELCOME');
    setSelectedRecipe(null);
  };

  const handleRecipeClick = (recipe: Recipe) => {
    // Add to local collection if it's from AI so we can reference it in Profile
    if (!allRecipes.find(r => r.id === recipe.id)) {
      setAllRecipes(prev => [recipe, ...prev]);
    }
    setSelectedRecipe(recipe);
  };

  const handleAddRecipe = (newRecipe: Recipe) => {
    setAllRecipes(prev => [newRecipe, ...prev]);
    setSelectedRecipe(newRecipe);
    setView('HOME');
  };

  const handleNavigate = (newView: AppView) => {
    setSelectedRecipe(null);
    setView(newView);
  };

  const toggleLike = (id: string) => {
    setLikedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSave = (id: string) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  // Auth & Onboarding Flow
  if (view === 'WELCOME' || view === 'AUTH') {
    return <Auth onLogin={handleLogin} isWelcome={view === 'WELCOME'} />;
  }

  // Content Views
  const renderContent = () => {
    if (selectedRecipe) {
      return (
        <RecipeDetail 
          recipe={selectedRecipe} 
          onBack={() => setSelectedRecipe(null)}
          isLiked={likedIds.includes(selectedRecipe.id)}
          isSaved={savedIds.includes(selectedRecipe.id)}
          onToggleLike={() => toggleLike(selectedRecipe.id)}
          onToggleSave={() => toggleSave(selectedRecipe.id)}
        />
      );
    }

    switch (view) {
      case 'HOME':
        return <Home onRecipeClick={handleRecipeClick} />;
      case 'SEARCH':
        return <Search onRecipeClick={handleRecipeClick} />;
      case 'PROFILE':
        return (
          <Profile 
            allRecipes={allRecipes}
            likedIds={likedIds}
            savedIds={savedIds}
            onRecipeClick={handleRecipeClick}
          />
        );
      case 'CHAT':
        return <ChatAI />;
      case 'PLUS':
        return <CreateRecipe onSave={handleAddRecipe} />;
      case 'SETTINGS':
        return <Settings onLogout={handleLogout} />;
      default:
        return <Home onRecipeClick={handleRecipeClick} />;
    }
  };

  return (
    <Layout activeView={view} onNavigate={handleNavigate}>
      {renderContent()}
    </Layout>
  );
};

export default App;
