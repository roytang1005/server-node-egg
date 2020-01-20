'use strict';

const Service = require('egg').Service;
const md5 = require('crypto-js/md5');

class UserService extends Service {
  async register(req) {
    const { ctx } = this;
    const { username, password, mail } = req;
    // 用户名具有唯一性
    // 判断是否已经存在该用户名的用户
    const user = await ctx.model.User.findOne({
      where: { username}
    });
    if (!user) {
      await ctx.model.User.create({
        username,
        mail,
        password: md5(password).toString()
      });
      return {
        status: 'ok'
      };
    } else {
      return {
        status: 'error',
        message: '用户名已存在，请重新注册'
      };
    };
  }

  async loginAccount(req) {
    const { ctx } = this;
    const { username, password, rememberMe } = req;
    // 用户存在性和密码正确性不做具体区分
    // 客户端 password 转 md5 后传递
    const user = await ctx.model.User.findOne({
      where: { username, password }
    });
    if (user) {
      const { id, username, mail, created_at, updated_at } = user;
      // 设置 Session
      ctx.session.user = user;
      // 刷新用户的 CSRF token
      ctx.rotateCsrfSecret();
      // 客户端选择「记住我」，设置 session 30天有效期
      if (rememberMe) ctx.session.maxAge = ms('30d');
      return {
        status: 'ok',
        data: { id, username, mail, created_at, updated_at }
      };
    } else {
      return {
        status: 'error',
        message: '用户名或密码错误'
      };
    };
  }

  /**
   * 退出登录
   * @param {string} id userId
   */
  async logout(id) {
    const { ctx } = this;
    // 是否是当前登录的用户
    if (ctx.session.user && `${ctx.session.user.id}` === id) {
      ctx.session = null;
      return {
        status: 'ok'
      };
    } else {
      return {
        status: 'error',
        message: '未登录，请先登录'
      };
    }
  }
}

module.exports = UserService;
