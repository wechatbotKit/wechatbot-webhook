type msgInstanceType =
  | import('wechaty').Message
  | import('wechaty').Room
  | import('wechaty/impls').ContactInterface

type extendedMsg =
  | import('wechaty').Message
  | (import('@src/utils/msg').CommonMsg & { isSystemEvent: boolean })

type pushMsgValidPayload = {
  key:
    | 'to'
    | 'isRoom'
    | 'type'
    | 'data'
    | 'content'
    | 'data.type'
    | 'data.content'
  val: string | number
  required: boolean
  type: string | string[]
  enum?: Array<string | number>
  unValidReason: string
}

type payloadFormFile = File & { convertName: string }

type pushMsgUnitPayload = {
  type: 'text' | 'fileUrl' | 'file' | 'base64'
  content: string
  fileAlias?: string
}

type pushMsgUnitTypeOpt = {
  type?: 'text' | 'fileUrl' | 'file' | 'base64'
  content?: string
  fileAlias?: string
}

type msgData = {
  success?: boolean
  error?: never
} & pushMsgUnitTypeOpt

type toType = string | { alias: string }

type pushMsgMainOpt = {
  to: toType
  isRoom?: boolean
  data: pushMsgUnitTypeOpt | pushMsgUnitTypeOpt[]
}

type pushMsgMain = {
  to: toType
  isRoom: boolean
  data: pushMsgUnitPayload
}

type pushFileMsgType = {
  to: toType
  isRoom: boolean
  content: File
}

type pushMsgV1Type = {
  to: toType
  isRoom: boolean
  content: string
  type: 'text' | 'fileUrl'
}

type msg2SingleStatus =
  | ''
  | 'SendingTaskDone'
  | 'batchSendingTaskDone'
  | 'not found'

type preCheckStatus =
  | 'valid'
  | 'unValidDataMsg'
  | 'unValidMsgParent'
  | 'RoomAliasNotSupported'

type statusResolverStatus = msg2SingleStatus | preCheckStatus

type statusResolverOpt = {
  count?: number
  rejectReasonObj?: msg2SingleRejectReason | null
  sendingTaskObj?: sendingTaskType | null
  notFoundObj?: msg2SingleRejectReason | null
}

type rejectReasonDataType = pushMsgUnitTypeOpt & {
  error?: string
}

type msg2SingleRejectReason = {
  to: toType
  isRoom?: boolean | undefined
  error?: string
  data?: rejectReasonDataType | rejectReasonDataType[]
}

type failedTaskType = {
  to: toType
  isRoom?: boolean
  data:
    | (pushMsgUnitTypeOpt & { error?: never })
    | (pushMsgUnitTypeOpt & { error?: never })[]
    | []
}

type sendingTaskType = {
  success: boolean
  successCount: number
  failedTask: null | failedTaskType
}

type msgV2taskType = {
  totalCount: number
  successCount: number
  failedCount: number
  reject: msg2SingleRejectReason[]
  sentFailed: failedTaskType[]
  notFound: msg2SingleRejectReason[]
}

type standardV2Payload = {
  to: string | { alias: string }
  isRoom: boolean
  data: pushMsgUnitTypeOpt | pushMsgUnitTypeOpt[]
  unValidParamsStr: string
}

type systemEventPayload = {
  event: keyof typeof import('@src/config/const').legacySystemMsgStrMap
  user?: import('wechaty').Contact
  recvdApiReplyNotify?: {
    success: boolean
    task: msgV2taskType
    message: string
    status: number
  }
  error?: import('gerror').GError
}

type msgStructurePayload = {
  content: string | (import('file-box').FileBoxInterface & { _name: string })
  type: number
  type_display: string
  isSystemEvent?: boolean
  self: boolean
  from: import('wechaty').Contact | ''
  to: msgInstanceType
  room: import('wechaty').Room | ''
  file?: '' | File
}

type commonMsgPayload = {
  text?: string
  type: import('@src/config/const').MSG_TYPE_ENUM
  isSystemEvent?: boolean
  self?: boolean
  from?: import('wechaty').Contact | ''
  to?: msgInstanceType
  room?: import('wechaty').Room | ''
  file?: string | (import('file-box').FileBoxInterface & { _name: string })
}

type roomInfoForUpload = import('wechaty/impls').RoomInterface & {
  payload: {
    memberList: {
      id: string
      name: string
      alias: string | undefined
      avatar: string
    }[]
  }
}
