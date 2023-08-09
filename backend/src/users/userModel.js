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
    const updatedUser = await db.User.update(data, { where: { email } });
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
  findOne: async userId => {
    const user = await db.User.findOne({
      where: { id: userId },
      include: [
        { model: db.User, as: 'Followers', attributes: ['nickName', 'id'] },
        { model: db.User, as: 'Followings', attributes: ['nickName', 'id'] },
      ],
    });
    return user;
  },
};
export { UserModel };
