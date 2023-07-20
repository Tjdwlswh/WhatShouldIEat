import { Strategy, ExtractJwt } from 'passport-jwt';
import userService from '../../services/userService';

const JwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (payload, done) => {
    try {
      const user = await userService.find();
      // payload.email이 있는지 확인하는 코드 작성 필요
      if (user) {
        return done(null, user);
      } else {
        return done(null, false, { message: '로그인한 유저만 사용할 수 있는 서비스입니다.' });
      }
    } catch (error) {
      return done(error, false);
    }
  },
);

export { JwtStrategy };
