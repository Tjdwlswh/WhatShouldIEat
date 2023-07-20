import passport from 'passport';
import { LocalStrategy } from './localStrategy';
import { KakaoStrategy } from './kakaoStrategy';
import { GoogleStrategy } from './googleStrategy';
import { JwtStrategy } from './jwtStrategy';
import userService from '../../services/userService';

const initializePassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser(async (email, done) => {
    try {
      const result = await userService.getUser(email);
      // DB 조회 코드 추가 필요
      done(null, result);
    } catch (err) {
      done(err);
    }
  });

  passport.use(LocalStrategy);
  passport.use(GoogleStrategy);
  passport.use(KakaoStrategy);
  passport.use(JwtStrategy);

  return passport;
};

export { initializePassport };
