/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import{ useState } from 'react';
import { spec } from 'node:test/reporters';
import RecipeGrid from './recipeGrid'

interface Recipe {
  name: string;
  instructions: string[];
}

const IngredientInputWindow = () => {
  const [ingredients, setIngredients] = useState("");
  const [meal, setMeal] = useState("");
  const [special, setSpecial] = useState("");
  const [res, setRes] = useState("");
  const [prompt, setPrompt] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [toggle, setToggle] = useState(false);
  const [counter, setCounter] = useState(0);
  const [count2, setCount] = useState(0);

  const inputOpen = ['min-h-screen', 'h-screen', 'w-screen', 'flex', 'items-center', 'justify-center', 'bg-dg'];
  const inputClose = ['min-h-screen', 'h-screen', 'w-screen', 'flex', 'items-center','justify-center', 'bg-dg', 'hidden'];
  const gridOpen = ['min-h-screen', 'h-screen', 'w-screen', 'flex', 'flex-col','items-center', 'justify-center', 'bg-[#465B43]'];
  const gridClose = ['min-h-screen', 'h-screen', 'w-screen', 'flex', 'flex-col', 'items-center', 'justify-center', 'bg-[#465B43]', 'hidden'];

  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_AI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  useEffect(() => {
    console.log(ingredients + " " + meal + " " + special)
  }, [meal, ingredients, special])

  useEffect(() => {
    console.log("YOUR MOM")
    const getResponse = async () => {
      try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        console.log("Raw response:", text); // Debug output
        setRes(text);
        const parsedRecipes = parseRecipes(text);
        setRecipes(parsedRecipes);
      } catch (error) {
        console.log("THERES A FUCKING ERROR: ", error);
      }
    };
    getResponse();
  }, [prompt]);

  useEffect(() => {
    if (counter == 0) {

    } else if (toggle == true) {
        for (let i = 0; i < inputOpen.length; i++) {
          document.getElementById("input-window")?.classList.remove(inputOpen[i]);
        }
        for (let i = 0; i < inputClose.length; i++) {
          document.getElementById("input-window")?.classList.add(inputClose[i]);
        }
        for (let i = 0; i < gridClose.length; i++) {
          document.getElementById("grid-window")?.classList.remove(gridClose[i]);
        }
        for (let i = 0; i < gridOpen.length; i++) {
          document.getElementById("input-window")?.classList.remove(gridOpen[i]);
        }
    } else {
      for (let i = 0; i < inputClose.length; i++) {
        document.getElementById("input-window")?.classList.remove(inputClose[i]);
      }
      for (let i = 0; i < inputOpen.length; i++) {
        document.getElementById("input-window")?.classList.add(inputOpen[i]);
      }
      for (let i = 0; i < gridOpen.length; i++) {
        document.getElementById("grid-window")?.classList.remove(gridOpen[i]);
      }
      for (let i = 0; i < gridClose.length; i++) {
        document.getElementById("input-window")?.classList.remove(gridClose[i]);
      }
      setCount(count2+1)
    }
  }, [toggle, counter])

  useEffect(() => {
    setCounter(counter + 1);
  }, [count2])

  function setStuff() {
    setPrompt(
      `Explain what ${special} ${meal} recipes we can make with ${ingredients} and can output the recipes in the format food (not in a list): {instructions in numbered list form}. Do not say anything else besides the formatted`
    );
    setToggle(!toggle);
  }

  const parseRecipes = (text: string): Recipe[] => {
    // Split the text into sections by recipe titles
    const recipeSections = text.split(/\*\*[^*]+:\*\*/);
    // First element will be empty or contain any text before the first recipe
    recipeSections.shift();
    
    // Get all recipe titles
    const recipeTitles: string[] = [];
    text.match(/\*\*([^*]+):\*\*/g)?.forEach(title => {
      recipeTitles.push(title.replace(/\*\*/g, '').replace(':', ''));
    });

    const recipes: Recipe[] = [];

    recipeSections.forEach((section, index) => {
      const instructions = section
        .trim()
        .split('\n')
        .map(instruction => instruction.trim())
        .filter(instruction => instruction.match(/^\d+\./))
        .map(instruction => instruction.replace(/^\d+\.\s*/, ''));

      if (instructions.length > 0 && recipeTitles[index]) {
        recipes.push({
          name: recipeTitles[index],
          instructions
        });
      }
    });
    
    console.log("Parsed Recipes:", recipes); // Debug output
    return recipes;
  };

  return (<>
    <div className='min-h-screen h-screen w-screen flex items-center justify-center bg-dg' id='input-window'>
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
          <button className='bg-dg rounded-lg p-2 text-white w-1/2' onClick={setStuff}>
            Generate Recipes
          </button>
          </div>
      </div>
    </div>
    <RecipeGrid />
    </>
  );
};

export default IngredientInputWindow;