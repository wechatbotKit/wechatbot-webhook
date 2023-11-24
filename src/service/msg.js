const Utils = require('../utils/index.js')
const Service = require('../service/index.js')
const { AT_SEPARATOR } = require('../config/const.js')

// this handler convert data to a standard format before using wechaty to send msg,
const formatAndSendMsg = async function ({
  isRoom,
  bot,
  type,
  content,
  msgInstance,
}) {
  switch (type) {
    // 纯文本消息和群聊中 @人 消息
    case 'text': {
      // 群聊消息@人，固定范式 @[名字]空格 + xxx
      const matchMentionedRes = content.match(/@[^\t\s]+\s/g)
      if (isRoom && matchMentionedRes) {
        // 建立关系映射
        const atNameUniqueList = Utils.uniqueByProperty(
          matchMentionedRes.map((str) => ({
            originalAtName: str,
            atName: str.trim().replace(/@/, ''),
            contact: null,
            roomAlias: '',
          })),
          'originalAtName',
        )

        // 批量查询艾特的人是否在群里
        const members = []

        for (let i = 0; i < atNameUniqueList.length; i++) {
          const { contact, roomAlias } = await Service.getRoomAlias(
            atNameUniqueList[i].atName,
            msgInstance,
          )
          atNameUniqueList[i].contact = contact
          atNameUniqueList[i].roomAlias = roomAlias
        }

        // 替换原始消息的艾特名成群消息的艾特名
        const atNameMap = atNameUniqueList.reduce((pre, next) => {
          pre[next.originalAtName] = next
          return pre
        }, {})

        let alternativeContent = content
        Object.keys(atNameMap).forEach((originalAtName) => {
          // 只替换能查到
          if (atNameMap[originalAtName].roomAlias) {
            alternativeContent = alternativeContent.replace(
              new RegExp(originalAtName, 'g'),
              `@${atNameMap[originalAtName].roomAlias}${AT_SEPARATOR}`,
            )

            members.push(atNameMap[originalAtName].contact)
          }
        })
        const member1 = await msgInstance.memberAll()

        // await msgInstance.say(content, ...member1)
        // const { contact, roomAlias } = await Service.getRoomAlias(
        //   matchMentionedRes[0].trim().replace('@', ''),
        //   msgInstance,
        // )
        // await msgInstance.say`Hello, ${contact}`
        await msgInstance.say(content, ...member1)
        // 正常发送文本消息
      } else {
        await msgInstance.say(content)
      }

      return true
    }

    case 'fileUrl': {
      const fileUrlArr = content.split(',')
      // 单文件
      if (fileUrlArr.length === 1) {
        const file = await Utils.getMediaFromUrl(content)
        await msgInstance.say(file)
        return true
      }

      // 多个文件的情况
      for (let i = 0; i < fileUrlArr.length; i++) {
        const file = await Utils.getMediaFromUrl(fileUrlArr[i])
        await msgInstance.say(file)
      }
      return true
    }
    // 文件
    case 'file':
      await msgInstance.say(Utils.getBufferFile(content))
      return true
  }
}

module.exports = {
  formatAndSendMsg,
}
