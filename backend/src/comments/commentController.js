import { commentService } from './commentService.js';

const commentController = {
  addComment: async (req, res, next) => {
    try {
      //유저 아이디로 정보 불러와서 닉네임,댓글, 생성일 보여주기
      const commenterId = req.user.id;
      const recipeId = req.params.recipeId;
      const { comment, recipeUserId } = req.body;
      const userNickName = req.user.nickName;
      const newComment = await commentService.addComment({
        comment,
        recipeId,
        commenterId,
        recipeUserId,
      });
      const commentInfo = { newComment, userNickName };
      return res.status(201).json(commentInfo);
    } catch (err) {
      next(err);
    }
  },
  getMyComment: async (req, res, next) => {
    try {
      const commenterId = req.user.id;
      const { page, pageSize } = req.query;
      const comments = await commentService.getMyComment({ commenterId, page, pageSize });
      return res.status(200).json(comments);
    } catch (err) {
      next(err);
    }
  },

  getMyRecipeComment: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { page, pageSize } = req.query;
      const comments = await commentService.getMyRecipeComment({ userId, page, pageSize });
      return res.status(200).json(comments);
    } catch (err) {
      next(err);
    }
  },
  deleteComment: async (req, res, next) => {
    try {
      const commenterId = req.user.id;
      const recipeId = req.params.recipeId;
      const commentId = req.params.commentId;
      const result = await commentService.deleteComment({ commenterId, recipeId, commentId });
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
};

export { commentController };
