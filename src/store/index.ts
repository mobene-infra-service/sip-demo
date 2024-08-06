import { create } from 'zustand'

type Store = {
  loginStatus: boolean
  sipState: SipStateType
  latency_stat: undefined | any
}

type Action = {
  setLogStatus: (logStatus: boolean) => void
  setSipState: (sipState: SipStateType) => void
  setLantencyStat: (latency_stat: any) => void
}

const useStore = create<Store & Action>()((set) => ({
  loginStatus: false,
  sipState: {
    statusIsring: false, //是否在振铃中
    statusIsCall: false, //是否在拨打中
    statusIsHold: false, //是否在保持中

    callDirection: '', //呼叫方向

    agentNo: '', //分机号
    discaller: '', //主叫号码
    discallee: '', //被叫号码

    historyAccounts: [], //历史账号列表
    lastAccount: '', //最后一次使用的账号配置

    networkSpeed: 0, //网速
    testMicrophoneOb: null,
    testMicrophoneVolume: 0,
    mediaDevices: null,

    autoAnswer: false, //自动接听
    autoDisableMic: false, //自动静音
    disableMic: false, //静音

    loading: null,
    locale: 'zh',
    locales: [
      { label: '简体中文', value: 'zh' },
      { label: 'English', value: 'en' },
      { label: 'Spanish', value: 'es' },
      { label: 'Portuguese', value: 'pt' },
    ],
    callEndInfo: undefined,
  },
  historyLoginInfo: [],
  latency_stat: undefined,
  setLantencyStat: (latency_stat) => set({ latency_stat }),
  setSipState: (sipState) => set({ sipState }),
  setLogStatus: (loginStatus) => set({ loginStatus }),
}))

export default useStore
