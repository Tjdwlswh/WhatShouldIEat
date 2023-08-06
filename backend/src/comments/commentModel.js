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
  getMyComment: async ({ commenterId, page, pageSize = 10 }) => {
    const limit = parseInt(pageSize);
    const offset = (page - 1) * limit;

    return await db.Comment.findAll({
      where: { commenterId },
      include: [
        {
          model: db.Recipe,
          attributes: ['id', 'foodname', 'tags', 'foodImg'],
        },
      ],
      order: [['createdAt', 'DESC']],
      offset,
      limit,
    });
  },
  getMyRecipeComment: async ({ userId, page, pageSize = 10 }) => {
    const limit = parseInt(pageSize);
    const offset = (page - 1) * limit;

    return await db.Comment.findAll({
      where: { recipeUserId: userId },
      include: [
        {
          model: db.Recipe,
          attributes: ['id', 'foodname', 'tags', 'foodImg'],
        },
      ],
      order: [['createdAt', 'DESC']],
      offset,
      limit,
    });
  },
  findOne: async ({ commenterId, recipeId, commentId }) => {
    return await db.Comment.findOne({ where: { id: commentId, commenterId, recipeId } });
  },
  delete: async commentId => {
    return await db.Comment.destroy({ where: { id: commentId } });
  },
};

export { commentModel };
