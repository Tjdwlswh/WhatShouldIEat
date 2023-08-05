import { db } from '../../models/index.js';

const commentModel = {
  addComment: async newComment => {
    return await db.Comment.create(newComment);
  },
  getComment: async recipeId => {
    return await db.Comment.findAll({
      where: {
        RecipeId: recipeId,
      },
      include: [
        {
          model: db.User,
          as: 'commenter',
          attributes: ['nickName'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  },
  findOne: async ({ commenterId, recipeId, commentId }) => {
    return await db.Comment.findOne({ where: { id: commentId, commenterId, recipeId } });
  },
  delete: async (commentId) => {
    return await db.Comment.destroy({ where: { id: commentId } });
  },
};

export { commentModel };
