import { persist } from 'zustand/middleware'
import { create } from 'zustand'

type Store = {
  loginInfo: unknown
}

type Action = {
  setLoginInfo: (loginInfo: unknown) => void
}

const useStore = create<Store & Action>()(
  persist(
    (set) => ({
      // store
      loginInfo: {},

      // actions
      setLoginInfo(loginInfo) {
        set({ loginInfo })
      },
    }),
    {
      name: 'store',
    }
  )
)

export default useStore
