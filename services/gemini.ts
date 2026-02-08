
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from "../types";

const API_KEY = process.env.API_KEY || "";
const genAI = new GoogleGenAI({ apiKey: API_KEY });

export const getRecipeFromAI = async (country: string, dishName?: string): Promise<Partial<Recipe>> => {
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate an authentic recipe from ${country}${dishName ? ` for ${dishName}` : ''}. Return in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
            instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
            prepTime: { type: Type.STRING },
            difficulty: { type: Type.STRING },
          },
          required: ["name", "description", "ingredients", "instructions", "prepTime", "difficulty"],
        },
      },
    });

    const result = JSON.parse(response.text);
    return {
      ...result,
      id: Math.random().toString(36).substr(2, 9),
      country,
      image: `https://picsum.photos/seed/${encodeURIComponent(result.name)}/800/600`,
    };
  } catch (error) {
    console.error("Error fetching recipe from AI:", error);
    throw error;
  }
};

export const searchRecipeGlobally = async (query: string): Promise<Partial<Recipe>> => {
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Find an authentic recipe for "${query}". Identify the country of origin and return the full recipe details in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            country: { type: Type.STRING, description: "Country of origin for this dish" },
            description: { type: Type.STRING },
            ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
            instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
            prepTime: { type: Type.STRING },
            difficulty: { type: Type.STRING },
          },
          required: ["name", "country", "description", "ingredients", "instructions", "prepTime", "difficulty"],
        },
      },
    });

    const result = JSON.parse(response.text);
    return {
      ...result,
      id: Math.random().toString(36).substr(2, 9),
      image: `https://picsum.photos/seed/${encodeURIComponent(result.name)}/800/600`,
    };
  } catch (error) {
    console.error("Error searching recipe globally:", error);
    throw error;
  }
};

export const chatWithAI = async (message: string, context?: string) => {
  const chat = genAI.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: "You are a world-class chef and culinary historian for Shamaki's Recipe app. You help users find and cook recipes from all 195 countries. Be helpful, concise, and passionate about global flavors. Context: " + (context || "General cooking help"),
    },
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};
