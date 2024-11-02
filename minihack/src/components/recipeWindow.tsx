"use client";
import React from 'react';
import { Recipe } from '@/types';

interface RecipeWindowProps {
  recipe: Recipe | null;
}

const RecipeWindow: React.FC<RecipeWindowProps> = ({ recipe }) => {
  if (!recipe) return null;

  return (
    <div className='min-h-screen h-screen w-screen flex items-center justify-center'>
      <div className="bg-white w-2/6 h-3/4 border-black rounded-3xl border-2">
        <div className="mt-4 text-3xl font-bold text-center text-black">
          {recipe.name}
        </div>
        <div className="mt-4 mx-10 bg-white border-black rounded-3xl border-2 overflow-scroll h-4/6">
          <div className='mt-2 mx-4 text-black'>
            {recipe.instructions}
          </div>
        </div>
        <div className="flex items-center justify-center mt-10">
          <button className='bg-dg rounded-lg p-2 text-white w-1/2'>
            Copy Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeWindow;