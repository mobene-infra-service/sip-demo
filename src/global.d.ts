type LoginInfoType = {
  host: string
  port: string
  domain: string
  proto: boolean
  extNo: string
  extPwd: string
  stun: {
    type: 'stun' | 'turn'
    host: string
    username: string
    password: string
  }
  checkMic: boolean
  autoRegister: boolean
  autoAnswer: boolean
  autoMute: boolean
  lang: string
}

type SipStateType = {
  statusIsring: boolean //是否在振铃中
  statusIsCall: boolean //是否在拨打中
  statusIsHold: boolean //是否在保持中

  callDirection: string //呼叫方向

  agentNo: string //分机号
  discaller: string //主叫号码
  discallee: string //被叫号码
  callPhoneNumber: string //呼出号码

  historyAccounts: string[] //历史账号列表
  lastAccount: string //最后一次使用的账号配置

  networkSpeed: number //网速
  testMicrophoneOb: null | any
  testMicrophoneVolume: number
  mediaDevices: null

  latency_stat: undefined
  autoAnswer: boolean //自动接听
  autoDisableMic: boolean //自动静音
  disableMic: boolean //静音

  loading: null
  sipClient: undefined
  locale: 'zh' | 'en' | 'es' | 'pt'
  locales: { label: string; value: string }[]
  callEndInfo: undefined
  sipStatus: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  // 1: 离线, 2: 空闲, 3: 响铃中, 4: 通话中, 5: 摘机中, 6: 小休中 7:转接中
  statusMap: {
    0: '未连接'
    1: '离线'
    2: '空闲'
    3: '响铃中'
    4: '通话中'
    5: '摘机中'
    6: '小休中'
    7: '转接中'
  }
  dialogVisible: boolean
  transferNumber: string
  callbackInfo: string
}
