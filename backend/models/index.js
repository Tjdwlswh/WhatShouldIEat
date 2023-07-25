import Sequelize from 'sequelize';
import { config } from '../config/config.js';
import { User } from './User.js';

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;

User.initiate(sequelize);

User.associate(db);

export { db, sequelize };
