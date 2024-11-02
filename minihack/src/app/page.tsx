"use client";
import RecipeWindow from '@/components/recipeWindow';
import IngredientInputWindow from '../components/ingredientInputWindow';
import RecipeGrid from '@/components/recipeGrid';
import RecipeBox from '@/components/recipeBox';

export default function Page() {
  return (
    <main>
      <RecipeGrid />
      <RecipeBox />
      <RecipeWindow />
      <IngredientInputWindow />
    </main>
  );
}