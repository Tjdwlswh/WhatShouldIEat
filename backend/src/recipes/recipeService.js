import { recipeModel } from './recipeModel.js';
import { ingredientModel } from '../ingredients/ingredientModel.js';
import { hashtagModel } from '../hashtags/hashtagModel.js';
import { createRecipe } from '../libs/api/recipeAPI.js';

const recipeService = {
  addRecipe: async ({ foodname, ingredients, recipe, tags, foodImg }) => {
    const newRecipe = { foodname, ingredients, recipe, tags, foodImg };
    const createdRecipe = await recipeModel.create(newRecipe);

    //1.ingridints테이블에 재료들 파싱해서 저장
    const newIngredient = ingredients.split('|');
    const createdIngredient = await ingredientModel.findOrCreate(newIngredient);
    //재료 모델을 레시피 모델과 연결
    await createdRecipe.addIngredients(createdIngredient.map(i => i[0]));

    //2.해시태그 파싱해서 저장
    const hashtags = tags.match(/#[^\s#]*/g);
    const newTag = await hashtagModel.findOrCreate(hashtags);
    //해시태그 모델을 레시피 모델과 연결
    await createdRecipe.addHashtags(newTag.map(t => t[0]));

    return createdRecipe;
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
