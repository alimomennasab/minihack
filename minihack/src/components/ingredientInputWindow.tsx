/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useRef } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import{ useState } from 'react';
//import RecipeGrid from './recipeGrid'
import RecipeBox from './recipeBox';


interface Recipe {
  name: string;
  instructions: string[];
}

const ingredients2 = ['chicken', 'rice', 'tomatoes', 'stuff', 'things', 'test', 'burger', 'fries'] as const;

const IngredientInputWindow = () => {
  const [ingredients, setIngredients] = useState("");
  const [meal, setMeal] = useState("");
  const [special, setSpecial] = useState("");
  const [res, setRes] = useState("");
  const [prompt, setPrompt] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [toggle, setToggle] = useState(false);
  const [isFirstToggle, setIsFirstToggle] = useState(true);

  const refInputWindow = useRef<HTMLDivElement>(null);
  const refGridWindow = useRef<HTMLDivElement>(null);

  const inputOpen = ['min-h-screen', 'h-screen', 'w-screen', 'flex', 'items-center', 'justify-center', 'bg-dg'];
  const inputClose = ['min-h-screen', 'h-screen', 'w-screen', 'flex', 'items-center','justify-center', 'bg-dg', 'hidden'];
  const gridOpen = ['min-h-screen', 'h-screen', 'w-screen', 'flex', 'flex-col','items-center', 'justify-center', 'bg-[#465B43]'];
  const gridClose = ['min-h-screen', 'h-screen', 'w-screen', 'flex', 'flex-col', 'items-center', 'justify-center', 'bg-[#465B43]', 'hidden'];

  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_AI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // prints current ai input
  useEffect(() => {
    console.log(ingredients + " " + meal + " " + special)
  }, [meal, ingredients, special])

  // GETS PROMPT FROM AI
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

  // TOGGLES BETWEEN INGREDIENT INPUT WINDOW AND RECIPE GRID
  useEffect(() => {
    if (isFirstToggle) {
      setIsFirstToggle(false);
    } else if (toggle == true) {
        for (let i = 0; i < inputOpen.length; i++) {
          refInputWindow.current?.classList.remove(inputOpen[i]);
        }
        for (let i = 0; i < inputClose.length; i++) {
          refInputWindow.current?.classList.add(inputClose[i]);
        }
        for (let i = 0; i < gridClose.length; i++) {
          refGridWindow.current?.classList.remove(gridClose[i]);
        }
        for (let i = 0; i < gridOpen.length; i++) {
          refGridWindow.current?.classList.add(gridOpen[i]);
        }
    } else {
      for (let i = 0; i < inputClose.length; i++) {
        refInputWindow.current?.classList.remove(inputClose[i]);
      }
      for (let i = 0; i < inputOpen.length; i++) {
        refInputWindow.current?.classList.add(inputOpen[i]);
      }
      for (let i = 0; i < gridOpen.length; i++) {
        refGridWindow.current?.classList.remove(gridOpen[i]);
      }
      for (let i = 0; i < gridClose.length; i++) {
        refGridWindow.current?.classList.add(gridClose[i]);
      }
    }
  }, [toggle])



  function setStuff() {
    setPrompt(
      `Explain what ${special} ${meal} recipes we can make with ${ingredients} and can output the recipes in the format food (not in a list): {instructions in numbered list form}. Do not say anything else besides the formatted`
    );
    setToggle(!toggle);
  }

  function setStuffLite() {
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
    <div className='min-h-screen h-screen w-screen flex items-center justify-center bg-dg' id='input-window' ref={refInputWindow}>
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

    <div className='min-h-screen h-screen w-screen flex flex-col items-center justify-center bg-[#465B43] hidden' id='grid-window' ref={refGridWindow}>
      {/* Title & Ingredients list */}
      <div className='text-black text-5xl mb-4'>
        Generated Recipes
      </div>
      <div className='text-white italic p-4'>
        Made with {ingredients2.join(', ')}
      </div>
      {/* Grid */}
      <div className="w-3/4 h-3/5 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">
          {ingredients2.map((ingredient, index) => (
            <RecipeBox key={index} />
          ))}
        </div>
      </div>
      <div className='flex flex-col items-center self-start space-y-4 p-4'>
          <button className='bg-ng rounded-lg p-2 text-black w-1/2 border-black border-2 w-auto hover:bg-sky-500' onClick={setStuffLite}>
            Go Back
          </button>
      </div>
    </div>
    </>
  );
};

export default IngredientInputWindow;