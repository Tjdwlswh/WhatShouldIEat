import Sequelize from 'sequelize';

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        nickName: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        profileImg: {
          type: Sequelize.STRING(200),
          allowNull: true,
          defaultValue: '1686823001485.png',
        },
        provider: {
          type: Sequelize.ENUM('local', 'kakao', 'google'),
          allowNull: false,
          defaultValue: 'local',
        },
        socialToken: {
          type: Sequelize.STRING(300),
          allowNull: true,
        },
        refreshToken: {
          type: Sequelize.STRING(300),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {
    db.User.hasMany(db.Recipe);
    db.User.belongsToMany(db.Recipe, { through: 'Like' });
    db.User.belongsToMany(db.User, {
      foreignKey: 'followingId',
      as: 'Followers', //user.getFollowers
      through: 'Follow',
    });
    db.User.belongsToMany(db.User, {
      foreignKey: 'followerId',
      as: 'Followings', //user.getFollowings
      through: 'Follow',
    });
    db.User.hasMany(db.Comment, { foreignKey: 'commenterId', sourceKey: 'id' });
  }
}

export { User };
