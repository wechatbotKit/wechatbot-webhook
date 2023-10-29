<div align="center">
<img src="https://cdn.jsdelivr.net/gh/danni-cool/danni-cool@cdn/image/wechatbot-webhook.png" width="500" height="251"/>

用 http 请求即可给微信发消息，集成了[Wechaty](https://github.com/wechaty/wechaty)大部分消息功能， 快用它集成到自己的自动化工作流中吧

![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/danni-cool/docker-wechatbot-webhook/release.yml) ![Docker Pulls](https://img.shields.io/docker/pulls/dannicool/docker-wechatbot-webhook) ![GitHub release (with filter)](https://img.shields.io/github/v/release/danni-cool/docker-wechatbot-webhook)

[view this project on docker hub :)](https://hub.docker.com/repository/docker/dannicool/docker-wechatbot-webhook/general)

✅[Todo](https://github.com/danni-cool/docker-wechatbot-webhook/issues/11) & 💬[Discussion(Discord)](https://discord.gg/jRX5F2Km)

> 项目基于web协议，已知登录几天会掉，需要重新登录。这是网页微信风控的问题。但是网页版相对轻量，仍然适合调试学习使用，有兴趣的可以关注windows分支

</div>

## Windows 底层协议平替

1. 构建所需依赖 微信 3.9.2.23 版本 exe 文件，重命名并放入 root/WeChatSetup-3.9.2.23.exe
2. docker build -t docker-wechatbot-webhook:test .
3. 修改 docker-compose.yml volumes 配置
4. docker-compose up -d

## 现有问题
- [x] <del>docker 基础镜像选择编写 </del>
- [x] <del>解决 wine 环境Windows 版本 Node 无法运行的问题，以及 wechaty-puppet-xp 的 frida 模块找不到 Process的问题</del>
- [x] <del>解决 wine 环境下frida attach进程和node代码联动问题</del>
- [ ] 解决远程attach后消息收发（文件、图片）无反应
  - [x] <del>解决无法发送文件url</dev>
  - [ ] 解决无法发送本地文件(formData发送）
  - [ ] 解决无法接受文件
- [ ] docker 镜像优化

## Credit

- https://github.com/wechaty/puppet-xp
- https://github.com/ChisBread/wechat-box
