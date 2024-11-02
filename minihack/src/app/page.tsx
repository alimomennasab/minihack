/* eslint-disable @typescript-eslint/no-require-imports */
"use client";
import { useState } from 'react';
import RecipeWindow from '@/components/recipeWindow';
import IngredientInputWindow from '@/components/ingredientInputWindow';
import RecipeGrid from '@/components/recipeGrid';
import { Recipe } from '@/types';
const { GoogleGenerativeAI } = require("@google/generative-ai");

export default function Page() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [usedIngredients, setUsedIngredients] = useState<string[]>([]);

  const parseRecipes = (text: string): Recipe[] => {
    // Split the text into sections by recipe titles
    const recipeSections = text.split(/\*\*[^*]+:\*\*/);
    // First element will be empty or contain any text before the first recipe
    recipeSections.shift();
    // Get all recipe titles
    const recipeTitles: string[] = [];
    text.match(/\*\*([^*]+):\*\*/)?.forEach(title => {
      recipeTitles.push(title.replace(/\*\*/g, '').replace(':', ''));
    });

    const recipes: Recipe[] = [];
    recipeSections.forEach((section, index) => {
      const instructions = section
        .trim()
        .split('\n')
        .map(instruction => instruction.trim())
        .filter(instruction => instruction.match(/^\d+\./))
        .map(instruction => instruction.replace(/^\d+\.\s*/, ''));

      if (instructions.length > 0 && recipeTitles[index]) {
        recipes.push({
          name: recipeTitles[index],
          ingredients: [], // You'll need to modify this based on your needs
          instructions: instructions.join('\n')
        });
      }
    });
    return recipes;
  };

  const handleGenerateRecipes = async (
    ingredients: string,
    meal: string,
    special: string
  ) => {
    const ingredientsList = ingredients.split(',').map(i => i.trim());
    setUsedIngredients(ingredientsList);
    
    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_AI_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `Explain what recipes we can make with ${ingredients} for ${meal} ${special ? `that is ${special}` : ''} and output the recipes in the format food (not in a list): {instructions in numbered list form}. Do not say anything else besides the formatted recipes`;
      
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const parsedRecipes = parseRecipes(text);
      setRecipes(parsedRecipes);
    } catch (error) {
      console.error("Error generating recipes:", error);
      setRecipes([]);
    }
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <main className="relative">
      <IngredientInputWindow onGenerateRecipes={handleGenerateRecipes} />
      {recipes.length > 0 && (
        <RecipeGrid 
          recipes={recipes}
          usedIngredients={usedIngredients}
          onRecipeClick={handleRecipeClick}
        />
      )}
      {selectedRecipe && <RecipeWindow recipe={selectedRecipe} />}
    </main>
  );
}