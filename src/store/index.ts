import { create } from 'zustand'

type Store = {
  loginInfo: unknown
}

type Action = {
  setLoginInfo: (loginInfo: unknown) => void
}

const useStore = create<Store & Action>()((set) => ({
  // store
  loginInfo: {},

  // actions
  setLoginInfo(loginInfo) {
    set({ loginInfo })
  },
}))

export default useStore
