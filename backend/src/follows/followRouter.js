import { Router } from 'express';
import loginRequired from '../middlewares/passport/loginRequired.js';
import { userController } from '../users/userController.js';

const followRouter = Router();

//팔로우 신청
followRouter.post('/:id/follow', loginRequired, userController.postFollow);

// //팔로우데이터 조회
// followRouter.get('/:id/', isLoggedIn, followController.getfollowData);

// 팔로우 끊기
//followRouter.delete('/:id/follow', loginRequired, followController.deleteFollow);

export { followRouter };
