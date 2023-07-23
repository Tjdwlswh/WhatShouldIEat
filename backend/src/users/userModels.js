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
  findBynickName: async nickName => {
    const nickCheck = await db.User.findOne({ where: { nickName } });
    return nickCheck;
  },
};

export { UserModel };
