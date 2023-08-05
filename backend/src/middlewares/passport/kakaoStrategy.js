import { Strategy } from 'passport-kakao';
import { UserModel } from '../../users/userModel.js';
import JwtSign from '../../utils/jwtSign.js';

const KakaoStrategy = new Strategy(
  {
    clientID: process.env.KAKAO_ID,
    callbackURL: process.env.KAKAO_CALLBACK,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile._json.kakao_account.email;
      const provider = profile.provider;
      const nickName = email;
      const profileImg = profile._json.properties.profile_image;

      const { token, refreshToken } = JwtSign({ email, provider });
      const exUser = await UserModel.upsert(
        {
          email,
          nickName,
          provider,
          profileImg,
          socialToken: accessToken,
          refreshToken,
        },
        email,
      );
      return done(null, { token, refreshToken });
    } catch (error) {
      console.error(error);
      return done(error);
    }
  },
);

export { KakaoStrategy };
