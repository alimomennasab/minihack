import RecipeWindow from '@/components/recipeWindow';
import IngredientInputWindow from '../components/ingredientInputWindow';
import RecipeGrid from '@/components/recipeGrid';

export default function Page() {
  return (
    <main>
      <RecipeGrid />
      <RecipeWindow />
      <IngredientInputWindow />
    </main>
  );
}