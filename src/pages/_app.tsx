import type { AppProps } from 'next/app'
import { ThirdwebProvider, metamaskWallet } from '@thirdweb-dev/react'
import { PolygonAmoyTestnet } from '@thirdweb-dev/chains'
import './globals.css'
import { THIRDWEB_API_KEY } from '../lib/constants'
import { Footer } from '@/components/Footer'
import Toast from '@/components/Toast'

const activeChain = PolygonAmoyTestnet

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      supportedWallets={[
        metamaskWallet({
          recommended: true,
        }),
        // coinbaseWallet(),
        // walletConnect(),
      ]}
      clientId={THIRDWEB_API_KEY}
      activeChain={activeChain}
    >
      <div className='relative flex h-screen flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto '>
          <Component {...pageProps} />
        </div>
        <div className='sm:mx-auto sm:w-full position bottom-0'>
          <Footer />
        </div>
        <Toast />
      </div>
    </ThirdwebProvider>
  )
}

export default MyApp
