import {
  googleAuthenticate,
  googleCallbackAuthenticate,
  kakaoAuthenticate,
  kakaoCallbackAuthenticate,
  localAuthenticate,
  refreshAuthenticate,
} from '../middlewares/passport/authenticate.js';
import { userService } from './userService.js';

const userController = {
  //회원가입 -완료
  register: async (req, res, next) => {
    try {
      const { email, password, nickName } = req.body;
      const profileImg = req.file ? req.file.filename : undefined;

      const newUser = await userService.addUser({
        email,
        password,
        nickName,
        profileImg,
      });

      if (newUser.errMessage) {
        throw new Error(newUser.errMessage);
      }
      return res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  },
  //local로그인 (이메일-비번사용)
  login: localAuthenticate,

  logout: async (req, res, next) => {
    try {
      res.clearCookie();
      const email = req.currentUserEmail;
      await userService.clearTokenInDB(email);
      res.status(200).json({ message: '로그아웃 성공' });
    } catch (err) {
      next(err);
    }
  },

  //google로그인
  googleLogin: googleAuthenticate,
  googleCallback: googleCallbackAuthenticate,

  //카카오 로그인
  kakaoLogin: kakaoAuthenticate,
  kakaoCallback: kakaoCallbackAuthenticate,

  getUser: async (req, res, next) => {
    try {
      const email = req.currentUserEmail;
      const user = await userService.user({ email });
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },

  // 리프레시 토큰 검증
  refreshToken: refreshAuthenticate,

  //팔로우 신청
  postFollow: async (req, res, next) => {
    try {
      //내가 팔로우 신청하면 내가 follower, 남은 following
      console.log('req.user', req.user);
      const followerId = req.user.id; //나
      const followingId = req.params.id; //너

      const result = await userService.addFollowing(followingId, followerId);

      res.status(200).json({ result: '팔로우를 시작합니다.' });
    } catch (err) {
      next(err);
    }
  },
};

export { userController };
