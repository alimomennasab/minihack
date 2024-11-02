import React, { useState } from 'react';
import RecipeWindow from './recipeWindow';
const RecipeBox = () => {
  const[recipeWindow, setRecipeWindow] = useState(false);
  const toggleWindow = () => {
    setRecipeWindow(!recipeWindow);
  };
  return (
    <div onClick={toggleWindow}>
      <div className="h-60 w-56 box-border size-full border-2 rounded-xl text-black border-black bg-tan">
        <div className="pt-4 pb-4 text-center font-black font-serif text-black"> Recipe Name</div>
        <div className="pb-1 my-auto w-54 content-center border-t-2 border-black"></div>
        <div className="pt-2 px-4 overflow-y-auto h-40">Lorem ipsum odor amet, consectetuer adipiscing elit. Sagittis fermentum vehicula tellus fringilla dignissim. Ullamcorper auctor lobortis suspendisse diam hac feugiat mus leo.</div>
      </div>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'> 
      {recipeWindow && <RecipeWindow />} 
        </div>  
    </div>
     
  );
};

export default RecipeBox;