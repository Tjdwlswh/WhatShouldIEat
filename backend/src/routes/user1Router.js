import { Router } from 'express';
// import { userService } from '../services/userService';
import asyncHandler from '../utils/asyncHandler.js';
import {
  refreshAuthenticate,
  localAuthenticate,
  googleAuthenticate,
  googleCallbackAuthenticate,
} from '../middlewares/passport/authenticate.js';
import loginRequired from '../middlewares/passport/loginRequired.js';

const userRouter = Router();

userRouter.post(
  '/register',
  asyncHandler(async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
    }

    // req (request) 에서 데이터 가져오기
    const { email, password, nickName } = req.body;

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userService.addUser({
      email,
      password,
      nickName,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newUser);
  }),
);

userRouter.get('/google', googleAuthenticate);
userRouter.get('/google/callback', googleCallbackAuthenticate);

userRouter.post('/login', localAuthenticate);

userRouter.get(
  '/users',
  // asyncHandler(async function (req, res, next) {
  //   // 전체 사용자 목록을 얻음
  //   const users = await userService.getUsers();
  //   res.status(200).send(users);
  // }),
  // (req, res, next) => {
  //   console.log('localAuthenticate', req.user);
  // }
  loginRequired,
  (req, res, next) => {
    console.log('hi');
    res.status(200).send('hi');
  },
);

userRouter.get('/refresh', refreshAuthenticate);

userRouter.get(
  '/user',
  asyncHandler(async function (req, res, next) {
    // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
    const userId = req.currentUserId;
    const currentUserInfo = await userService.getUserInfo({
      userId,
    });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(200).send(currentUserInfo);
  }),
);

userRouter.put(
  '/user',
  asyncHandler(async function (req, res, next) {
    // URI로부터 사용자 id를 추출함.
    const userId = req.params.id;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const name = req.body.name ?? null;
    const email = req.body.email ?? null;
    const password = req.body.password ?? null;

    const toUpdate = { name, email, password, description };

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const updatedUser = await userService.setUser({ userId, toUpdate });

    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage);
    }

    res.status(200).json(updatedUser);
  }),
);

userRouter.get(
  '/users/:id',
  asyncHandler(async function (req, res, next) {
    const userId = req.params.id;

    const currentUserInfo = await userService.getUserInfo({ userId });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(200).send(currentUserInfo);
  }),
);

userRouter.delete('/user/:id/withdraw', async (req, res, next) => {
  const userId = req.currentUserId;
  const { id } = req.params;

  if (userId !== id) {
    res.status(403).json({
      message: '권한이 없습니다.',
    });
  }

  const { user, errorMessage } = await userService.removeUser({
    userId,
  });

  if (errorMessage) {
    res.status(404).json({ message: errorMessage });
  } else {
    res.status(200).json({
      message: '탈퇴가 성공적으로 이루어졌습니다.',
    });
  }
});

export { userRouter };
