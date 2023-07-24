import passport from 'passport';
import setCookie from '../../utils/setCookie.js';

const localAuthenticate = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) next(err);
    if (!user) throw new Error(info.message);

    res.status(200).send(user);
  })(req, res, next);
};

const googleCallbackAuthenticate = (req, res, next) => {
  passport.authenticate('google', { session: false, failureRedirect: '/' }, (err, user, info) => {
    if (err) next(err);
    if (!user) throw new Error(info.message);

    const { token, refreshToken } = user;
    setCookie(token);
    res.status(303).redirect(`${process.env.FRONT_URL}`);
  })(req, res, next);
};

const googleAuthenticate = (req, res, next) => {
  passport.authenticate('google', { scope: ['profile'] })(req, res, next);
};

const refreshAuthenticate = (req, res, next) => {
  passport.authenticate('refresh', { sessions: false }, (err, user, info) => {
    if (err) next(err);
    if (info) throw new Error(info);

    if (user) {
      const { token } = user;
      setCookie(token);
    }
    res.status(200).send('토큰 재발급 완료');
  })(req, res, next);
};

export { localAuthenticate, googleAuthenticate, googleCallbackAuthenticate, refreshAuthenticate };
