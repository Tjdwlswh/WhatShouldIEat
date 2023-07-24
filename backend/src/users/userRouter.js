import { Router } from 'express';
import passport from 'passport';
import loginRequired from '../middlewares/passport/loginRequired.js';
import { upload } from '../imgUploads/imgUploadRouter.js';
import { userController } from './userControllers.js';
import { followData } from '../middlewares/follow.js';
import { imgUploadRouter } from '../imgUploads/imgUploadRouter.js';
const userRouter = Router();
const imgUpload = upload.single('profileImg');

// 모든 템플릿에서 사용하는 라우터용 미들웨어
userRouter.use(followData);

//회원가입
userRouter.post('/auth/register', imgUpload, userController.register);

//local로그인
userRouter.post('/auth/login', userController.login);

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

// refrechToken 검증
userRouter.get('/auth/refresh', userController.refreshToken);

// google 로그인
userRouter.get('/auth/google', userController.googleLogin);
userRouter.get('/auth/google/callback', userController.googleCallback);

export { userRouter };
