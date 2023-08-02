import { commentModel } from './commentModel.js';

const commentService = {
  addComment: async ({ comment, recipeId, commenterId }) => {
    const newComment = { comment, recipeId, commenterId };
    const createComment = await commentModel.addComment(newComment);
    return createComment;
  },
  getComment: async recipeId => {
    const comment = await commentModel.getComment(recipeId);

    if (comment) {
      return comment;
    } else {
      return (comment = []);
    }
  },
};
export { commentService };
