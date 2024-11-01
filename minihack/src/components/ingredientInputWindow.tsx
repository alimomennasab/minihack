/* eslint-disable react/no-unescaped-entities */
"use client";
import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const IngredientInputWindow = () => {
  return (
    <div className='min-h-screen h-screen w-screen flex items-center justify-center bg-dg'>
      <div className="bg-ng w-2/6 h-3/4 rounded-3xl flex flex-col justify-start">

        {/*Ingredient input*/}
        <div className='flex flex-col items-center justify-center space-y-4  p-4'>
          <div className="mt-6 font-bold text-3xl text-white">
            Cookin It Up!
          </div>
          <div className="flex justify-center items-center text-white text-lg">
            What ingredients do you want to use?
          </div>
          <input
            type="text"
            placeholder="Enter ingredients here..."
            className="bg-tan text-black w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        {/*Time of day input*/}
        <div className='flex flex-col items-center justify-center space-y-4 p-4'>
          <div className="flex justify-center items-center text-white text-lg">
            When do you want to eat?
          </div>
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button color="success">Breakfast</Button>
            <Button color="success">Lunch</Button>
            <Button color="success">Dinner</Button>
          </ButtonGroup>
        </div>
        
        {/*Additional customization input*/}
        <div className='flex flex-col items-center justify-center space-y-4 p-4'>
          <div className="flex justify-center items-center text-white text-lg">
            Anything you're craving?
          </div>
          <input
            type="text"
            placeholder="Ex. Sweet, spicy, savory, Chinese, gluten-free"
            className="bg-tan text-black w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/*Generate recipes button*/}
        <div className='flex flex-col items-center justify-center space-y-4 p-4'>
          <button className='bg-dg rounded-lg p-2 text-white w-1/2'>
            Generate Recipes
          </button>
          </div>
      </div>
    </div>
  );
};

export default IngredientInputWindow;