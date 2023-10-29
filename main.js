require('dotenv').config()
const { PORT } = process.env
const express = require('express')
const wechatBotInit = require('./src/wechaty/init')
const registerRoute = require('./src/route')
const app = express()
const bot = wechatBotInit()

app.use(express.json())

// 注册webhook
registerRoute({ app, bot })

app.listen(PORT, () => {
  // console.log(`service is running`);
})

// const frida = require('frida');

// async function main() {
//   const deviceManager = frida.getDeviceManager();
//   const device = await deviceManager.addRemoteDevice('127.0.0.1:27042'); // 连接到 localhost 的 27042 端口

//   // 列出所有进程
//   const processes = await device.enumerateProcesses();
//   for (const process of processes) {
//     console.log(`PID: ${process.pid}, Name: ${process.name}`);

//     if (process.name === 'WeChat.exe') {
//       const session = await device.attach('wechat.exe'); // 附加到 wechat.exe
//       console.log('Attached to wechat.exe');
//     }
//   }
// }
