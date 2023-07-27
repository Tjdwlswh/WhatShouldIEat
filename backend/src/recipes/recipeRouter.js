import { Router } from 'express';
import loginRequired from '../middlewares/passport/loginRequired.js';
import { upload } from '../imgUploads/imgUploadRouter.js';
import { recipeController } from './recipeController.js';

const recipeRouter = Router();
const imgUpload = upload.single('foodImg');

//나의레시피로 생성
// recipeRouter.post('/myrecipes', imgUpload, recipeController);

//인공지능 레시피 생성
recipeRouter.post('/create_recipe', loginRequired, recipeController.createRecipe);

//나의 레시피 조회

//추천레시피 조회

//나의레시피 수정

//나의 레시피 삭제

export { recipeRouter };
