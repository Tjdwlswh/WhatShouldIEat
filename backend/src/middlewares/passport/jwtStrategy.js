import { Strategy } from 'passport-jwt';
import { UserModel } from '../../users/userModel.js';
import JwtSign from '../../utils/jwtSign.js';
import cookieParser from 'cookie-parser';

let RawRefreshToken = null;

const cookieExtractor = req => {
  const { refreshToken } = req.signedCookies;
  RawRefreshToken = refreshToken;
  return refreshToken;
};

const signedCookieDecodeToJWT = req => {
  const token = cookieParser.signedCookie(
    req.headers['authorization'].split(' ')[1],
    process.env.COOKIE_SECRET,
  );
  return token;
};

// used by loginRequired
const JwtStrategy = new Strategy(
  {
    jwtFromRequest: signedCookieDecodeToJWT,
    secretOrKey: process.env.JWT_ACCESS_KEY,
  },
  async (payload, done) => {
    try {
      const { email } = payload;
      const user = await UserModel.findByEmail(email);
      if (user) {
        return done(null, user);
      } else {
        error.status = 404;
        error.message = '회원 정보가 없습니다.';
        return done(error, false);
      }
    } catch (error) {
      return done(error, false);
    }
  },
);

// refreshToken 검증
const RefreshJwtStrategy = new Strategy(
  {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_REFRESH_KEY,
  },
  async (payload, done) => {
    try {
      const { email, provider } = payload;
      const user = await UserModel.findByEmail(email);
      if (user.refreshToken === RawRefreshToken) {
        const { token, refreshToken } = JwtSign({ email, provider });
        // DB 리프레시 토큰 갱신
        user.refreshToken = refreshToken;
        await user.save();
        return done(null, { token, refreshToken });
      } else {
        const error = new Error();
        error.status = 401;
        error.message = '토큰이 일치하지 않습니다. 다시 로그인하세요.';
        return done(error, false);
      }
    } catch (error) {
      error.status = 404;
      return done(error, false);
    }
  },
);

export { JwtStrategy, RefreshJwtStrategy };
