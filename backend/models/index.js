import Sequelize from 'sequelize';
import config from '../config/config.js';
import User from './schemas/User.js';

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// const sequelize = new Sequelize(config.database, config.username, config.password, {
//   host: config.host,
//   dialect: config.dialect,
// });

db.sequelize = sequelize;
db.User = User;

User.init(sequelize);

User.associate(db);

export { db, sequelize };
