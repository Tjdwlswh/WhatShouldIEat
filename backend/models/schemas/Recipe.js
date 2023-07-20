import { Sequelize } from 'sequelize';

class Recipes extends Sequelize.Model {
  static init(sequelize) {}

  static associate(sequelize) {}
}

module.exports = Recipes;
