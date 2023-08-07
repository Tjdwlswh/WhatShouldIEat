import { db } from '../../models/index.js';
import { Sequelize } from 'sequelize';

const recipeModel = {
  create: async newRecipe => {
    return await db.Recipe.create(newRecipe);
  },
  findMyRecipe: async ({ userId, lastId }) => {
    console.log('1', lastId);

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
  findAll: async pageNum => {
    console.log('1', pageNum);
    // let where = {};
    // if (lastId) {
      //   where.id = { [Sequelize.Op.lt]: lastId };
      // }
    let offset = 0;
    if (pageNum) {
      offset = 8 * (pageNum - 1);
    }
    const recipes = await db.Recipe.findAll({
      // where,
      offset: offset,
      limit: 8,
      include: [
        {
          model: db.User,
          as: 'Likers',
          attributes: [],
        },
      ],
      // attributes: {
      //   include: [[Sequelize.fn(`COUNT`, Sequelize.col(`Likers.id`)), 'likeCount']],
      // },
      // group: ['Recipe.id'], // 중복된 행을 방지하기 위해 Recipe.id로 그룹화
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
