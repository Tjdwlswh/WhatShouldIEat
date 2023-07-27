import passport from 'passport';
import { LocalStrategy } from './localStrategy.js';
import { KakaoStrategy } from './kakaoStrategy.js';
import { GoogleStrategy } from './googleStrategy.js';
import { JwtStrategy, RefreshJwtStrategy } from './jwtStrategy.js';

const initializePassport = () => {
  passport.use(JwtStrategy);
  passport.use('refresh', RefreshJwtStrategy);
  passport.use(LocalStrategy);
  passport.use(GoogleStrategy);
  passport.use(KakaoStrategy);

  return passport;
};

export { initializePassport };
