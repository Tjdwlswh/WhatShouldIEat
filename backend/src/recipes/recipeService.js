import { recipeModel } from './recipeModel.js';
import { ingredientModel } from '../ingredients/ingredientModel.js';
import { hashtagModel } from '../hashtags/hashtagModel.js';
import { getAiRecipe } from '../libs/api/recipeAPI.js';
import { commentModel } from '../comments/commentModel.js';

const recipeService = {
  addRecipe: async ({ foodname, ingredients, recipe, tags, foodImg, UserId, aiRecipeId }) => {
    const newRecipe = { foodname, ingredients, recipe, tags, foodImg, UserId };
    const createdRecipe = await recipeModel.create(newRecipe);

    //1.ingridients테이블에 재료들 파싱해서 저장
    const newIngredient = ingredients.split('|');
    const createdIngredient = await ingredientModel.findOrCreate(newIngredient);
    //재료 모델을 레시피 모델과 연결
    await createdRecipe.addIngredients(createdIngredient.map(i => i[0]));

    //2.해시태그 파싱해서 저장
    const hashtags = tags.match(/#[^\s#]*/g);
    const newTag = await hashtagModel.findOrCreate(hashtags);
    //해시태그 모델을 레시피 모델과 연결
    await createdRecipe.addHashtags(newTag.map(t => t[0]));

    //3.Ai레시피와 연결
    const airecipe = await recipeModel.findAiRecipe({ id: aiRecipeId });
    createdRecipe.setAiRecipe(airecipe);

    return createdRecipe;
  },
  createAiRecipe: async ({ type, ingredients }) => {
    let ingredient = `재료: ${ingredients.join('|')}`;

    if (type === 'fixed' || type === null) {
      ingredient += ' 요리이름:';
    } else if (type === 'flexible') {
      ingredient += '|';
    }
    const { data } = await getAiRecipe(ingredient);
    const generatedText = data[0].generated_text;
    const splittedText = generatedText.split(/(재료: | 레시피: | 요리이름: )/);
    const newAiRecipe = {
      foodname: splittedText[4],
      ingredients: splittedText[2],
      recipe: splittedText[6],
    };

    const createdAiRecipe = await recipeModel.aiCreate(newAiRecipe);

    //1.ingredients테이블에 재료들 파싱해서 저장
    const newIngredient = splittedText[2].split('|');
    const createdIngredient = await ingredientModel.findOrCreate(newIngredient);
    //재료 모델을 레시피 모델과 연결
    await createdAiRecipe.addIngredients(createdIngredient.map(i => i[0]));
    return createdAiRecipe;
  },

  // DB에 저장된 AI 레시피 조회.
  aiRecipe: async ({ id }) => {
    const aiRecipe = await recipeModel.findAiRecipe({ id });
    return aiRecipe;
  },

  addLike: async (recipeId, userId) => {
    const recipe = await recipeModel.findOne(recipeId);
    if (!recipe) {
      const errMessage = '레시피를 찾을 수가 없습니다.';
      throw new Error(errMessage);
    }
    //레시피에 Liker추가
    const likePlusOne = await recipe.addLikers(userId);
    return likePlusOne;
  },
  myRecipe: async userId => {
    //user의 id로 나의 레시피 조회
    const myRecipe = await recipeModel.findMyRecipe(userId);
    //생성된 나의 레시피가 없다면 빈 배열로 리턴하기
    if (!myRecipe) {
      return (myRecipe = []);
    }
    //Likers배열 -> likeCount로
    const recipesJSON = myRecipe.map(recipe => {
      const recipeData = recipe.toJSON();
      recipeData.likeCount = recipe.Likers.length;
      delete recipeData.Likers;
      return recipeData;
    });

    return recipesJSON;
  },
  getRecipe: async recipeId => {
    const recipe = await recipeModel.findOne(recipeId);
    // 좋아요 카운트로 바꾸기
    const recipeData = recipe.toJSON();
    recipeData.likeCount = recipe.Likers.length;
    delete recipeData.Likers;
    return recipeData;
  },
  getRecipes: async () => {
    const recipes = await recipeModel.findAll();
    return recipes;
  },
  updateMyRecipe: async ({ recipeId, userId, toUpdate }) => {
    //업데이트 전 자료 찾아옴
    const recipe = await recipeModel.findOne(recipeId);

    if (recipe && recipe.UserId === userId) {
      await recipeModel.update({ toUpdate, recipeId });
      //1.ingredients테이블에 재료들 파싱 후  업데이트
      if (toUpdate.ingredients) {
        const newIngredient = toUpdate.ingredients.split('|');
        const createdIngredients = await ingredientModel.findOrCreate(newIngredient);
        //업데이트하면 success=1, 실패=0불러와져서 새로 업데이트된 레시피로 불러옴
        const updatedRecipe = await recipeModel.findOne(recipeId);
        //새로운 재료를 연결
        await updatedRecipe.setIngredients(createdIngredients.map(i => i[0]));
      }

      //2.해시태그 정보 업데이트
      if (toUpdate.tags) {
        const hashtags = toUpdate.tags.match(/#[^\s#]*/g);
        const newTag = await hashtagModel.findOrCreate(hashtags);
        const updatedRecipe = await recipeModel.findOne(recipeId);
        //새로운 해시태그를 연결
        await updatedRecipe.setHashtags(newTag.map(t => t[0]));
      }
      const updatedRecipe = await recipeModel.findOne(recipeId);
      return updatedRecipe;
    } else {
      return false;
    }
  },
  deleteMyRecipe: async (recipeId, userId) => {
    const userData = await recipeModel.findOne(recipeId);
    if (userData && userData.UserId === userId) {
      await recipeModel.delete(recipeId);
      const message = '레시피를 삭제하였습니다.';
      return message;
    }
    return { failMessage: '메시지 삭제에 실패했습니다.' };
  },
};

export { recipeService };
