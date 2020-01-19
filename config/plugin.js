'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // 参数校验插件
  validate: {
    enable: true,
    package: 'egg-validate'
  },
  // 开启 egg-sequelize 插件来使用 sequelize ORM 框架
  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  }
};
