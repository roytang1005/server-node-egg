'use strict';

const md5 = require('crypto-js/md5');

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('Users', [{
      username: 'test',
      password: md5('123456').toString(),
      mail: '17326180619@163.com',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: async queryInterface => {
   await queryInterface.bulkDelete('Users', null, {});
  }
};
