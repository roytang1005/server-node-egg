'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  /**
   * 注册用户
   */
  async register() {
    const { ctx, service } = this;
    const req = ctx.request.body;
    // 参数校验规则
    const rules = {
      username: { type: 'string', trim: true },
      password: { type: 'string', trim: true },
      email: { type: 'email' },
      all_emails: { type: 'boolean', required: false, default: true }
    };
    // 校验参数
    ctx.validate(rules, req);
    // 密码强度校验
    if (ctx.helper.validatePassword(req.password)) {
      const res = await service.user.register(req);
      ctx.body = res;
    } else {
      ctx.body = {
        status: 'error',
        message: '密码强度有误'
      };
    }
    ctx.status = 200;
  }

  // 账号密码登录
  async loginAccount() {
    const { ctx, service } = this;
    const req = ctx.request.body;
    const rules = {
      username: { type: 'string', trim: true },
      password: { type: 'string', trim: true },
      rememberMe: { type: 'boolean', required: false, default: false }
    };
    ctx.validate(rules, req);
    const res = await service.user.loginAccount(req);
    ctx.body = res;
    ctx.status = 200;
  }

  // 退出登录
  async logout() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.user.logout(id);
    ctx.body = res;
    ctx.status = 200;
  }
  
  // 发送账户验证邮件
  async requestVerification() {
    const { ctx, service } = this;
    const { username, id } = ctx.params;
    console.log(ctx.params);
    const res = await service.user.requestVerification({ username, id });
    ctx.body = res;
    ctx.status = 200;
  }
}

module.exports = UserController;
