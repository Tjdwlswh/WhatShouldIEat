import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import JwtSign from '../../utils/jwtSign.js';
// import User from '../models/schemas/User.js';

const GoogleStrategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.email;
      const provider = 'Google';

      // const user = await getUserService(email);

      // if (user) {
      //   const { id, email, provider } = user;
      // const { token } = JwtSign({ email, provider });
      //   return done(null, { id, email, token });
      // }

      // await create({
      //   email,
      //   provider,
      // });

      // const savedUser = await getUserService(email);
      // const { id } = savedUser;

      const { token, refreshToken } = JwtSign({ email, provider });
      // await storeRefreshToken(id, refreshToken);

      done(null, { token, refreshToken });
      // done(null, false, { message: '가입되지 않은 회원입니다.' });
      // done(null, profile);
    } catch (err) {
      done(err);
    }
  },
);

export { GoogleStrategy };
