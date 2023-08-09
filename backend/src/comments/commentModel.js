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
          attributes: ['id', 'nickName', 'profileImg'],
        },
      ],
      order: [['createdAt', 'ASC']],
    });
  },
  getMyComment: async ({ commenterId, page, pageSize = 10 }) => {
    const limit = parseInt(pageSize);
    const offset = (page - 1) * limit;

    const { count, rows } = await db.Comment.findAndCountAll({
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

    return {
      totalItemsCount: count, // 총 개수 반환
      comments: rows, // 데이터 반환
    };
  },
  getMyRecipeComment: async ({ userId, page, pageSize = 10 }) => {
    const limit = parseInt(pageSize);
    const offset = (page - 1) * limit;

    const { count, rows } = await db.Comment.findAndCountAll({
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

    return {
      totalItemsCount: count, // 총 개수 반환
      comments: rows, // 데이터 반환
    };
  },
  findOne: async ({ commenterId, recipeId, commentId }) => {
    return await db.Comment.findOne({ where: { id: commentId, commenterId, recipeId } });
  },
  delete: async commentId => {
    return await db.Comment.destroy({ where: { id: commentId } });
  },
};

export { commentModel };
