import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
// import swaggerUi from 'swagger-ui-express';
// import swaggerFile from '../swagger-output.json' assert { type: 'json' };
import { initializePassport } from './middlewares/passport/index.js';
import { sequelize } from '../models/index.js';
import { errorMiddleWare } from './middlewares/errorMiddleWare.js';
import { imgUploadRouter } from './imgUploads/imgUploadRouter.js';
import { userRouter } from './users/userRouter.js';
import { followRouter } from './follows/followRouter.js';
import { recipeRouter } from './recipes/recipeRouter.js';
const app = express();
const passport = initializePassport();

app.use(cors({ origin: true, credentials: true }));

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
// 쿠키 읽을때 req.signedCookie

app.use(passport.initialize());

app.get('/', (req, res) => {
  res.send('Hello, #뭐해먹지?');
});

// app.use('/auth', userRouter);

app.use([imgUploadRouter, userRouter, followRouter, recipeRouter]);
// app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(errorMiddleWare);

export { app };
