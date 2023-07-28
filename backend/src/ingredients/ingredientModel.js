import { db } from '../../models/index.js';
import { Sequelize } from 'sequelize';

const ingredientModel = {
  create: async newIngredient => {
    return await db.Ingredient.create(newIngredient);
  },
}

export {ingredientModel };
