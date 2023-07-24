import { Strategy } from 'passport-local';
// import { userService } from '../../services/userService.js';
import bcrypt from 'bcrypt';
import JwtSign from '../../utils/jwtSign.js';

const user = {
  email: 'asd',
  password: 'testtest1234',
};

const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      // const user = await userService;
      if (user) {
        // const isMatch = await bcrypt.compare(password, user.password);
        const isMatch = password === user.password;
        if (isMatch) {
          const { token, refreshToken } = JwtSign({ email, provider: 'Local' });
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
      done(error);
    }
  },
);

export { LocalStrategy };
