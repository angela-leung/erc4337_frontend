import { create } from 'zustand'

interface ToastStore {
  message: string
  setMessage: (msg: string, timer?: number) => void
  clearMessage: () => void
}

const initialState: ToastStore = {
  message: '',
  setMessage: () => {},
  clearMessage: () => {},
}

const useToast = create<ToastStore>((set) => ({
  ...initialState,
  setMessage: (msg, timer) => set({ message: msg }),
  clearMessage: () => set({ message: '' }),
}))

export default useToast
