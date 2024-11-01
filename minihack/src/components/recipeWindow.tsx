import React from 'react';
import { Button } from '@mui/material';

const RecipeWindow = () => {
  return (
    <div className='min-h-screen h-screen w-screen flex items-center justify-center'>
        <div className="bg-white w-2/6 h-3/4 border-black rounded-3xl border-2">
            <div className="mt-4 text-3xl font-bold text-center">
                Recipe Name
            </div>
            <div className="mt-4 mx-10 bg-white border-black rounded-3xl border-2 overflow-scroll h-4/6">
                <div className='mt-2 mx-4'>
                    The quick brown fox jumped over the lazy dog. The quick brown fox jumped over the lazy dog.
                </div>
            </div>
            <div className="flex items-center justify-center mt-10">
                <Button variant="contained" color="success">
                    Copy Recipe
                </Button> 
            </div>
                   
        </div>
    </div>
  );
};

export default RecipeWindow;