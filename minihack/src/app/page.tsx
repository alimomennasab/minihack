import RecipeWindow from '@/components/recipeWindow';
import IngredientInputWindow from '../components/ingredientInputWindow';
import RecipeBox from '@/components/recipeBox';

export default function Page() {
  return (
    <main>
      <RecipeBox />
      <RecipeWindow />
      <IngredientInputWindow />
    </main>
  );
}