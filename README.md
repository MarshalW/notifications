# notifications

## 安装和运行

安装：

```
npm install
```

运行前的配置，编写`config/default.json`或者`config/production.json`（如果设置`NODE_ENV=production`）

需要配置的参数：

* 推送
    * mailTo，推送服务需要的作者信息
    * publicKey, 公钥
    * privateKey，密钥
* 数据库，Firestore，需要你注册Google一个数据库，免费的
    * projectId，创建数据库会有一个id
    * keyFilename，密钥相关文件的路径，创建数据库后可下载

配置文件内容类似这样：

```
{
  "projectId": "yourAppId",
  "keyFilename": "./config/keyfile.json",
  "mailTo": "mailto:yourname@qq.com",
  "vapidDetails": {
    "publicKey": "keyxxxxx",
    "privateKey": "keyxxxxx"
  }
}

```

运行：

```
npm start
```

