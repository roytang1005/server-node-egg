'use strict';
const nodemailer = require('nodemailer');
const emailConfig = require('../config/emailConfig');

module.exports = {
  // 创建邮件实例
  createEmailTransporter() {
    const { host, port, secure, user, pass } = emailConfig;
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass }
    });

    return transporter;
  },

  // 发送激活邮件
  async sendValidateEmail(user) {
    const { validateEmail, user: fromEmail } = emailConfig;
    const { subject, html } = validateEmail(user);
    console.log(`"Todo Team" <${fromEmail}>`);

    const info = await this.createEmailTransporter().sendMail({
      from: {
        name: 'Todo Team',
        address: fromEmail
      },
      to: user.email,
      subject,
      html
    });
  },

  /**
   * 密码强度校验
   * - 至少包含一个小写字母和一个数字的 8位 字符串
   * - 任意字符的 16 位字符串
   */
  validatePassword(password) {
    return password.length === 16 || password.length === 8 && /\d/.test(password) && /[a-z]/.test(password);
  }
};
