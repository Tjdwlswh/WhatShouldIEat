import { Router } from 'express';
import loginRequired from '../middlewares/passport/loginRequired.js';
import { upload } from '../imgUploads/imgUploadRouter.js';
import { recipeController } from './recipeController.js';

const recipeRouter = Router();
const imgUpload = upload.single('foodImg');

//나의레시피로 생성
recipeRouter.post('/myrecipes', loginRequired, imgUpload, recipeController.postMyrecipe);

//인공지능 레시피 생성
recipeRouter.post('/airecipe', loginRequired, recipeController.createAiRecipe);

// 레시피에 좋아요 추가
recipeRouter.post('/:recipeId/like', loginRequired, recipeController.postLike);

//나의 레시피 목록조회
recipeRouter.get('/myrecipes', loginRequired, recipeController.getMyrecipe);

//상세 레시피 조회
recipeRouter.get('/recipes/:recipeId', recipeController.getRecipe);

//추천레시피 조회

//나의레시피 수정

//나의 레시피 삭제

export { recipeRouter };
