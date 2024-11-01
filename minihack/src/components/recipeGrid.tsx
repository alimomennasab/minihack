/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import RecipeBox from './recipeBox';

interface Recipe {
  name: string;
  ingredients: string;
  instructions: string;
}

const ingredients = ['chicken', 'rice', 'tomatoes', 'stuff', 'things', 'test', 'burger', 'fries'] as const;

const RecipeGrid = () => {
  return (
    <div className='min-h-screen h-screen w-screen flex flex-col items-center justify-center bg-[#465B43]'>
      {/* Title & Ingredients list */}
      <div className='text-white text-5xl mb-4'>
        Generated Recipes
      </div>
      <div className='text-white italic p-4'>
        Made with {ingredients.join(', ')}
      </div>
      {/* Grid */}
      <div className="w-3/4 h-3/5 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">
          {ingredients.map((ingredient, index) => (
            <RecipeBox key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeGrid;