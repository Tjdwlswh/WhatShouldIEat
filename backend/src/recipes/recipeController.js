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
  createAiRecipe: async (req, res, next) => {
    try {
      const { type = 'flexible', ingredients } = req.body;
      const recipe = await recipeService.createRecipe({ type, ingredients });
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
      const likePlusOne = await recipeService.addLike(recipeId, userId);

      res.status(201).json(likePlusOne);
    } catch (err) {
      next(err);
    }
  },
  //나의 레시피 목록 조회
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
  //상세 레피시 조회
  getRecipe: async (req, res, next) => {
    try {
      const recipeId = req.params.recipeId;
      const recipe = await recipeService.getRecipe(recipeId);
      
      return res.status(200).json(recipe);
    } catch (err) {
      next(err);
    }
  },
};
export { recipeController };
