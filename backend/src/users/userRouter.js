import { Router } from 'express';
import passport from 'passport';
import { isLoggedIn, isNotLoggedIn } from '../middlewares/loginRequired.js';
import { upload } from '../imgUploads/imgUploadRouter.js';
import { userController } from './userControllers.js';
import { followData } from '../middlewares/follow.js';
import { imgUploadRouter } from '../imgUploads/imgUploadRouter.js';
const userRouter = Router();
const imgUpload = upload.single('profileImg');

// 모든 템플릿에서 사용하는 라우터용 미들웨어
userRouter.use(followData);

//회원가입
userRouter.post('/register', isNotLoggedIn, imgUpload, userController.register);

//local로그인
userRouter.post('/login', isNotLoggedIn, userController.login);

//카카오 로그인
// userRouter.get('/kakao', passport.authenticate('kakao'));
userRouter.post('/kakao/login', userController.signInKakao);

//카카오 로그인 성공 여부 callback
userRouter.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/?loginError=카카오로그인 실패',
  }),
  userController.kakaoLogin,
);

//로그아웃
userRouter.get('/logout', isLoggedIn, userController.logout);

export { userRouter };
