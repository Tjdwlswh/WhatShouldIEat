import { recipeService } from './recipeService.js';

const recipeController = {
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
