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

// 인공지능 레시피 조회, 현재 쓸 일 없음
// recipeRouter.get('/airecipe/:id', loginRequired, recipeController.getAiRecipe);

// 레시피에 좋아요 추가
recipeRouter.post('/:recipeId/like', loginRequired, recipeController.postLike);

//나의 레시피 목록조회
recipeRouter.get('/myrecipes', loginRequired, recipeController.getMyrecipes);

//상세 레시피 조회
recipeRouter.get('/recipes/:recipeId', loginRequired, recipeController.getRecipe);

//추천레시피 목록조회
recipeRouter.get('/recipes', recipeController.getRecipes);

//나의레시피 수정
recipeRouter.put('/myrecipes/:recipeId', loginRequired, recipeController.updateMyRecipe);

//나의 레시피 삭제 (hashtag테이블에 파싱되어 저장된 데이터는 남아있음)
recipeRouter.delete('/myrecipes/:recipeId', loginRequired, recipeController.deleteMyRecipe);

export { recipeRouter };
