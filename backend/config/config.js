import dotenv from 'dotenv';

// .env 파일의 설정 값을 불러옴
dotenv.config();

const env = process.env;

const config = {
  host: env.DB_HOST,
  username: 'root',
  password: env.DB_PWD,
  database: env.DB_NAME,
  dialect: 'mysql',
  logging: false,
};

export { config };
