import { persist } from 'zustand/middleware'
import { create } from 'zustand'

type Store = {
  loginStatus: boolean
  currentLoginInfo: LoginInfoType
  historyLoginInfo: LoginInfoType[]
}

type Action = {
  setLogStatus: (logStatus: boolean) => void
  setCurrentLoginInfo: (currentLoginInfo: LoginInfoType) => void
  addHistoryLoginInfo: (historyLoginInfo: LoginInfoType) => void
  setHistoryLoginInfo: (historyLoginInfo: LoginInfoType[]) => void
}

const useStore = create<Store & Action>()(
  persist(
    (set) => ({
      loginStatus: false,
      currentLoginInfo: {
        host: '',
        port: '',
        domain: '',
        proto: false,
        extNo: '',
        extPwd: '',
        stun: {
          type: 'stun',
          host: '',
          username: '',
          password: '',
        },
        checkMic: false,
        autoRegister: false,
        autoAnswer: true,
        autoMute: false,
        lang: 'en',
      },
      historyLoginInfo: [],
      addHistoryLoginInfo: (historyLoginInfo) => {
        set((state) => {
          return {
            historyLoginInfo: [...state.historyLoginInfo, historyLoginInfo],
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
