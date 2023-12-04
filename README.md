<div align="center">
<img src="https://cdn.jsdelivr.net/gh/danni-cool/danni-cool@cdn/image/wechatbot-webhook.png" width="500" height="251"/>

用 http 请求即可给微信发消息，集成了[Wechaty](https://github.com/wechaty/wechaty)大部分消息功能， 快用它集成到自己的自动化工作流中吧

![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/danni-cool/docker-wechatbot-webhook/release.yml) ![Docker Pulls](https://img.shields.io/docker/pulls/dannicool/docker-wechatbot-webhook) ![GitHub release (with filter)](https://img.shields.io/github/v/release/danni-cool/docker-wechatbot-webhook)

[view this project on docker hub :)](https://hub.docker.com/repository/docker/dannicool/docker-wechatbot-webhook/general)

✅[Todo](https://github.com/danni-cool/docker-wechatbot-webhook/issues/11) & 💬[Discussion(Discord)](https://discord.gg/935xZTD9)

该版本是windows分支，目前正在WIP，目标是替代web协议，打造一个稳定长期在线的机器人

</div>

## Screenshot

![](https://cdn.jsdelivr.net/gh/danni-cool/danni-cool@cdn/image/wine-wecaht-screenshot.png)

## Install

### 1. 拉取镜像

```bash
docker pull dannicool/docker-wechatbot-webhook:windows

docker run -d \
--name wxBotWebhook \
-p 8080:8080 \
-p 3001:3001 \
-p 8022:22 \
dannicool/docker-wechatbot-webhook:windows
```

### 2. 连接 noVnc

网页打开 http://localhost:8080

### 3. 安装程序

在资源管理器进入 /home/docker 找到安装程序 如 screenshot 所示双击安装，扫码登录微信

## Launch Project

### 4. 启动本项目

在ssh中启动本项目（确保你已经登录windows微信）

```zsh
cd /home/docker/node

npm start
```

### 5. 调用webhook

enjoy it. 使用 3001 端口暴露的 webhook http 服务

## FAQ

### 1. 关掉了如何启动

1. 使用 ssh 服务启动

```bash
# 连接终端
ssh docker@localhost -p 8022
# 输入密码
1234
# 切换到docker用户
su docker
# 启动微信
wechat-start
```
2. 在图形界面找到 My Computer > C:\Program Files\Tencent\WeChat\WeChat.exe 双击启动

## Recognized Problem
1. wine模拟图形界面 cpu 和 内存占用高 [Test Results of Running Wechat on WineHq](https://appdb.winehq.org/objectManager.php?sClass=version&iId=41375)

2. 接收到图片、语音、视频信息等有几率会引起应用本身崩溃


## TODO
see https://github.com/danni-cool/docker-wechatbot-webhook/issues/11

## Credit

- https://github.com/wechaty/puppet-xp
- https://github.com/sykuang/docker-wine-x11-novnc
