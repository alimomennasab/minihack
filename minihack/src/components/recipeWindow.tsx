"use client";
import React from 'react';

const RecipeWindow = () => {
  return (
    <div className='min-h-screen h-screen w-screen flex items-center justify-center'>
        <div className="bg-ng w-2/6 h-3/4 rounded-3xl border-2">
            <div className="mt-4 text-3xl font-bold text-white text-center">
                Recipe Name
            </div>
            <div className="bg-tan mt-4 mx-10 rounded-3xl border-2 overflow-scroll h-4/6">
                <div className='mt-2 mx-4'>
                    The quick brown fox jumped over the lazy dog. The quick brown fox jumped over the lazy dog.
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