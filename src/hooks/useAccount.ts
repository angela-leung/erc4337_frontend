import { SmartWallet } from '@thirdweb-dev/wallets'
import { create } from 'zustand'

interface AccountStore {
  address: string
  //   balance: number // in ETH
  name: string
  wallet: SmartWallet | null
  setName: (name: string) => void
  setAddress: (address: string) => void
  setWallet: (wallet: SmartWallet) => void
  //   setBalance: (balance: number) => void
}

const useAccount = create<AccountStore>((set) => ({
  address: '',
  //   balance: 0,
  name: '',
  wallet: null,
  setName: (name) => set({ name }),
  setWallet: (wallet) => set({ wallet }),
  setAddress: (address) => set({ address }),
  //   setBalance: (balance) => set({ balance }),
}))

export default useAccount
