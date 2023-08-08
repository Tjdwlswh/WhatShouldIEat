import { commentModel } from './commentModel.js';

const commentService = {
  addComment: async ({ comment, recipeId, commenterId, recipeUserId }) => {
    const newComment = { comment, recipeId, commenterId, recipeUserId };
    const createComment = await commentModel.addComment(newComment);
    return createComment;
  },
  getComment: async recipeId => {
    const comment = await commentModel.getComment(recipeId);

    if (comment) {
      return comment;
    } else {
      return [];
    }
  },
  getMyComment: async ({ commenterId, page, pageSize }) => {
    const comments = await commentModel.getMyComment({ commenterId, page, pageSize });

    if (comments) {
      return comments;
    } else {
      return (comments = []);
    }
  },
  getMyRecipeComment: async ({ userId, page, pageSize }) => {
    const comments = await commentModel.getMyRecipeComment({ userId, page, pageSize });

    if (comments) {
      return comments;
    } else {
      return (comments = []);
    }
  },

  deleteComment: async ({ commenterId, recipeId, commentId }) => {
    const comment = await commentModel.findOne({ commenterId, recipeId, commentId });
    if (comment) {
      await commentModel.delete(commentId);
      const message = '댓글을 삭제하였습니다.';
      return message;
    }
    return { failMessage: '메시지 삭제에 실패했습니다.' };
  },
};
export { commentService };
