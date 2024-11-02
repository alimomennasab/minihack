import React from 'react';
import { Recipe } from '@/types';

interface RecipeBoxProps {
  recipe: Recipe;
  onClick: () => void;
}

const RecipeBox: React.FC<RecipeBoxProps> = ({ recipe, onClick }) => {
  return (
    <div 
      className="h-60 w-56 box-border size-full border-2 rounded-xl text-black border-black bg-yellow-50 cursor-pointer"
      onClick={onClick}
    >
      <div className="pt-4 pb-4 text-center font-black font-serif text-black">
        {recipe.name}
      </div>
      <div className="pb-1 my-auto w-54 content-center border-t-2 border-black"></div>
      <div className="pt-2 px-4 overflow-y-auto h-40">
        {recipe.instructions}
      </div>
    </div>
  );
};

export default RecipeBox;