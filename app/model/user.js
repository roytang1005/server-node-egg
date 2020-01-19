'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    username: { type: STRING, unique: true },
    password: STRING,
    mail: STRING
  });

  return User;
};
