import { createRecipe } from '../libs/api/recipeAPI.js';

const recipeService = {
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
