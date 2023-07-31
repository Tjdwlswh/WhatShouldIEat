import { Router } from 'express';
import loginRequired from '../middlewares/passport/loginRequired.js';
import { upload } from '../imgUploads/imgUploadRouter.js';
import { userController } from './userController.js';
import { followData } from '../middlewares/follow.js';
import { imgUploadRouter } from '../imgUploads/imgUploadRouter.js';

const userRouter = Router();
const imgUpload = upload.single('profileImg');

// 모든 템플릿에서 사용하는 라우터용 미들웨어
userRouter.use(followData);

// 회원가입
userRouter.post('/auth/register', imgUpload, userController.register);

// local로그인
userRouter.post(
  '/auth/login',
  /*  #swagger.auto = false
      #swagger.requestBody = {
        content: {
          "application/json": {
            schema: { 
              "type": "object",
              "properties": {
                "email": {
                  "example": "test@test.com"
                },
                "password": {
                  "example": "testtest1234"
                }
              }
            }
          }
        }
      }
  */
  userController.login,
);

// 카카오 로그인
userRouter.get('/auth/kakao/login', userController.kakaoLogin);
userRouter.get('/auth/kakao/callback', userController.kakaoCallback);

// google 로그인
userRouter.get('/auth/google/login', userController.googleLogin);
userRouter.get('/auth/google/callback', userController.googleCallback);

// user 정보
userRouter.get('/auth/user', loginRequired, userController.getUserInfo);

// user 정보수정
userRouter.put('/auth/user', loginRequired, userController.editUserInfo);

// 회원탈퇴
userRouter.delete('/auth/user', loginRequired, userController.deleteAccount);

// refrechToken 검증
userRouter.get('/auth/refresh', userController.refreshToken);

// 로그아웃
userRouter.get('/auth/logout', loginRequired, userController.logout);

export { userRouter };
