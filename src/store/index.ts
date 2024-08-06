import { persist } from 'zustand/middleware'
import { create } from 'zustand'

type Store = {
  loginStatus: boolean
  currentLoginInfo: LoginInfoType
  historyLoginInfo: LoginInfoType[]
  sipState: SipStateType
}

type Action = {
  setLogStatus: (logStatus: boolean) => void
  setCurrentLoginInfo: (currentLoginInfo: LoginInfoType) => void
  addHistoryLoginInfo: (historyLoginInfo: LoginInfoType) => void
  deleteLoginInfo: (extNo: string) => void
  setHistoryLoginInfo: (historyLoginInfo: LoginInfoType[]) => void
  setSipState: (sipState: SipStateType) => void
}

const useStore = create<Store & Action>()(
  persist(
    (set, getState) => ({
      loginStatus: false,
      currentLoginInfo: {
        host: '',
        port: '',
        domain: '',
        proto: true,
        extNo: '',
        extPwd: '',
        stun: {
          type: 'stun',
          host: '',
          username: '',
          password: '',
        },
        checkMic: true,
        autoRegister: true,
        autoAnswer: false,
        autoMute: false,
        lang: 'en',
      },
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

        latency_stat: undefined,
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
      setSipState: (sipState) => set({ sipState }),
      addHistoryLoginInfo: (historyLoginInfo) => {
        // 判断是否有重复的没有重复的才添加
        if (
          !getState().historyLoginInfo.some(
            (item) => item.extNo === historyLoginInfo.extNo
          )
        )
          set((state) => {
            return {
              historyLoginInfo: [...state.historyLoginInfo, historyLoginInfo],
            }
          })
      },
      deleteLoginInfo: (extNo) => {
        set((state) => {
          return {
            ...state,
            historyLoginInfo: state.historyLoginInfo.filter(
              (item) => item.extNo !== extNo
            ),
          }
        })
      },
      setLogStatus: (loginStatus) => set({ loginStatus }),
      setCurrentLoginInfo: (currentLoginInfo) => set({ currentLoginInfo }),
      setHistoryLoginInfo: (historyLoginInfo) => set({ historyLoginInfo }),
    }),
    {
      name: 'store',
    }
  )
)

export default useStore
