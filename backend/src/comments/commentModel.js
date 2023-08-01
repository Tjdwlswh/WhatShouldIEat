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
};

export { commentModel };
