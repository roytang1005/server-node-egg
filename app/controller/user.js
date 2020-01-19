'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 注册用户
  async register() {
    const { ctx, service } = this;
    const req = ctx.request.body;
    // 参数校验规则
    const rules = {
      username: { type: 'string', trim: true },
      password: { type: 'string', trim: true },
      mail: { type: 'email', required: false }
    };
    // 校验参数
    ctx.validate(rules, req);
    const res = await service.user.register(req);
    ctx.body = res;
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
}

module.exports = UserController;
