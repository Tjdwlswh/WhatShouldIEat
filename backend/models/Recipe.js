import { Sequelize } from 'sequelize';

class Recipe extends Sequelize.Model {
  static initiate(sequelize) {
    Recipe.init(
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
        tags: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        foodImg: {
          type: Sequelize.STRING(200),
          allowNull: true,
          defaultValue: '1686823001485.png',
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Recipe',
        tableName: 'recipes',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {
    db.Recipe.belongsTo(db.User); // 레시피 모델에 userId컬럼 추가됨
    db.Recipe.belongsToMany(db.User, { through: 'Like' }); 

    db.Recipe.belongsToMany(db.Hashtag, { through: 'RecipeHashtag' }); //post.getHashtags, post.addHashtags
    db.Recipe.hasMany(db.Comment);
    db.Recipe.belongsToMany(db.Ingredient, { through: 'recipeIngredient' });
  }
}

export { Recipe };
