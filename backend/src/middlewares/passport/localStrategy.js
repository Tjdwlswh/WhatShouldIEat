import { Strategy } from 'passport-local';
import userService from '../../services/userService';
import bcrypt from 'bcrypt';

const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await userService;
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
        } else {
        }
      }
    } catch (error) {}
  },
);

export { LocalStrategy };
