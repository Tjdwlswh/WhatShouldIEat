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
