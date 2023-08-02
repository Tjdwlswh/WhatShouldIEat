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
      include: [
        { model: db.User, attributes: ['nickName'] },
        { model: db.User, as: 'Likers', attributes: ['id'] },
      ],
    });
  },
  findAll: async () => {
    const recipes = await db.Recipe.findAll({
      include: [
        {
          model: db.User,
          as: 'Likers',
          attributes: [],
          through: { attributes: [] }, // 중간 테이블의 속성은 사용하지 않음
        },
      ],
      attributes: {
        include: [[Sequelize.fn('COUNT', Sequelize.col('Likers.id')), 'likeCount']],
      },
      group: ['Recipe.id'], // 중복된 행을 방지하기 위해 Recipe.id로 그룹화
      order: [
        [Sequelize.literal('likeCount'), 'DESC'],
        ['createdAt', 'DESC'],
      ],
    });
    return recipes;
  },
  update: async (toUpdate, recipeId) => {
    console.log('4', toUpdate, recipeId);
    const updatedRecipe = await db.Recipe.update(toUpdate, {
      where: { id: recipeId },
      hooks: {
        beforeUpdate: (instance, options) => {
          // null값을 제외하고 업데이트
          for (const [key, value] of Object.entries(toUpdate)) {
            if (value === undefined) {
              delete instance.dataValues[key];
            }
          }
        },
      },
    });
    return updatedRecipe;
  },

  delete: async recipeId => {
    const deleteData = await db.Recipe.destroy({ where: { id: recipeId } });
    return deleteData;
  },
};

export { recipeModel };
