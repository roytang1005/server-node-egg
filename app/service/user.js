'use strict';

const Service = require('egg').Service;
const md5 = require('crypto-js/md5');
const nodemailer = require('nodemailer');

class UserService extends Service {
  /**
   * 注册用户
   */
  async register(req) {
    const { ctx } = this;
    const { username, password, email, all_emails } = req;
    // 用户名、邮箱具有唯一性
    const usernameExist = await ctx.model.User.findOne({
      where: {
        username,
      }
    });
    const emailExist = await ctx.model.User.findOne({
      where: {
        email,
      }
    });
    if (usernameExist) {
      return {
        status: 'error',
        message: '用户名已存在，请重新注册'
      };
    } else if (emailExist) {
      return {
        status: 'error',
        message: '邮箱地址已存在，请重新注册'
      };
    } else {
      await ctx.model.User.create({
        username,
        email,
        password: md5(password).toString(),
        // all_emails 可选参数，默认为 trues 即：接收订阅邮件
        all_emails
      });
      
      // 发送激活邮件
      ctx.helper.sendValidateEmail({
        username,
        email
      });

      return {
        status: 'ok'
      };
    };
  }

  /**
   * 账号登录
   */
  async loginAccount(req) {
    const { ctx } = this;
    const { username, password, rememberMe } = req;
    // 用户存在性和密码正确性不做具体区分
    // 客户端 password 转 md5 后传递
    const user = await ctx.model.User.findOne({
      where: { username, password }
    });
    if (user) {
      const { id, username, email, status, createdAt, updatedAt } = user;
      // 设置 Session
      ctx.session.user = user;
      // 刷新用户的 CSRF token
      ctx.rotateCsrfSecret();
      // 客户端选择「记住我」，设置 session 30天有效期
      if (rememberMe) ctx.session.maxAge = ms('30d');
      return {
        status: 'ok',
        data: { id, username, email, status, createdAt, updatedAt }
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

  async requestVerification(req) {
    const { username, id } = req;
    const transporter = nodemailer.createTransport({
      host: 'smtp.163.com',
      post: 587,
      secure: false,
      auth: {
        user: '17326180619@163.com',
        pass: '1005TryaWcj1314'
      }
    });

    const info = await transporter.sendMail({
      from: `17326180619@163.com`,
      to: '2232024021@qq.com',
      subject: 'Send email by Nodemailer',
      text: `Hello, ${username}!`,
      html: '<b>This email was sended by Nodemailer.</b>'
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}

module.exports = UserService;
