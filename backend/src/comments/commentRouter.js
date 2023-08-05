import { Router } from 'express';
import loginRequired from '../middlewares/passport/loginRequired.js';
import { commentController } from './commentController.js';

const commentRouter = Router();

// 댓글 등록
commentRouter.post('/comments/:recipeId', loginRequired, commentController.addComment);

//댓글 삭제
commentRouter.delete(
  '/comments/:recipeId/:commentId',
  loginRequired,
  commentController.deleteComment,
);
export { commentRouter };
