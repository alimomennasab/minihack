/* eslint-disable react/no-unescaped-entities */
import React from 'react';

interface RecipeCardProps {
  ingredient: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ ingredient }) => (
  <div className="bg-white border border-black h-48 w-48 p-4 rounded-lg shadow hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
    <div className="text-center font-medium text-gray-800">{ingredient}</div>
    {/* Add more content as needed */}
  </div>
);

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
      <div className="w-3/4 h-3/5 rounded-lg flex flex-col justify-center items-center align-middle">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">
          {ingredients.map((ingredient, index) => (
            <RecipeCard key={index} ingredient={ingredient} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeGrid;