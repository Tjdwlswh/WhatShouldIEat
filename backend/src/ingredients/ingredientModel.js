import { db } from '../../models/index.js';
import { Sequelize } from 'sequelize';

const ingredientModel = {
  // create: async newIngredient => {
  //   return await db.Ingredient.create(newIngredient);
  // },
  findOrCreate: async newIngredient => {
    console.log('재료', newIngredient);
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
