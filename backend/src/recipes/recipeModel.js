import { db } from '../../models/index.js';
import { Sequelize } from 'sequelize';

const recipeModel = {
  create: async (newRecipe, { transaction }) => {
    return await db.Recipe.create(newRecipe, { transaction });
  },
  findMyRecipe: async ({ userId, pageNum }) => {
    let offset = 0;
    if (pageNum) {
      offset = 8 * (pageNum - 1);
    }
    const recipes = await db.Recipe.findAll({
      where: { userId: userId },
      offset: offset,
      limit: 8,
      include: [
        {
          model: db.User,
          as: 'Likers',
          attributes: ['id'],
        },
      ],
      order: [['id', 'DESC']],
    });
    return recipes;
  },

  findMyRecipeCount: async userId => {
    return await db.Recipe.count({ where: { userId } });
  },

  findOne: async recipeId => {
    return await db.Recipe.findOne({
      where: { id: recipeId },
      include: [
        { model: db.User, attributes: ['nickName', 'profileImg'] },
        { model: db.User, as: 'Likers', attributes: ['id'] },
      ],
    });
  },
  findAll: async pageNum => {
    let offset = 0;
    if (pageNum) {
      offset = 8 * (pageNum - 1);
    }
    const recipes = await db.Recipe.findAll({
      offset: offset,
      limit: 8,
      include: [
        {
          model: db.User,
          as: 'Likers',
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [
            Sequelize.literal(`(SELECT COUNT(*) FROM Likeit WHERE Likeit.RecipeId = Recipe.id)`),
            'likeCount',
          ],
        ],
      },
      order: [
        [Sequelize.literal('likeCount'), 'DESC'], // likeCount를 기준으로 내림차순 정렬
        ['id', 'DESC'], // id를 기준으로 내림차순 정렬
      ],
    });
    return recipes;
  },

  update: async ({ toUpdate, recipeId }) => {
    const updatedRecipe = await db.Recipe.update(toUpdate, {
      where: { id: recipeId },
    });
    return updatedRecipe;
  },
  delete: async recipeId => {
    const deleteData = await db.Recipe.destroy({ where: { id: recipeId } });
    return deleteData;
  },
  // 이하 AI 레시피 관련 DB 메소드
  aiCreate: async newAiRecipe => {
    return await db.AiRecipe.create(newAiRecipe);
  },

  findAiRecipe: async ({ id }) => {
    return await db.AiRecipe.findByPk(id);
  },
};

export { recipeModel };
