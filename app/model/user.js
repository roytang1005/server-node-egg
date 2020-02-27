'use strict';

module.exports = app => {
  const { STRING, BOOLEAN, INTEGER } = app.Sequelize;

  const User = app.model.define('user', {
    username: { type: STRING, unique: true },
    password: STRING,
    email: { type: STRING, unique: true },
    // 订阅邮件
    all_emails: BOOLEAN,
    // 用户状态: [0, 1] - [未激活，已激活]
    status: { type: INTEGER }
  });

  return User;
};
