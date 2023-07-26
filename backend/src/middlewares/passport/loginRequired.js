import passport from 'passport';
/*
 * jwtStrategy를 호출해서 user(jwt payload)를 가져옴
 * JWT는 유저의 _id를 담고 있음
 */

const loginRequired = (req, res, next) => {
  passport.authenticate('jwt', { sessions: false }, (error, user, info) => {
    //user를 찾았다면 서버에게 요청하는 req객체의 user에 담아서 서버에게 넘겨줌
    if (error) {
      next(error);
    }
    if (info) {
      throw new Error(info);
    }
    if (user) {
      req.currentUserEmail = user.email;
      req.user = user.dataValues;
    }
    next();
  })(req, res, next);
};

export default loginRequired;
