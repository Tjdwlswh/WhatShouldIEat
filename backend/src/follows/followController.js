import { userService } from '../users/userService.js';
// import { followService } from './followService.js';

const followController = {
  // const followerId = req.currentUserId; // jwt토큰 사용해서 req.currentUserId = userId; 지정필요!
  //   const followingId = req.params.id;

  //   const newFollwing = req.body;
  // getfollowData: async (req, res, next) => {
  //   try {
  //     const user = req.params.id; //로그인한 유저의 아이디 어떻게 받을지 확인해!
  //     const followerCount = req.user?.Followers?.length || 0;
  //     const followingCount = req.user?.Followings?.length || 0;
  //     const followingList = req.user?.Following?.map(f => f.id) || [];

  //     res.status(200).json({
  //       followerCount,
  //       followingCount,
  //       followingList,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // },
};
export { followController };
