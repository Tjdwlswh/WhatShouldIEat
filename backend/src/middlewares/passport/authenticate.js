import passport from 'passport';

const localAuthenticate = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).send(info.message);

    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      return res.send(user);
    });
  })(req, res, next);
};

const jwtAuthenticate = (req, res, next) =>
  passport.authenticate('jwt', { sessions: false }, (error, user, info) => {
    //verifyUser에서 user를 찾았다면 서버에게 요청하는 req객체의 user에 담아서 서버에게 넘겨줌
    if (user) {
      req.user = user;
    } else {
      return res.status(400).send(info.message);
    }
    next();
  })(req, res, next);

export { localAuthenticate, jwtAuthenticate };
