require('dotenv').config({
  path: process.env.homeEnvCfg /** 兼容cli调用 */ ?? './.env'
})
/** log 在 prestart 阶段初始化了，后续需要手动改level才能同步env配置  */
require('./src/utils/index').proxyConsole({
  logLevel: process.env.LOG_LEVEL
})
const { PORT } = process.env
const { Hono } = require('hono')
const { serve } = require('@hono/node-server')
const wechatBotInit = require('./src/wechaty/init')
const registerRoute = require('./src/route')
const bot = wechatBotInit()
const { exec } = require('child_process')
const app = new Hono()

/**
 * @param {import('hono').Context} ctx
 * @param {import('hono').Next} next
 */
const attachData = (ctx, next) => {
  ctx.bot = bot
  return next()
}

app.use('*', attachData)

// 注册webhook
registerRoute({ app, bot })

serve({
  fetch: app.fetch,
  port: Number(PORT)
})

// 定时清理tmp文件夹任务
exec('node scripts/scheduleClear', (error, stdout, stderr) => {
  if (error) {
    console.error(`执行定时任务出错: ${error}`)
    return
  }
  console.log(`定时任务输出: ${stdout}`)
  console.error(`定时任务错误输出: ${stderr}`)
})
