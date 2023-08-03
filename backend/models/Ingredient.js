import { Sequelize } from 'sequelize';

class Ingredient extends Sequelize.Model {
  static initiate(sequelize) {
    Ingredient.init(
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
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.Ingredient.belongsToMany(db.Recipe, { through: 'RecipeIngredient' });
    db.Ingredient.belongsToMany(db.AiRecipe, { through: 'AiRecipeIngredient' });
  }
}

export { Ingredient };
