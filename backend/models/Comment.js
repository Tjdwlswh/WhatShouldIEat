import { Sequelize } from 'sequelize';

class Comments extends Sequelize.Model {
  static initiate(sequelize) {
    Comments.init(
      {
        comment: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Comment',
        tableName: 'comments',
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {}
}

export { Comments };
