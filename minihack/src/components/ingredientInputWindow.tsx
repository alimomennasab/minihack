/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

interface IngredientInputProps {
  onGenerateRecipes: (ingredients: string, meal: string, special: string) => void;
}

const IngredientInputWindow: React.FC<IngredientInputProps> = ({ onGenerateRecipes }) => {
  const [ingredients, setIngredients] = useState("");
  const [meal, setMeal] = useState("");
  const [special, setSpecial] = useState("");

  const handleGenerateRecipes = () => {
    onGenerateRecipes(ingredients, meal, special);
  };

  return (
    <div className='min-h-screen h-screen w-screen flex items-center justify-center bg-dg'>
      <div className="bg-ng w-2/6 h-3/4 rounded-3xl flex flex-col justify-start">
        <div className='flex flex-col items-center justify-center space-y-4 p-4'>
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
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>
        <div className='flex flex-col items-center justify-center space-y-4 p-4'>
          <div className="flex justify-center items-center text-white text-lg">
            When do you want to eat?
          </div>
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button color="success" onClick={() => setMeal("breakfast")}>Breakfast</Button>
            <Button color="success" onClick={() => setMeal("lunch")}>Lunch</Button>
            <Button color="success" onClick={() => setMeal("dinner")}>Dinner</Button>
          </ButtonGroup>
        </div>
        <div className='flex flex-col items-center justify-center space-y-4 p-4'>
          <div className="flex justify-center items-center text-white text-lg">
            Anything you're craving?
          </div>
          <input
            type="text"
            placeholder="Ex. Sweet, spicy, savory, Chinese, gluten-free"
            className="bg-tan text-black w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => setSpecial(e.target.value)}
          />
        </div>
        <div className='flex flex-col items-center justify-center space-y-4 p-4'>
          <button 
            className='bg-dg rounded-lg p-2 text-white w-1/2'
            onClick={handleGenerateRecipes}
          >
            Generate Recipes
          </button>
        </div>
      </div>
    </div>
  );
};

export default IngredientInputWindow;