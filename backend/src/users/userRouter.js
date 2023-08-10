import { Router } from 'express';
import loginRequired from '../middlewares/passport/loginRequired.js';
import { upload } from '../imgUploads/imgUploadRouter.js';
import { userController } from './userController.js';
import { imgUploadRouter } from '../imgUploads/imgUploadRouter.js';

const userRouter = Router();
const imgUpload = upload.single('image');

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

//팔로우 신청
userRouter.post('/follow/:followingId', loginRequired, userController.postFollow);
//팔로우 해제
userRouter.delete('/follow/:followingId', loginRequired, userController.removeFollow);

// user 정보
userRouter.get('/user', loginRequired, userController.getUserInfo);

//user profilecard
userRouter.get('/usercard', loginRequired, userController.getUserCard);

// user 정보수정
userRouter.put('/user', loginRequired, imgUpload, userController.editUserInfo);

// 회원탈퇴
userRouter.delete('/auth/user', loginRequired, userController.deleteAccount);

// refrechToken 검증
userRouter.get('/auth/refresh/:logout', userController.refreshToken);

// 로그아웃
userRouter.get('/auth/logout', loginRequired, userController.logout);

export { userRouter };
