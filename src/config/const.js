module.exports = {
  isWinMode: process.env.WECHATY_PUPPET === 'wechaty-puppet-xp',
  // http://jkorpela.fi/chars/spaces.html
  // String.fromCharCode(8197)
  AT_SEPARATOR: String.fromCharCode(0x2005),
}
