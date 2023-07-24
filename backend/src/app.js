import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import { initializePassport } from './middlewares/passport/index.js';
import { sequelize } from '../models/index.js';
import { passportConfig } from '../passport/index.js';
import { errorMiddleWare } from './middlewares/errorMiddleWare.js';
import { imgUploadRouter } from './imgUploads/imgUploadRouter.js';
import { userRouter } from './users/userRouter.js';
import { followRouter } from './follows/followRouter.js';
const app = express();
const passport = initializePassport();

app.use(cors());

/************ 
    DB연결
*************/
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('아싸! MySQL 연결 성공');
  })
  .catch(err => {
    console.error(err);
  });
//개발 중 로깅남겨주기
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }),
);
app.use(passport.initialize());
// app.use(passport.session());

app.use('/auth', userRouter);

app.get('/', (req, res) => {
  res.send('Hello, #뭐해먹지?');
});
app.use(imgUploadRouter);

app.use(userRouter);
app.use(followRouter);

app.use(errorMiddleWare);

export { app };
