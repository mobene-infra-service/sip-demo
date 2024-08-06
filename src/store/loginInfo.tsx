import { persist } from 'zustand/middleware'
import { create } from 'zustand'

type Store = {
  currentLoginInfo: LoginInfoType
  historyLoginInfo: LoginInfoType[]
}

type Action = {
  setCurrentLoginInfo: (currentLoginInfo: LoginInfoType) => void
  addHistoryLoginInfo: (historyLoginInfo: LoginInfoType) => void
  deleteLoginInfo: (extNo: string) => void
  setHistoryLoginInfo: (historyLoginInfo: LoginInfoType[]) => void
}

const useLoginStore = create<Store & Action>()(
  persist(
    (set, getState) => ({
      historyLoginInfo: [],
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
      setCurrentLoginInfo: (currentLoginInfo) => set({ currentLoginInfo }),
      setHistoryLoginInfo: (historyLoginInfo) => set({ historyLoginInfo }),
    }),
    {
      name: 'store',
    }
  )
)

export default useLoginStore
