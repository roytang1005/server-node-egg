'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, BOOLEAN } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
      username: { type: STRING, unique: true },
      password: STRING,
      email: { type: STRING, allowNull: false, unique: true },
      // 订阅邮件
      all_emails: { type: BOOLEAN, allowNull: false, defaultValue: true },
      // 用户状态: [0, 1] - [未激活，已激活]
      status: { type: INTEGER, allowNull: false, defaultValue: 0 },
      created_at: DATE,
      updated_at: DATE
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  }
};
