import bcrypt from 'bcrypt';
import passport from 'passport';
import axios from 'axios';
import jwt from 'jsonwebtoken';
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
  signInKakao: async kakaoToken => {
    const result = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${kakaoToken}`,
      },
    });
    const { data } = result;
    const kakaoId = data.id;
    const nickName = data.properties.nickname;
    const profileImg = data.properties.profile_image;
    const email = data.kakao_account.email;

    if (!kakaoId || !nickName || !email) {
      throw new Error('KEY_ERROR', 400);
    }
    const user = await UserModel.findByKakaoId(kakaoId);
    if (!user) {
      const newUser = {
        kakaoId,
        nickName,
        email,
        provider: 'kakao',
        profileImg,
      };
      await UserModel.create(newUser);
    }
    const token = jwt.sign({ kakao_id: user.kakaoId }, process.env.JWT_SECRET);
    console.log(token, user);
    return [token, user];
  },
};

export { userService };
