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

  findByEmail: async email => {
    const user = await db.User.findOne({ where: { email } });
    return user;
  },

  update: async (value, email) => {
    const updatedUser = await db.User.update(value, { where: { email } });
    return updatedUser;
  },

  upsert: async (values, email) => {
    try {
      const user = await db.User.findOne({ where: { email } });
      return await user.update(values);
    } catch (err) {
      return await db.User.create(values);
    }
  },
};

export { UserModel };
