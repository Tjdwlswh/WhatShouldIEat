import { recipeService } from '../recipes/recipeService.js';
import { hashtagService } from '../hashtags/hashtagService.js';
import { commentService } from '../comments/commentService.js';

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
      const aiRecipe = await recipeService.createAiRecipe({ type, ingredients });
      res.status(200).json(aiRecipe);
    } catch (err) {
      next(err);
    }
  },
  // 인공지능 레시피 조회
  getAiRecipe: async (req, res, next) => {
    try {
      const { id } = req.params;
      const aiRecipe = await recipeService.aiRecipe({ id });
      res.status(200).json(aiRecipe);
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
  getMyrecipes: async (req, res, next) => {
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
      //등록된comment조회
      const comment = await commentService.getComment(recipeId);
      const result = { recipe, comment };
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
  //추천레시피 조회
  getRecipes: async (req, res, next) => {
    try {
      //좋아요 순으로 ->최신순 && 페이지네이션 무한스크롤 적용
      //const where = {};
      //if (parseInt(req.query.lastId, 10)) { //초기로딩이 아닐 경우(스크롤 후 로딩)
      //  where.id =
      //}
      const recipes = await recipeService.getRecipes();
      return res.status(200).json(recipes);
    } catch (err) {
      next(err);
    }
  },
  updateMyRecipe: async (req, res, next) => {
    try {
      const recipeId = req.params.recipeId;
      const userId = req.user.id;
      const toUpdate = req.body;
      const recipe = await recipeService.updateMyRecipe({ recipeId, userId, toUpdate });
      return res.status(200).json(recipe);
    } catch (err) {
      next(err);
    }
  },
  deleteMyRecipe: async (req, res, next) => {
    try {
      const recipeId = req.params.recipeId;
      const userId = req.user.id;
      const deleteMyRecipe = await recipeService.deleteMyRecipe(recipeId, userId);
      return res.status(200).json({ deleteMyRecipe });
    } catch (err) {
      next(err);
    }
  },
};
export { recipeController };
