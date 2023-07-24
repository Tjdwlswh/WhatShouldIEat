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
    console.log(email);
    const user = await db.User.findOne({ where: { email } });
    return user;
  },
  findByKakaoId: async kakaoId => {
    const user = await db.User.findOne({ where: { kakaoId } });
    return user;
  },

  upsert: async (values, email) => {
    try {
      const user = await db.User.findOne({ where: { email } });
      return await user.update(values);
    } catch (err) {
      return await user.create(values);
    }
  },
};

export { UserModel };
