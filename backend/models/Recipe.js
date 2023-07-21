import { Sequelize } from 'sequelize';

class Recipes extends Sequelize.Model {
  static initiate(sequelize) {
    Recipes.init({
      
    })
  }

  static associate(db) {}
}

module.exports = Recipes;
