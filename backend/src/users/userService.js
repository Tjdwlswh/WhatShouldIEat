import bcrypt from 'bcrypt';
import { UserModel } from './userModel.js';
import { recipeModel } from '../recipes/recipeModel.js';
import { ConflictException, NotFoundException } from '../libs/httpException.js';
import { revokeAPI } from '../libs/api/revokeAPI.js';
import { deleteFile } from '../libs/controlFile.js';

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

  getUser: async ({ email }) => {
    // 유저 정보 조회
    const { nickName, profileImg, provider } = await UserModel.findByEmail(email);
    const user = { email, nickName, profileImg, provider };
    return user;
  },

  editUser: async ({ data, email }) => {
    // 유저 정보 수정
    for (const [key, value] of Object.entries(data)) {
      if (value === '') {
        delete data[key];
      }
    }
    if (data.image === 'delete') {
      data.profileImg = '';
      const { profileImg } = await UserModel.findByEmail(email);
      deleteFile(profileImg);
    }
    const editedUser = await UserModel.update(data, email);
    return editedUser;
  },

  deleteUser: async ({ email }) => {
    // 유저 탈퇴
    const { socialToken, provider } = await UserModel.findByEmail(email);
    const result = await revokeAPI(provider, socialToken);
    console.log('탈퇴요청', result);
    const removedUser = await UserModel.delete(email);
    return removedUser;
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
  getUserCard: async userId => {
    const { nickName, profileImg, provider, Followers, Followings } = await UserModel.findOne(
      userId,
    );
    const recipeCount = await recipeModel.findMyRecipeCount(userId);
    // const user = { nickName, profileImg, Followers, Followings };
    const followerCount = Followers?.length || 0;
    const followingCount = Followings?.length || 0;
    const followingIdList = Followings?.map(f => f.id) || [];
    const result = {
      provider,
      nickName,
      profileImg,
      recipeCount,
      followerCount,
      followingCount,
      followingIdList,
    };
    return result;
  },
};
export { userService };
