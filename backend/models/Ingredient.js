import { Sequelize } from 'sequelize';

class Ingredients extends Sequelize.Model {
  static initiate(sequelize) {
    Ingredients.init(
      {
        ingredient: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Ingredient',
        tableName: 'ingredients',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {}
}

export { Ingredients };
