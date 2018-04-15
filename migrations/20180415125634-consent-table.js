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
      option: {
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
      return queryInterface.addConstraint("consent", ["userId", "option"], {
        type: "unique",
        name: "consent_unique_userId_option"
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("consent", "consent_unique_userId_option")
    .then(() => {
      return queryInterface.dropTable("consent");
    });
  }
};
