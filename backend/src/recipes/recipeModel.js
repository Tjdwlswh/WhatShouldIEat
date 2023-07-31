import { db } from '../../models/index.js';
import { Sequelize } from 'sequelize';

const recipeModel = {
  create: async newRecipe => {
    return await db.Recipe.create(newRecipe);
  },
  findMyRecipe: async userId => {
    return await db.Recipe.findAll({
      where: { UserId: userId },
      include: [
        {
          model: db.User,
          as: 'Likers',
          attributes: ['id'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  },
  findOne: async recipeId => {
    return await db.Recipe.findOne({
      where: { id: recipeId },
      // include: [
      //   { model: db.User, attributes: ['id', 'nickName'] },
      //   { model: db.User, through: 'Likeit', as: 'Likers', attributes: ['id'] },
      // ],
      // order: ['createdAt', 'DESC'],
    });
  },
};

export { recipeModel };
