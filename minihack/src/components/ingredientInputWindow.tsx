/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import{ useState } from 'react';
import { spec } from 'node:test/reporters';
import RecipeGrid from "./recipeGrid";

const IngredientInputWindow = () => {
  const [ingredients, setIngredients] = useState("");
  const [meal, setMeal] = useState("");
  const [special, setSpecial] = useState("");
  const [recipeGrid, setRecipeGrid] = useState(false);
  const toggleWindowGrid = () => {
    setRecipeGrid(!recipeGrid);
  };

  useEffect(() => {
    console.log(ingredients + " " + meal + " " + special)
  }, [meal, ingredients, special])

  const print =() =>{
    console.log("hi");
  }

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
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>
        
        {/*Time of day input*/}
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
        
        {/*Additional customization input*/}
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

        {/*Generate recipes button*/}
        <div className='flex flex-col items-center justify-center space-y-4 p-4'>
          <button onClick={toggleWindowGrid} className='bg-dg rounded-lg p-2 text-white w-1/2'>
            Generate Recipes
          </button>
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'> 
          {recipeGrid && <RecipeGrid />} 
      </div> 
        </div>
      </div>
    </div>
    
  );
};

export default IngredientInputWindow;
