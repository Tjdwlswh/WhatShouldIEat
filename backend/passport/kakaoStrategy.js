import passport from 'passport';
import { Strategy as KakaoStrategy } from 'passport-kakao';

import { User } from '../models/User.js';

export const kakao = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);
        try {
          const exUser = await User.findOne({
            where: { Id: profile.id, provider: 'kakao' },
          });
          if (exUser) {  //가입된 유저는 정보만 불러오기
            done(null, exUser);
          } else {  //신규유저는 User 생성
            const newUser = await User.create({ 
              email: profile._json && profile._json.kakao_account_email,
              nickName: profile.displayName,
              kakaoId: profile.id,
              provider: 'kakao',
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      },
    ),
  );
};
