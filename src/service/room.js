/**
 * 功能：根据昵称,群，获取该昵称对应的群昵称
 */

const getRoomAlias = async (name, room) => {
  let contact = null
  let roomAlias = ''

  try {
    contact = await room.member(name)
  } catch (_) {}

  if (contact) {
    try {
      roomAlias = await room.alias(contact)
    } catch (_) {}
  }

  if (!roomAlias && contact) {
    roomAlias = contact.name()
  }

  return {
    contact,
    roomAlias,
  }
}

module.exports = {
  getRoomAlias,
}
