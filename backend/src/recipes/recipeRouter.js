import { Router } from 'express';
import loginRequired from '../middlewares/passport/loginRequired.js';
import { recipeController } from './recipeControllers.js';

const recipeRouter = Router();

recipeRouter.post('/create_recipe', loginRequired, recipeController.createRecipe);

export { recipeRouter };
