import { Sequelize } from 'sequelize';

class Comment extends Sequelize.Model {
  static initiate(sequelize) {
    Comment.init(
      {
        comment: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        recipeUserId: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Comment',
        tableName: 'comments',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {
    db.Comment.belongsTo(db.User, { foreignKey: 'commenterId', targetKey: 'id', as: 'commenter' });
    db.Comment.belongsTo(db.Recipe, { foreignKey: 'recipeId', targetKey: 'id' }); // Comment모델에 recipeId 컬럼이 추가됨
  }
}

export { Comment };
