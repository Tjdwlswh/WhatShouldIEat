import { Router } from 'express';
import { isLoggedIn } from '../middlewares/loginRequired.js';
import { followController } from './followController.js';

const followRouter = Router();

//팔로우 신청
followRouter.post('/:id/follow', isLoggedIn, followController.postFollow);

// //팔로우데이터 조회
// followRouter.get('/:id/', isLoggedIn, followController.getfollowData);

export { followRouter };
