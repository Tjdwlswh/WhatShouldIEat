import { recipeModel } from './recipeModel.js';
// import { ingredientModel } from '..ingredients/ingredientModel.js';
// import { tagModel } from './tagModel.js';
import { createRecipe } from '../libs/api/recipeAPI.js';

const recipeService = {
  addRecipe: async ({ foodname, ingredients, recipe, tags, foodImg }) => {
    const newRecipe = await recipeModel.create(newRecipe);
    // //ingridints테이블에 재료들 각각 저장
    // const newIngredients = await ingredientModel.create(newIngredients);

    return newRecipe;
  },
  create: async ({ type, ingredients }) => {
    let ingredient = `재료: $${ingredients.join('|')}`;

    if (type === 'fixed') {
      ingredient += ' 요리이름:';
    } else if (type === 'flexible') {
      ingredient += '|';
    }
    const { generated_text } = await createRecipe(ingredient);
    const splittedText = generated_text.split(/(재료: | 레시피: | 요리이름: )/);
    print(splittedText);

    return splittedText;
  },
};

export { recipeService };
