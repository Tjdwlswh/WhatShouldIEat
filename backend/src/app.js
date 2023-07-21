import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import { sequelize } from '../models/index.js';
import { passportConfig } from '../passport/index.js';

const app = express();

dotenv.config();
passportConfig(); // 패스포트 설정

app.use(cors());

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
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/img', express.static(path.join(__dirname, 'uploads')));
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
app.use(passport.session());

app.get('/', (req, res) => {
  res.json({ message: 'hello world' });
});
//에러처리 미들웨어
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

export { app };
