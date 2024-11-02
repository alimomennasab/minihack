/* eslint-disable @typescript-eslint/no-require-imports */
"use client";
import { useEffect, useState } from "react";
import React from "react";

interface Recipe {
  name: string;
  instructions: string[];
}

export default function Test() {
  const [res, setRes] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [prompt, setPrompt] = useState("");
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_AI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

  useEffect(() => {
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
  }, [model, prompt]);

  return (
    <>
      <input 
        style={{ border: '2px solid black'}} 
        onChange={(e) => setPrompt(
          `Explain what recipes we can make with ${e.target.value} and can output the recipes in the format food (not in a list): {instructions in numbered list form}. Do not say anything else besides the formatted`
        )} 
        placeholder="PUT SUM SHIT HERE"
      />
      <div style={{width: '100vw', height: '100vh', border: '2px solid green', overflow: 'auto'}}>
        <div style={{whiteSpace: 'pre-wrap'}}>{res}</div>
        <div style={{marginTop: '20px'}}>
          <h2>Parsed Recipes:</h2>
          {recipes.map((recipe, index) => (
            <div key={index} style={{marginBottom: '20px'}}>
              <h3 style={{fontWeight: 'bold'}}>{recipe.name}</h3>
              <ol>
                {recipe.instructions.map((instruction, i) => (
                  <li key={i}>{instruction}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}