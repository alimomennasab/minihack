import React from 'react';
import RecipeBox from './recipeBox';
import { Recipe } from '@/types';

interface RecipeGridProps {
  recipes: Recipe[];
  usedIngredients: string[];
  onRecipeClick: (recipe: Recipe) => void;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes, usedIngredients, onRecipeClick }) => {
  return (
    <div className='min-h-screen h-screen w-screen flex flex-col items-center justify-center bg-[#465B43]'>
      <div className='text-white text-5xl mb-4'>
        Generated Recipes
      </div>
      <div className='text-white italic p-4'>
        Made with {usedIngredients.join(', ')}
      </div>
      <div className="w-3/4 h-3/5 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">
          {recipes.map((recipe, index) => (
            <RecipeBox 
              key={index} 
              recipe={recipe} 
              onClick={() => onRecipeClick(recipe)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeGrid;