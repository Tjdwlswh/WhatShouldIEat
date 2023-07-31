import { recipeModel } from './recipeModel.js';
import { ingredientModel } from '../ingredients/ingredientModel.js';
import { hashtagModel } from '../hashtags/hashtagModel.js';
import { getAiRecipe } from '../libs/api/recipeAPI.js';

const recipeService = {
  addRecipe: async ({ foodname, ingredients, recipe, tags, foodImg, UserId }) => {
    const newRecipe = { foodname, ingredients, recipe, tags, foodImg, UserId };
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
  createRecipe: async ({ type, ingredients }) => {
    let ingredient = `재료: ${ingredients.join('|')}`;

    if (type === 'fixed') {
      ingredient += ' 요리이름:';
    } else if (type === 'flexible') {
      ingredient += '|';
    }
    const { data } = await getAiRecipe(ingredient);
    const { generated_text } = data[0];
    const splittedText = generated_text.split(/(재료: | 레시피: | 요리이름: )/);
    const recipe = {
      요리이름: splittedText[4],
      재료: splittedText[2].split('|'),
      레시피: splittedText[6],
    };
    return recipe;
  },
  addLike: async (recipeId, userId) => {
    const recipe = await recipeModel.findOne(recipeId);
    if (!recipe) {
      const errMessage = '레시피를 찾을 수가 없습니다.';
      throw new Error(errMessage);
    }
    //레시피에 Liker추가
    const likeadd = await recipe.addLiker(userId);
    console.log('123', recipe);
    return recipe;
  },
  myRecipe: async userId => {
    const myRecipe = await recipeModel.findMyRecipe(userId);

    if (!myRecipe) {
      const errMessage = '생성된 나의 레시피가 없습니다!';
      throw new Error(errMessage);
    }
    return myRecipe;
  },
};

export { recipeService };
