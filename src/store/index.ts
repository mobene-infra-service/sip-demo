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
  deleteLoginInfo: (extNo: string) => void
  setHistoryLoginInfo: (historyLoginInfo: LoginInfoType[]) => void
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
        checkMic: false,
        autoRegister: false,
        autoAnswer: true,
        autoMute: false,
        lang: 'en',
      },
      historyLoginInfo: [],
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
