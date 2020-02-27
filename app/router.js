'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('home_v1', '/', controller.home.index);
  router.post('register_v1', '/api/v1/register', controller.user.register);
  router.post('account_v1', '/api/v1/login/account', controller.user.loginAccount);
  router.get('logout_v1', '/api/v1/logout/:id', controller.user.logout);
  router.post('request_verification_v1', '/api/v1/users/:username/emails/:id/request_verification', controller.user.requestVerification);
};
