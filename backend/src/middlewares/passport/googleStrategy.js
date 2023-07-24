import { Strategy } from 'passport-google-oauth20';
import { UserModel } from '../../users/userModels.js';
import JwtSign from '../../utils/jwtSign.js';

const GoogleStrategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      const provider = profile.provider;
      const nickName = email;
      const profileImg = profile.photos[0].value;

      const { token, refreshToken } = JwtSign({ email, provider });
      const user = { token, refreshToken };
      const exUser = await UserModel.upsert(
        {
          email,
          nickName,
          profileImg,
          refreshToken,
        },
        email,
      );
      return done(null, user);
    } catch (err) {
      console.log('user');
      done(err);
    }
  },
);

export { GoogleStrategy };
