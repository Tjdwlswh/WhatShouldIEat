import passport from 'passport';
import setCookie from '../../utils/setCookie.js';

// 로컬 로그인
const localAuthenticate = async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (info) {
      const error = new Error(info.message);
      error.status = 404;
      return next(error);
    }

    const { token, refreshToken } = user;
    setCookie(res, token, refreshToken);
    res.status(200).json({ message: '로그인 성공' });
  })(req, res, next);
};

// 구글 콜백.
const googleCallbackAuthenticate = async (req, res, next) => {
  passport.authenticate(
    'google',
    { session: false, failureRedirect: `${process.env.FRONT_URL}/login` },
    (err, user, info) => {
      if (err) {
        return res.status(403).redirect(`${process.env.FRONT_URL}/login?status=fail`);
      }
      if (info) {
        // 에러처리하면 정상 작동 중에도 크래시
      }

      const { token, refreshToken } = user;
      setCookie(res, token, refreshToken);
      return res.status(303).redirect(`${process.env.FRONT_URL}`);
    },
  )(req, res, next);
};

const googleAuthenticate = async (req, res, next) => {
  passport.authenticate('google', { scope: ['email'] })(req, res, next);
};

const kakaoCallbackAuthenticate = async (req, res, next) => {
  passport.authenticate(
    'kakao',
    { session: false, failureRedirect: `${process.env.FRONT_URL}/login` },
    (err, user, info) => {
      if (err) {
        return res.status(403).redirect(`${process.env.FRONT_URL}/login?status=fail`);
      }
      if (info) {
        // 에러처리하면 정상 작동 중에도 크래시
      }

      const { token, refreshToken } = user;
      setCookie(res, token, refreshToken);
      res.status(303).redirect(`${process.env.FRONT_URL}`);
    },
  )(req, res, next);
};

const kakaoAuthenticate = async (req, res, next) => {
  passport.authenticate('kakao')(req, res, next);
};

// 리프레시토큰 검증 및 발급
const refreshAuthenticate = async (req, res, next) => {
  passport.authenticate('refresh', { sessions: false }, (err, user, info) => {
    if (err) return next(err);
    if (info) {
      const error = new Error(info.message);
      error.status = 404;
      return next(error);
    }
    const { token, refreshToken } = user;
    setCookie(res, token, refreshToken);
    res.status(200).json({ message: '토큰 재발급 완료' });
  })(req, res, next);
};

export {
  localAuthenticate,
  googleAuthenticate,
  googleCallbackAuthenticate,
  kakaoAuthenticate,
  kakaoCallbackAuthenticate,
  refreshAuthenticate,
};
