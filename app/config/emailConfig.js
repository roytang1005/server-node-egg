'use strict';

// 激活邮件
function createValidateEmail(params) {
  const { username } = params;
  return {
    subject: '[Todo] Please verify your device',
    html: `
Hey ${username}!
<br>
<br>
A sign in attempt requires further verification because we did not recognize your device. To complete the sign in, enter the verification code on the unrecognized device.
<br>
<br>
Device: Safari on macOS
<br>
Verification code: 353121
<br>
<br>
If you did not attempt to sign in to your account, your password may be compromised. Visit <a href="https://github.com/settings/admin" style="text-decoration: none;" target="_blank">https://gith<wbr>ub.com/setti<wbr>ngs/admin</a> to create a new, strong password for your GitHub account.
<br>
<br>
If you'd like to automatically verify devices in the future, consider enabling two-factor authentication on your account. Visit <a href="https://help.github.com/articles/configuring-two-factor-authentication" style="text-decoration: none;" target="_blank">https://help.github.com/articles/configuring-two-factor-authentication</a> learn about two-factor authentication.
<br>
<br>
If you decide to enable two-factor authentication, ensure you retain access to one or more account recovery methods. See <a href="https://help.github.com/articles/configuring-two-factor-authentication-recovery-methods" style="text-decoration: none;" target="_blank">https://help.github.com/articles/configuring-two-factor-authentication-recovery-methods</a> in the GitHub Help.
<br>
<br>
Thanks,
<br>
The GitHub Team
`
  }
}

 module.exports = {
  host: 'smtp.163.com',
  port: 465,
  // true for 465, false for other ports
  secure: true,
  user: '17326180619@163.com',
  pass: '123456',
  validateEmail: user => createValidateEmail(user)
};
