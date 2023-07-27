import { recipeService } from './userService.js';

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
      });

      if (newUser.errMessage) {
        throw new Error(newUser.errMessage);
      }
      return res.status(201).json(newUser);
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
};
export { recipeController };
