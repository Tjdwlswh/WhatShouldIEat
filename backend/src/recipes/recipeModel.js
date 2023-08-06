import { db } from '../../models/index.js';
import { Sequelize } from 'sequelize';

const recipeModel = {
  create: async (newRecipe, { transaction }) => {
    return await db.Recipe.create(newRecipe, { transaction });
  },
  findMyRecipe: async ({ userId, lastId }) => {
    const where = { userId };
    if (parseInt(lastId, 10)) {
      where.id = { [Sequelize.Op.lt]: parseInt(lastId, 10) };
    }
    const recipes = await db.Recipe.findAll({
      where,
      limit: 8,
      include: [
        {
          model: db.User,
          as: 'Likers',
          attributes: ['id'],
        },
      ],
      order: [['createdAt', 'DESC']],
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
  findAll: async ({ lastId }) => {
    console.log('1', lastId);
    const where = {};
    if (parseInt(lastId, 10)) {
      where.id = { [Sequelize.Op.lt]: parseInt(lastId, 10) };
    }
    const recipes = await db.Recipe.findAll({
      where,
      limit: 8,
      include: [
        {
          model: db.User,
          as: 'Likers',
          attributes: ['id'],
          //through: { attributes: [] }, // 중간 테이블의 속성은 사용하지 않음
        },
      ],
      attributes: {
        // include: [
        //   [
        //     Sequelize.literal('(SELECT COUNT(*) FROM Likeit WHERE Likeit.RecipeId = Recipe.id)'),
        //     'likeCount',
        //   ],
        // ],
        include: [[Sequelize.fn('COUNT', Sequelize.col('userId')), 'likeCount']],
      },
      group: ['Recipe.id'], // 중복된 행을 방지하기 위해 Recipe.id로 그룹화
      order: [
        [Sequelize.literal('likeCount'), 'DESC'],
        ['createdAt', 'DESC'],
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
