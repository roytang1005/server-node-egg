# server-node-egg

使用 [`Egg.js`](https://eggjs.org/zh-cn/) 实现注册、登录和退出的账户功能。

## 依赖

```bash
npm i
```


## MySQL 数据库配置

请修改 `config/config.local.js` 和 `database/config.json` 中的配置。

config/config.local.js:

```js
exports.sequelize = {
  dialect: 'mysql',
  database: 'Lu_development',
  password: 'TryaWcj1314',
  host: '127.0.0.1',
  port: 3306
};
```

database/config.json:

```json
{
  "development": {
    "username": "root",
    "password": "TryaWcj1314",
    "database": "Lu_development",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  }
}
```


## 初始化数据库

```bash
npm run db:init
```
> 请确保已开启 mysql 服务


## 启动本地服务

```bash
npm run dev
```


## 备注

Postman 接口合集见 `app/public/server-node-egg.postman_collection.json`，Postman 中导入即可。

### 默认账号：

用户名：test 

密码：123456
> 密码需 `md5` 加密后提交

### 账号注册

Post /api/register

```js
{
  username: 'test',
  password: '123456',
  mail: '17326180619@163.com' // 可选
}
```

### 账号密码登录

Post /api/login/account



```js
{
  username: 'test',
  password: 'e10adc3949ba59abbe56e057f20f883e',
  rememberMe: true // 可选
}
```

### 退出登录

Get /api/logout/:id

