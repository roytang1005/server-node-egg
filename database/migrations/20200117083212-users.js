'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
      username: { type: STRING, unique: true },
      password: STRING,
      mail: STRING,
      created_at: DATE,
      updated_at: DATE
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  }
};
