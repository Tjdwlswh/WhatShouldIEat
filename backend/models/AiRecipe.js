import { Sequelize } from 'sequelize';

class AiRecipe extends Sequelize.Model {
  static initiate(sequelize) {
    AiRecipe.init(
      {
        foodname: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        ingredients: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        recipe: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'AiRecipe',
        tableName: 'aiRecipes',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {
    db.AiRecipe.belongsTo(db.Recipe, { foreignKey: 'recipeId', targetKey: 'id' });
    db.AiRecipe.belongsToMany(db.Ingredient, {
      through: 'AiRecipeIngredient',
      onDelete: 'CASCADE',
    });
  }
}

export { AiRecipe };
