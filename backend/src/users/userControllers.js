import { userService } from './userService.js';
import passport from 'passport';

const userController = {
  //회원가입 -완료
  register: async (req, res, next) => {
    try {
      const { email, password, nickName } = req.body;
      const profileImg = req.file ? req.file.filename : undefined;

      const newUser = await userService.addUser({
        email,
        password,
        nickName,
        profileImg,
      });

      if (newUser.errMessage) {
        throw new Error(newUser.errMessage);
      }
      return res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  },
  //local로그인 (이메일-비번사용)
  login: async (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
      if (authError) {
        console.error(authError);
        return next(authError);
      }
      if (!user) {
        return res.redirect(`/?loginError=${info.message}`);
      }
      return req.login(user, loginError => {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        return res.redirect('/');
      });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
  },
  //카카오 로그인
  signInKakao: async (req, res) => {
    // const headers = req.headers['authorization'];
    // const kakaoToken = headers.split(' ')[1];

    const kakaoToken = 'UGSMtwDCR6mHKw0HY-2n58NdRqBF47LquCCKAPltCj1zmwAAAYmDafUb';

    const accessInfo = await userService.signInKakao(kakaoToken);

    return res.status(200).json({ userInfo: accessInfo });
  },

  //카카오 로그인 성공 시 이동
  kakaoLogin: async (req, res) => {
    res.redirect('/');
  },
  //팔로우
  follow: async (req, res, next) => {
    try {
      const user = await User.findOne({ where: { id: req.user.id } });
      if (user) {
        //req.user.id가 followerId, req.params.id가 followingId
        await user.addFollowing(parseInt(req.params.id, 10));
        res.send('success');
      } else {
        res.status(404).send('no user');
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  //로그아웃
  logout: async (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
  },
};

export { userController };
