import { db } from '../../models/index.js';
import { Sequelize } from 'sequelize';

const recipeModel = {
  create: async newRecipe => {
    return await db.Recipe.create(newRecipe);
  },
  findMyRecipe: async userId => {
    return await db.Recipe.findAll({ where: { UserId: userId } });
  },
};

export { recipeModel };
