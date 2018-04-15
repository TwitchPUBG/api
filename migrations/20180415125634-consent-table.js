'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("consent", {
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade",
        primaryKey: true
      },
      key: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      given: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    })
    .then(() => {
      return queryInterface.addConstraint("consent", ["userId", "key"], {
        type: "unique",
        name: "consent_unique_userId_key"
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("consent", "consent_unique_userId_key")
    .then(() => {
      return queryInterface.dropTable("consent");
    });
  }
};
