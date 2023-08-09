import { db } from '../../models/index.js';
import { Sequelize } from 'sequelize';

const ingredientModel = {
  findOrCreate: async (newIngredient) => {
    const result = await Promise.all(
      newIngredient.map(ing => {
        return db.Ingredient.findOrCreate({
          where: { ingredient: ing.toLowerCase() },
        });
      }),
    );
    return result;
  },
};

export { ingredientModel };
