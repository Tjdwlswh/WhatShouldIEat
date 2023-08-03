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
          allowNull: true,
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
    db.Recipe.belongsTo(db.User, { onDelete: 'CASCADE' }); // 레시피 모델에 userId컬럼 추가됨
    db.Recipe.belongsToMany(db.User, { through: 'Likeit', as: 'Likers', onDelete: 'CASCADE' }); // through 옵션: 생성할 모델 이름 지정 , 레시피에 likeit
    //as는 프론트에 전달할 객체의 key
    db.Recipe.belongsToMany(db.Hashtag, { through: 'RecipeHashtag', onDelete: 'CASCADE' });
    db.Recipe.hasMany(db.Comment, { foreignKey: 'recipeId', sourceKey: 'id', onDelete: 'CASCADE' });
    db.Recipe.belongsToMany(db.Ingredient, { through: 'RecipeIngredient', onDelete: 'CASCADE' });
    db.Recipe.hasOne(db.AiRecipe, {
      foreignKey: 'recipeId',
      sourceKey: 'id',
      onDelete: 'CASCADE',
    });
  }
}

export { Recipe };
