import passport from 'passport';
import { LocalStrategy } from './localStrategy.js';
// import { KakaoStrategy } from './kakaoStrategy.js';
import { GoogleStrategy } from './googleStrategy.js';
import { JwtStrategy, RefreshJwtStrategy } from './jwtStrategy.js';
// import userService from '../../services/userService.js';

const initializePassport = () => {
  // passport.serializeUser((user, done) => {
  //   console.log('serializeUser');
  //   done(null, user.email);
  // });

  // passport.deserializeUser(async (email, done) => {
  //   try {
  //     // const result = await userService.getUser(email);
  //     // DB 조회 코드 추가 필요
  //     console.log('deserializeUser', email);
  //     done(null, result);
  //   } catch (err) {
  //     done(err);
  //   }
  // });

  passport.use(JwtStrategy);
  passport.use('refresh', RefreshJwtStrategy);
  passport.use(LocalStrategy);
  passport.use(GoogleStrategy);
  // passport.use(KakaoStrategy);

  return passport;
};

export { initializePassport };
