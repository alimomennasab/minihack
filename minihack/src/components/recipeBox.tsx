import React from 'react';

const RecipeBox = () => {
  return (
    <div className="h-60 w-56 box-border size-full border-2 rounded-xl border-black bg-yellow-50">
      <div className="pt-4 pb-4 text-center font-black font-serif"> Recipe Name</div>
      <div className="pb-1 my-auto w-54 content-center border-t-2 border-black"></div>

      <div className="pt-2 px-4 overflow-y-auto h-40">Lorem ipsum odor amet, consectetuer adipiscing elit. Sagittis fermentum vehicula tellus fringilla dignissim. Ullamcorper auctor lobortis suspendisse diam hac feugiat mus leo.</div>
    </div>    
  );
};

export default RecipeBox;