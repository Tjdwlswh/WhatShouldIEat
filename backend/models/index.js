import Sequelize from 'sequelize';
import { config } from '../config/config.js';
import { User } from './User.js';
import { Recipe } from './Recipe.js';
import { Hashtag } from './Hashtag.js';
import { Comment } from './Comment.js';
import { Ingredient } from './Ingredient.js';

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;
db.Recipe = Recipe;
db.Hashtag = Hashtag;
db.Comment = Comment;
db.Ingredient = Ingredient;

User.initiate(sequelize);
Recipe.initiate(sequelize);
Hashtag.initiate(sequelize);
Comment.initiate(sequelize);
Ingredient.initiate(sequelize);

User.associate(db);
Recipe.associate(db);
Hashtag.associate(db);
Comment.associate(db);
Ingredient.associate(db);

export { db, sequelize };
