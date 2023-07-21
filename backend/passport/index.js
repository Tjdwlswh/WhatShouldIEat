import passport from 'passport';
// import User from '../models/schemas/User.js';
import { local } from './localStrategy.js';
import { kakao } from './kakaoStrategy.js';

export const passportConfig = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ['id', 'nickName'],
          as: 'Followers',
        },
        {
          model: User,
          attributes: ['id', 'nickName'],
          as: 'Followings',
        },
      ],
    })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();
  kakao();
};
