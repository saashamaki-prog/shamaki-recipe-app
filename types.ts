
export interface Recipe {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isUserCreated?: boolean;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  savedRecipes: string[];
}

export type AppView = 'WELCOME' | 'AUTH' | 'HOME' | 'SEARCH' | 'PLUS' | 'PROFILE' | 'CHAT' | 'SETTINGS';

export interface Country {
  name: string;
  code: string;
  region: string;
}
