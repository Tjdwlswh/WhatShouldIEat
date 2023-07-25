import { Sequelize } from 'sequelize';

class Hashtags extends Sequelize.Model {
  static initiate(sequelize) {
    Hashtags.init(
      {
        tag: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Hashtag',
        tableName: 'hashtags',
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {}
}

export { Hashtags };
