import { recipeService } from '../recipes/recipeService.js';
import { hashtagService } from '../hashtags/hashtagService.js';

const recipeController = {
  //나의레시피 생성
  postMyrecipe: async (req, res, next) => {
    try {
      const { foodname, ingredients, recipe, tags } = req.body;
      const foodImg = req.file ? req.file.filename : undefined;
      const newRecipe = await recipeService.addRecipe({
        foodname,
        ingredients,
        recipe,
        tags,
        foodImg,
        UserId: req.user.id,
      });
      if (newRecipe.errMessage) {
        throw new Error(newRecipe.errMessage);
      }
      return res.status(201).json(newRecipe);
    } catch (err) {
      next(err);
    }
  },
  //인공지능 레시피 생성 요청
  createRecipe: async (req, res, next) => {
    try {
      const { type, ingredients } = req.body;
      console.log('ingredients', ingredients);
      const recipe = await recipeService.create({ type, ingredients });
      res.status(200).json(recipe);
    } catch (err) {
      next(err);
    }
  },
  //레시피에 좋아요 추가
  postLike: async (req, res, next) => {
    try {
      const recipeId = req.params.recipeId;
      const userId = req.user.id;
      const recipe = await recipeService.addLike(recipeId, userId);

      res.status(201).json(recipe);
    } catch (err) {
      next(err);
    }
  },
  //나의 레시피 조회
  getMyrecipe: async (req, res, next) => {
    try {
      // 레시피 테이블에서 UserId가 req.user.id 인것만 조회
      const userId = req.user.id;
      const myRecipe = await recipeService.myRecipe(userId);
      return res.status(200).json(myRecipe);
    } catch (err) {
      next(err);
    }
  },
};
export { recipeController };
