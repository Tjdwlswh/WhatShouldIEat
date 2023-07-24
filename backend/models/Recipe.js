import { Sequelize } from 'sequelize';

class Recipes extends Sequelize.Model {
  static initiate(sequelize) {
    Recipes.init(
      {
        foodName: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Recipe',
        tableName: 'recipes',
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {}
}

export { Recipes };
