import { db } from '../../models/index.js';
import { Sequelize } from 'sequelize';

const recipeModel = {
  create: async newRecipe => {
    return await db.Recipe.create(newRecipe);
  },
  findMyRecipe: async ({ userId, pageNum }) => {
    let offset = 0;
    if (pageNum) {
      offset = 10 * (pageNum - 1);
    }
    const { count, rows } = await db.Recipe.findAndCountAll({
      where: { userId: userId },
      offset: offset,
      limit: 10,
      include: [
        {
          model: db.User,
          as: 'Likers',
          attributes: ['id'],
        },
      ],
      order: [['id', 'DESC']],
    });
    return { totalItemsCount: count, myRecipe: rows };
  },

  findMyRecipeCount: async userId => {
    return await db.Recipe.count({ where: { userId } });
  },

  findOne: async recipeId => {
    const result = await db.Recipe.findOne({
      where: { id: recipeId },
      include: [
        { model: db.User, attributes: ['nickName', 'profileImg'] },
        { model: db.User, as: 'Likers', attributes: ['id'] },
        { model: db.Hashtag, attributes: ['tag'], through: { attributes: [] } },
      ],
    });
    return result;
  },
  findAll: async pageNum => {
    let offset = 0;
    if (pageNum) {
      offset = 10 * (pageNum - 1);
    }
    const { count, rows } = await db.Recipe.findAndCountAll({
      offset: offset,
      limit: 10,
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
    return { totalItemsCount: count, recipes: rows };
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
