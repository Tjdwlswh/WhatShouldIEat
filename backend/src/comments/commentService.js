import { commentModel } from './commentModel.js';

const commentService = {
  addComment: async ({ comment, RecipeId, commenterId }) => {
    const newComment = { comment, RecipeId, commenterId };
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
