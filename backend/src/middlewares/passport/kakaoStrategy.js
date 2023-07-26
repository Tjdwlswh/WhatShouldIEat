import { Strategy } from 'passport-kakao';
import { UserModel } from '../../users/userModels.js';
import JwtSign from '../../utils/jwtSign.js';

const KakaoStrategy = new Strategy(
  {
    clientID: process.env.KAKAO_ID,
    callbackURL: '/auth/kakao/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile._json.kakao_account.email;
      const provider = profile.provider;
      const nickName = profile._json.properties.nickname;
      const profileImg = profile._json.properties.profile_image;

      const { token, refreshToken } = JwtSign({ email, provider });
      const exUser = await UserModel.upsert(
        {
          email,
          nickName,
          profileImg,
          refreshToken,
          provider: 'kakao',
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
