// import { Router } from 'express';
// import { loginRequired } from '../middlewares/loginRequired';
// import { userService } from '../services/userService';
// import asyncHandler from '../utils/asyncHandler';

// const userRouter = Router();

// userRouter.post(
//   '/register',
//   asyncHandler(async (req, res, next) => {
//     if (Object.keys(req.body).length === 0) {
//       throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
//     }

//     // req (request) 에서 데이터 가져오기
//     const { email, password, nickName, birthDate, gender } = req.body;

//     // 위 데이터를 유저 db에 추가하기
//     const newUser = await userService.addUser({
//       email,
//       password,
//       nickName,
//       birthDate,
//       gender,
//     });

//     if (newUser.errorMessage) {
//       throw new Error(newUser.errorMessage);
//     }

//     res.status(201).json(newUser);
//   }),
// );

// userRouter.post(
//   '/login',
//   asyncHandler(async function (req, res, next) {
//     // req (request) 에서 데이터 가져오기
//     const { email, password } = req.body;

//     // 위 데이터를 이용하여 유저 db에서 유저 찾기
//     const user = await userService.getUser({ email, password });

//     if (user.errorMessage) {
//       throw new Error(user.errorMessage);
//     }

//     res.status(200).send(user);
//   }),
// );

// userRouter.get(
//   '/users',
//   loginRequired,
//   asyncHandler(async function (req, res, next) {
//     // 전체 사용자 목록을 얻음
//     const users = await userService.getUsers();
//     res.status(200).send(users);
//   }),
// );

// userRouter.get(
//   '/user',
//   loginRequired,
//   asyncHandler(async function (req, res, next) {
//     // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
//     const userId = req.currentUserId;
//     const currentUserInfo = await userService.getUserInfo({
//       userId,
//     });

//     if (currentUserInfo.errorMessage) {
//       throw new Error(currentUserInfo.errorMessage);
//     }

//     res.status(200).send(currentUserInfo);
//   }),
// );

// userRouter.put(
//   '/user',
//   loginRequired,
//   asyncHandler(async function (req, res, next) {
//     // URI로부터 사용자 id를 추출함.
//     const userId = req.params.id;
//     // body data 로부터 업데이트할 사용자 정보를 추출함.
//     const name = req.body.name ?? null;
//     const email = req.body.email ?? null;
//     const password = req.body.password ?? null;
//     const description = req.body.description ?? null;

//     const toUpdate = { name, email, password, description };

//     // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
//     const updatedUser = await userService.setUser({ userId, toUpdate });

//     if (updatedUser.errorMessage) {
//       throw new Error(updatedUser.errorMessage);
//     }

//     res.status(200).json(updatedUser);
//   }),
// );

// userRouter.get(
//   '/users/:id',
//   loginRequired,
//   asyncHandler(async function (req, res, next) {
//     const userId = req.params.id;

//     const currentUserInfo = await userService.getUserInfo({ userId });

//     if (currentUserInfo.errorMessage) {
//       throw new Error(currentUserInfo.errorMessage);
//     }

//     res.status(200).send(currentUserInfo);
//   }),
// );

// userRouter.delete('/user/:id/withdraw', loginRequired, async (req, res, next) => {
//   const userId = req.currentUserId;
//   const { id } = req.params;

//   if (userId !== id) {
//     res.status(403).json({
//       message: '권한이 없습니다.',
//     });
//   }

//   const { user, errorMessage } = await userService.removeUser({
//     userId,
//   });

//   if (errorMessage) {
//     res.status(404).json({ message: errorMessage });
//   } else {
//     res.status(200).json({
//       message: '탈퇴가 성공적으로 이루어졌습니다.',
//     });
//   }
// });

// export { userRouter };
