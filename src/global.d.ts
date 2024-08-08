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

  callDirection: string //呼叫方向

  agentNo: string //分机号
  discaller: string //主叫号码
  discallee: string //被叫号码

  historyAccounts: string[] //历史账号列表
  lastAccount: string //最后一次使用的账号配置

  networkSpeed: number //网速
  testMicrophoneOb: null | any
  testMicrophoneVolume: number
  mediaDevices: null

  autoAnswer: boolean //自动接听
  autoDisableMic: boolean //自动静音

  loading: null
  locale: 'zh' | 'en' | 'es' | 'pt'
  locales: { label: string; value: string }[]
  callEndInfo: undefined
}
