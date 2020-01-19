'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/register', controller.user.register);
  router.post('/api/login/account', controller.user.loginAccount);
  router.get('/api/logout/:id', controller.user.logout);
};
