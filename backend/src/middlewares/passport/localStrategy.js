import { Strategy } from 'passport-local';
import { UserModel } from '../../users/userModel.js';
import JwtSign from '../../utils/jwtSign.js';
import bcrypt from 'bcrypt';

const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const provider = 'local';
      const user = await UserModel.findByEmail(email);

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const { token, refreshToken } = JwtSign({ email, provider });
          await UserModel.update({ refreshToken }, email);
          user.token = token;
          user.refreshToken = refreshToken;
          return done(null, user);
        } else {
          return done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      }
    } catch (error) {
      console.log('error');
      done(error);
    }
  },
);

export { LocalStrategy };
