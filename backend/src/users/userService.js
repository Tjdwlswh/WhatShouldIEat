import bcrypt from 'bcrypt';
import { UserModel } from './userModel.js';
import { ConflictException, NotFoundException } from '../libs/httpException.js';

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

  user: async ({ email }) => {
    // 유저 정보 조회
    const { nickName, profileImg } = await UserModel.findByEmail(email);
    const user = { email, nickName, profileImg };
    return user;
  },

  clearTokenInDB: async email => {
    // db 리프레시토큰 제거
    try {
      const user = await UserModel.update({ refreshToken: null }, email);
    } catch (err) {
      throw new Error(err);
    }
  },

  addFollowing: async (followingId, followerId) => {
    //내가 팔로우 신청하면 내가 follower, 남은 following
    const user = await UserModel.findById(followerId);
    if (!user) {
      const errorMessage = 'Follower not found.';
      throw new NotFoundException(errorMessage);
    }
    await user.addFollowing(parseInt(followingId, 10));

    return;
  },
};
export { userService };
