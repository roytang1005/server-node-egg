exports.sequelize = {
  dialect: 'mysql',
  database: 'Lu_development',
  password: 'TryaWcj1314',
  host: '127.0.0.1',
  port: 3306
};

// 本地开发关闭 CSRF 安全防范
exports.security = {
  csrf: {
    enable: false
  }
};
