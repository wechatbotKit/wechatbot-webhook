require('dotenv').config()
const { PORT } = process.env
const express = require('express')
const wechatBotInit = require('./src/wechaty/init')
const registerRoute = require('./src/route')
const app = express()
const bot = wechatBotInit()
const { exec } = require('child_process');

app.use(express.json())

// 注册webhook
registerRoute({ app, bot })

app.listen(PORT, () => {
  // console.log(`service is running`);
})

// 定时清理tmp文件夹任务
exec('node scripts/scheduleClear', (error, stdout, stderr) => {
  if (error) {
      console.error(`执行定时任务出错: ${error}`);
      return;
  }
  console.log(`定时任务输出: ${stdout}`);
  console.error(`定时任务错误输出: ${stderr}`);
});