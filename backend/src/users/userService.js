import bcrypt from 'bcrypt';
import { UserModel } from './userModels.js';
import { db } from '../../models/index.js';
import { ConflictException } from '../libs/httpException.js';

const userService = {
  addUser: async ({ email, password, nickName, profileImg }) => {
    // 이메일 중복가입 체크
    const duplicateFields = [];
    const existingUser = await UserModel.findByDuplicateFields(email, nickName);
    if (existingUser) {
      if (existingUser.email === email) {
        duplicateFields.push('email');
      }

      if (existingUser.nickName === nickName) {
        duplicateFields.push('nickName');
      }

      const errorMessage = `이미 사용 중인 ${duplicateFields.join(', ')} 입니다`;
      throw new ConflictException(errorMessage);
    }

    const hash = await bcrypt.hash(password, 12);
    const newUser = {
      email,
      password: hash,
      nickName,
      profileImg,
    };

    return UserModel.create(newUser);
  },

  clearTokenInDB: async email => {
    try {
      const user = await UserModel.update({ refreshToken: null }, email);
    } catch (err) {
      throw new Error(err);
    }
  },
};

export { userService };
