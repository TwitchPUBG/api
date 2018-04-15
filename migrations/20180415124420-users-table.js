'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      twitchId: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      twitchName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      accessToken: {
        type: Sequelize.BLOB,
        allowNull: false
      },
      refreshToken: {
        type: Sequelize.BLOB,
        allowNull: false
      },
      botActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  }
};
