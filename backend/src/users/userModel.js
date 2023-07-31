import { db } from '../../models/index.js';
import { Sequelize } from 'sequelize';

const UserModel = {
  create: async newUser => {
    return await db.User.create(newUser);
  },

  findByDuplicateFields: async (email, nickName) => {
    const user = await db.User.findOne({
      where: {
        [Sequelize.Op.or]: [{ email }, { nickName }],
      },
    });
    return user;
  },

  findById: async followerId => {
    const user = await db.User.findOne({ where: { id: followerId } });
    return user;
  },

  findByEmail: async email => {
    const user = await db.User.findOne({ where: { email } });
    return user;
  },

  update: async (data, email) => {
    const updatedUser = await db.User.update(data, {
      where: { email },
      hooks: {
        beforeUpdate: (instance, options) => {
          // null값을 제외하고 업데이트
          for (const [key, value] of Object.entries(data)) {
            if (value === undefined) {
              delete instance.dataValues[key];
            }
          }
        },
      },
    });
    return updatedUser;
  },

  upsert: async (values, email) => {
    // 유저 조회 후 없다면 생성, 있다면 업데이트
    try {
      const user = await db.User.findOne({ where: { email } });
      return await user.update(values);
    } catch (err) {
      return await db.User.create(values);
    }
  },

  delete: async email => {
    const removedUser = await db.User.destroy({ where: { email } });
    return removedUser;
  },
};

export { UserModel };
